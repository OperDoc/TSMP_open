var populperCiti = 50;

function bestPathPrint(dots, arr, rad) {
    stroke(255, 0, 255);
    for(var i = 0; i < dots.length; i++){
        ellipse(dots[i].x, dots[i].y, rad, rad);
    }
    beginShape();
    for(var i = 0; i < arr.length; i++){
        var j = arr[i];
        vertex(dots[j].x, dots[j].y);
    }
    endShape();
}

function pathPrint(dots, arr, rad, h) {
    stroke(255);
    for(var i = 0; i < dots.length; i++){
        ellipse(dots[i].x, dots[i].y + h, rad, rad);
    }
    beginShape();
    for(var i = 0; i < arr.length; i++){
        var j = arr[i];
        vertex(dots[j].x, dots[j].y + h);
    }
    endShape();
}

function sumDist(dots, arr){
    var sum = 0;
    for(var i = 0; i < arr.length - 1; i++){
        var j = arr[i];
        var jj = arr[i + 1];
        sum += dist(dots[j].x, dots[j].y, dots[jj].x, dots[jj].y);
    }
    return sum;
 }

function start(n, count) {
    res = [];
    if(count == 1 || count == 0) {
        for(var i = 0; i < n; i++) {
            res.push(i);
        }
    } else if (count == 2) {
        var ord = [];
        for(var i = 0; i < n; i++) {
            ord.push(i);
        }
        for(var i = 0; i < populperCiti * n; i++) {
            res.push(shuffle(ord));
        }
    }
    return res;
}

function getBest(dots, data, count) {
     if(count == 1 || count == 0) {
         return data;
     } else if (count == 2) {
        var best = Infinity, res = 0;
        for(var i = 0; i < data.length; i++) {
            var d = sumDist(dots, data[i]);
            if(d < best) {
                best = d;
                res = i
            }
        }
        return data[res];
    }
}

function getAlgCount() {
    return 0;
}

function swap(arr, i, j) {
    c = arr[i];
    arr[i] = arr[j];
    arr[j] = c;
}

function _next(arr){
    var maxI = -1, maxJ = -1;
    for(var i = 0; i < arr.length - 1; i++){
       if(arr[i] < arr[i + 1]){
          maxI = i;
       }
    }
    if(maxI == -1) return arr;
    for(var i = 0; i < arr.length; i++){
       if(arr[maxI] < arr[i]){
          maxJ = i;
       }
    }
    swap(arr, maxI, maxJ);
    var endArr = arr.splice(maxI + 1);
    endArr.reverse();
    //console.log(1);
    
    return arr.concat(endArr);
}

function getfit(dots, arr) {
    var res = [];
    for(var i = 0; i < arr.length; i++) {
        var d = sumDist(dots, arr[i]);
        res.push(1 / (d + 1))
    }
    var sum = 0;
    for(var i = 0; i < arr.length; i++) {
        sum += res[i];
    }
    for(var i = 0; i < arr.length; i++) {
        res[i] /= sum;
    }
    return res;
}

function pick(arr, fit){
    var i = 0;
    var r = random(1);
    while(r > 0){
       r -= fit[i];
       i++;
    }
    i--;
    return arr[i].slice();
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

function mutate(unit, rate){
    if(random(1) < rate) {
       var indA = floor(random(unit.length));
       var indB = floor(random(unit.length));
       swap(unit, indA, indB);
    }
 }

function nextG(arr, fit){
    var narr = [];
    for(var i = 0; i < arr.length; i++){
       var ordA = pick(arr, fit);
       var ordB = pick(arr, fit);
       var ordC = cross(ordA, ordB);
       mutate(ordC, 2);
       narr.push(ordC);
    }
    return narr;
 }

function next (dots, arr, count) {
    if(count == 0) {
        var i = floor(random(arr.length)), j = floor(random(arr.length));
        swap(arr, i, j);
        return arr;        
    } else if(count == 1) {
        return _next(arr);
    } else if(count == 2) {
        fit = getFit(dots, arr);
        return nextG(arr, fit);
    }
}