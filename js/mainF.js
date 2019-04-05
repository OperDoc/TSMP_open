var _height = 350, _width = 350;
var radius = 5;
var totalCities = 8;
var cities = [];
var recordDist = Infinity; 
var bestEver = [];
var data = [];
var oldAlgCount = 1, newAlgCount = 0;
//кнопки
var button1, button2, button3;
//ввод времени
var field;
//текущий результат
var result_button, ch_button;
//холст
var canv;
//вывод результата
var for_res;
var k = 2.5;
var t_start;
var dt;
//вероятность
var p = 2 / fact(totalCities);

function click1(){
    button1.style("background:green");
    button2.style("background:#ffffff");
    button3.style("background:#ffffff"); 
    newAlgCount = 0;
}

function click2(){
    button2.style("background:green");
    button1.style("background:#ffffff");
    button3.style("background:#ffffff");
    newAlgCount = 1;
}

function click3(){
    button3.style("background:green");
    button2.style("background:#ffffff");
    button1.style("background:#ffffff");
    newAlgCount = 2;
}

function change(){
    oldAlgCount = newAlgCount;
    data = start(totalCities, oldAlgCount);
    recordDist = sumDist(cities, getBest(cities, data, oldAlgCount));
    bestEver = getBest(cities, data, oldAlgCount).slice();
    dt = new Date();
    t_start = dt.getTime();
}

function reset(){
    for(var i = 0; i < totalCities; i++){
        cities[i] = createVector(random(5, _width - 5), random(5, _height - 5));
    }
    data = start(totalCities, oldAlgCount);
    recordDist = sumDist(cities, getBest(cities, data, oldAlgCount));
    bestEver = getBest(cities, data, oldAlgCount).slice();
    dt = new Date();
    t_start = dt.getTime();
}

function setup() {
    dt = new Date();
    t_start = dt.getTime();
    ch_button = createButton("Новые города");
    ch_button.size(150 * k, 40 * k);
    ch_button.position(850, 500);
    ch_button.style("font-size:50px");
    result_button = createButton("Сначала");
    result_button.position(400, 500);
    result_button.size(150 * k, 40 * k);
    result_button.style("font-size:50px");
    button1 = createButton("Случайные изменения");
    button1.position(375,10);
    button1.size(100 * k, 50 * k);
    button1.style("font-size:35px");
    button2 = createButton("Полный перебор");
    button2.position(375 + 125 * k,10);
    button2.size(100 * k, 50 * k);
    button2.style("font-size:35px");
    button3 = createButton("Генетический алгоритм");
    button3.position(375 + 250 * k, 10);
    button3.size(100 * k, 50 * k);
    button3.style("font-size:35px");
    button1.mousePressed(click1);
    button2.mousePressed(click2);
    button3.mousePressed(click3);
    ch_button.mousePressed(reset);
    result_button.mousePressed(change);
    button2.style("background:green");
    canv = createCanvas(window.innerWidth - 20, window.innerHeight - 20);
    for(var i = 0; i < totalCities; i++){
        cities.push(createVector(random(5, _width - 5), random(5, _height - 5)));
    }
    data = start(totalCities, oldAlgCount);
    recordDist = sumDist(cities, getBest(cities, data, oldAlgCount));
    bestEver = getBest(cities, data, oldAlgCount).slice();
    textSize(50);
}

function draw() {
    background(GRAY);//50
    stroke(50);
    fill(50);
    rect(0, 0, _width, 2 * _height);
    stroke(0);
    fill(0);
    rect(0, 0, 5, 2 * _height);
    rect(0, 0, _width, 5);
    rect(_width, 2 * _height, -5, -2 * _height);
    rect(_width, 2 * _height, -_width, -5);
    rect(_width, _height, -_width, -5);
    strokeWeight(2);
    dt = new Date();
    let t_time = dt.getTime();
    text("Текущее время работы: " + floor((t_time - t_start) / 1000) + " с", 365, 275 ,10000);
    text("Текущий результат: " + floor(recordDist) + " у.е.", 365, 410 ,10000);
    noFill();
    bestPathPrint(cities, bestEver, radius);
    pathPrint(cities, getBest(cities, data, oldAlgCount), radius, _height);
    var d = sumDist(cities, getBest(cities, data, oldAlgCount)); 
    if (d < recordDist) {
        recordDist = d;
        bestEver = getBest(cities, data, oldAlgCount).slice();
    }
    data = next(cities, data, oldAlgCount);
}