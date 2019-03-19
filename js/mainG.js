var cities = [];
var totalCities = 11;
var recordDist = Infinity;
var bestEver = [];
var currBest = [];
var population = [];
var popNum = 800;
var fit = [];
var _width = 350;
var _height = 350;
var rad = 7;

function swap(a, i, j){
   temp = a[i];
   a[i] = a[j];
   a[j] = temp;
}

function sumDist(Ps, ord){
   var sum = 0;
   for(var j = 0; j < Ps.length - 1; j++){
      var i = ord[j];
      var ii = ord[j + 1];
      var d = (Ps[i].x - Ps[ii].x) * (Ps[i].x - Ps[ii].x) + (Ps[i].y - Ps[ii].y) * (Ps[i].y - Ps[ii].y);
      sum += Math.sqrt(d);
   }
   return sum;
}

function getfit(popul, populFit, ans, best){
   var best, ans = Infinity;
   for(var i = 0; i < population.length; i++){
      var d = sumDist(cities, popul[i]);
      populFit[i] = 1 / (d + 1);
      if(ans > d){
         best = popul[i].slice()
         ans = d;
      }
   }
   return best;
}

function normal(popul, populF){
   var sum = 0;
   for(var i = 0; i < populF.length; i++){
      sum += populF[i];
   }
   for(var i = 0; i < populF.length; i++){
      populF[i] /= sum;
   }
}

function pick(arr, prob){
   var i = 0;
   var r = random(1);
   while(r > 0){
      r -= prob[i];
      i++;
   }
   i--;
   return arr[i].slice();
}

function mutate(unit, rate){
   if(random(1) < rate) {
      var indA = floor(random(unit.length));
      var indB = floor(random(unit.length));
      swap(unit, indA, indB);
   }
}

function coross(ordA, ordB){
   var st = floor(random(ordA.length));
   var nd = floor(st + 1, random(ordA.length));
   var res = ordA.slice(st, nd);
   for(var i = 0; i < ordB.length; i++){
      if(!res.includes(ordB[i])){
         res.push(ordB[i]);
      }
   }
   return res;
}

function nextG(popl, poplF){
   var npopl = [];
   for(var i = 0; i < popl.length; i++){
      var ordA = pick(popl, poplF);
      var ordB = pick(popl, poplF);
      var ordC = coross(ordA, ordB);
      //ordC = ordA;
      mutate(ordC, 2);
      npopl.push(ordC);
   }
   return npopl;
}

function setup(){
   order = [];
   createCanvas(_width, 2 * _height);
   for(var i = 0; i < totalCities; i++){
      v = createVector(random(_width), random(_height));
      cities.push(v);
      order.push(i);
   }
   for(var i = 0; i < popNum; i++){
      population.push(shuffle(order));
   }
   for(var i = 0; i < population.length; i++){
      var d = sumDist(cities, population[i]);
      if(d < recordDist){
         recordDist = d;
         bestEver = population[i].slice();
      }
   }
   currBest = getfit(population, fit, recordDist, bestEver);
}

function draw(){
   //----------------------------------------------------------
   currBest = getfit(population, fit, recordDist, bestEver);
   normal(population, fit);
   population = nextG(population, fit);
   //----------------------------------------------------------
   for(var i = 0; i < population.length; i++){
      var d = sumDist(cities, population[i]);
      if(d < recordDist){
         recordDist = d;
         bestEver = population[i].slice();
      }
   }
   background(0);
   strokeWeight(2);
   noFill();
   stroke(255);
   beginShape();
   //console.log(currBest);
   for(var i = 0; i < cities.length; i++){
     var j = currBest[i];
     vertex(cities[j].x, cities[j].y + _height);
   }
   endShape();
   fill(255);
   stroke(255);
   for(var i = 0; i < cities.length; i++){
      ellipse(cities[i].x, cities[i].y + _height, rad, rad);
   }
   noFill();
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

}
