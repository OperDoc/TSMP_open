var _height = 350, _width = 350, total = 7, rad = 5;
var cities = [];
var recordDist = 0, bestEver;
var order = [];

function swap(a, i, j){
   var temp = a[i];
   a[i] = a[j];
   a[j] = temp;
}

function sumDist(Ps, ord){
   var sum = 0;
   for(var j = 0; j < Ps.length - 1; j++){
      var i = ord[j];
      var ii = ord[j + 1];
      var d = (Ps[i].x - Ps[ii].x) * (Ps[i].x - Ps[ii].x) + (Ps[i].y - Ps[ii].y) * (Ps[i].y - Ps[ii].y);
      sum += d;
   }
   return sum;
}

function setup(){
   createCanvas(_width, 2 * _height);
   for(var i = 0; i < total; i++){
      var v = createVector(random(_width), random(_height));
      cities[i] = v;
      order[i] = i;
   }
   recordDist = sumDist(cities, order);
   bestEver = order.slice();
}

function draw(){
   if(order == undefined){
      noLoop();
      return;
   }
   background(0);
   fill(255);
   stroke(255);
   for(var i = 0; i < cities.length; i++){
      ellipse(cities[i].x, cities[i].y + _height, rad, rad);
   }
   strokeWeight(2);
   noFill();
   beginShape();
   for(var i = 0; i < cities.length; i++){
      var j = order[i];
      vertex(cities[j].x, cities[j].y + _height);
   }
   endShape();
   stroke(255, 0, 255);
   for(var i = 0; i < cities.length; i++){
      ellipse(cities[i].x, cities[i].y, rad, rad);
   }
   beginShape();
   for(var i = 0; i < bestEver.length; i++){
      var j = bestEver[i];
      vertex(cities[j].x, cities[j].y);
   }
   endShape();
   var d = sumDist(cities, order);
   if(d < recordDist){
      recordDist = d;
      bestEver = order.slice();
   }
   order = next(order);
}

//=====================================================

function next(arr){
   var maxI = -1, maxJ = -1;
   for(var i = 0; i < arr.length - 1; i++){
      if(arr[i] < arr[i + 1]){
         maxI = i;
      }
   }
   if(maxI == -1){
      return;
   }
   for(var i = 0; i < arr.length; i++){
      if(arr[maxI] < arr[i]){
         maxJ = i;
      }
   }
   swap(arr, maxI, maxJ);
   var endArr = arr.splice(maxI + 1);
   endArr.reverse();
   return arr.concat(endArr);
}
