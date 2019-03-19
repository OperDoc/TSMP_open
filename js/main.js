var _height = 400, _width = 600, total = 8, rad = 5;
var cities = [];
var recordDist = 0, bestEver;

function swap(a, i, j){
   var temp = a[i];
   a[i] = a[j];
   a[j] = temp;
}

function sumDist(Ps){
   var sum = 0;
   for(var i = 0; i < Ps.length - 1; i++){
      var d = (Ps[i].x - Ps[i + 1].x) * (Ps[i].x - Ps[i + 1].x) + (Ps[i].y - Ps[i + 1].y) * (Ps[i].y - Ps[i + 1].y);
      sum += d;
   }
   return sum;
}

function setup(){
   createCanvas(_width, _height);
   for(var i = 0; i < total; i++){
      var v = createVector(random(_width), random(_height));
      cities[i] = v;
   }
   recordDist = sumDist(cities);
   bestEver = cities.slice();
}

function draw(){
   background(0);
   fill(255);
   for(var i = 0; i < cities.length; i++){
      ellipse(cities[i].x, cities[i].y, rad, rad)
   }
   stroke(255);
   strokeWeight(1);
   noFill();
   beginShape();
   for(var i = 0; i < cities.length; i++){
      vertex(cities[i].x, cities[i].y);
   }
   endShape();
   stroke(255, 0, 255);
   strokeWeight(4);
   noFill();
   beginShape();
   for(var i = 0; i < bestEver.length; i++){
      vertex(bestEver[i].x, bestEver[i].y);
   }
   endShape();
   var i = floor(random(cities.length)), j = floor(random(cities.length));
   swap(cities, i, j);
   var d = sumDist(cities);
   if(d < recordDist){
      recordDist = d;
      bestEver = cities.slice();
      console.log(recordDist);
   }
}
