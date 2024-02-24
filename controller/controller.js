"use strict"

import * as model from "../model/model.js";
import * as view from "../view/view.js";

window.addEventListener("load", start);

function start() {
  console.log(`Started`);
  
  // create balls
  createBalls();
  
  // load cannon with a random ball
  view.reloadCannon();
}

// A test-function to create six test-balls
// feel free to experiment with, or replace this function
// this is just for a demonstration ...
function createBalls() {
  view.addBallToChain(model.createBallElement(1));
  view.addBallToChain(model.createBallElement(2));
  view.addBallToChain(model.createBallElement(3));
  view.addBallToChain(model.createBallElement(4));
  view.addBallToChain(model.createBallElement(5));
  view.addBallToChain(model.createBallElement(6));
}
