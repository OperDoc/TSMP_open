var _height = 400, _width = 600, total = 9, rad = 5;
var vals = 0;

function range(n){
   var res = [];
   for(var i = 0; i < n; i++){
      res.push(i);
   }
   return res;
}

function swap(a, i, j){
   var temp = a[i];
   a[i] = a[j];
   a[j] = temp;
}

function setup(){
   createCanvas(_width, _height);
   vals = range(total);
}

function draw(){
   var maxI = -1, maxJ = -1;
   for(var i = 0; i < vals.length - 1; i++){
      if(vals[i] < vals[i + 1]){
         maxI = i;
      }
   }
   if(maxI == -1){
      noLoop();
      return;
   }
   for(var i = 0; i < vals.length; i++){
      if(vals[maxI] < vals[i]){
         maxJ = i;
      }
   }
   swap(vals, maxI, maxJ);
   var endArr = vals.splice(maxI + 1);
   endArr.reverse();
   vals = vals.concat(endArr);

   background(0);
   textSize(64);
   var s = '';
   for(var i = 0; i < vals.length; i++){
      s += vals[i];
   }
   fill(255);
   text(s, 20, _height / 2);
}
