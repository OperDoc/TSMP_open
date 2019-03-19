var _height = 350, _width = 350;
var radius = 5;
var totalCities = 9;
var cities = [];
var recordDist = 0; 
var bestEver = [];
var data = [];
var oldAlgCount = 1, newAlgCount = 0;
//кнопки
var button1, button2, button3;
//ввод времени
var field;
//текущий результат
var result_button;
//холст
var canv;
//вывод результата
var for_res;
var k = 2.5;
var t_start;
var dt;
function setup() {
    dt = new Date();
    t_start = dt.getTime();
    result_button = createButton("start");
    result_button.position(570, 500);
    result_button.size(200 * k, 40 * k);
    button1 = createButton("Случайные изменения");
    button1.position(375,10);
    button1.size(100 * k, 50 * k);
    button2 = createButton("Полный перебор");
    button2.position(375 + 125 * k,10);
    button2.size(100 * k, 50 * k);
    button3 = createButton("Генетический алгоритм");
    button3.position(375 + 250 * k, 10);
    button3.size(100 * k, 50 * k);
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
    text("Текущее время работы " + floor((t_time - t_start) / 1000) + " с", 365, 275 ,1000);
    text("Текущий результат " + floor(recordDist) + " у.е.", 365, 410 ,1000);
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