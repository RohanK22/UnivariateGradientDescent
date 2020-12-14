let x = [], y =[];
let theta0 = 50, theta1 = 1;
let costThreshold = 5;
let maxIterations = 2000;
let epochs = 10
let a = 0.00001; // Learning rate
/*  
    Curvefitting using univariate linear regression
    Hypothesis
    h(x) = theta0 + theta1 * x
    Cost Funtion: Mean squared error
    Cost minimization using: Gradient Descent
*/

function h(x){
  return theta0 + theta1 * x;
}

function cost(){
  let sum = 0;
  for(let i=0; i<x.length; i++){
      sum += (h(x[i]) - y[i]) * (h(x[i]) - y[i]);
  }
  if(x.length != 0)
    return sum/(x.length);
  else
    return "no training examples";
}

function train(){
  let temp0, temp1, sum, iterations = 0;
  if(x.length > 1){
    while(cost() > costThreshold && iterations < maxIterations){
      sum = 0;
      for(let i=0;i<x.length; i++){
        sum += h(x[i]) - y[i];
      }
      // Highly not recommended: Using two differnt Learning rates!
      temp0 = theta0 - 1000 * a * sum / x.length;

      sum = 0;
      for(let i=0;i<x.length; i++){
        sum += (h(x[i]) - y[i]) * x[i];
      }
      temp1 = theta1 - a * sum / x.length;

      // Update parameters
      theta0 = temp0;
      theta1 = temp1;
      //console.log(cost() + '  ' + theta0 + '   ' + theta1);
      iterations++;
    }
  }
}

function showHypothesis(){
  for(let i = 0; i< width; i++){
    stroke('orange'); 
    strokeWeight(3); 
    point(i, h(i));
  }
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  showPoints();
  showHypothesis();
}

function mousePressed(){
  append(x, mouseX);
  append(y, mouseY);
  console.log('Cost: ' + cost());
  for(let i = 0; i<epochs; i++){
    train();
  }
  // console.log(x);
}
  
function showPoints(){
  for(let i = 0; i<x.length; i++){
      stroke('purple'); 
      strokeWeight(10); 
      point(x[i], y[i]);
  }
}