"use strict"

import * as linkedlist from "../model/linkedlist.js";

let ballCount = 0;

export function createBallElement(balltype) {
  const ballId = ballCount + 1;
  ballCount++;
  const ballColor = linkedlist.colorMapping[balltype]; // color of ball
  const ball = document.createElement("div");
  ball.className = "ball";
  const img = document.createElement("img");
  
  
  img.src = `view/images/marble${balltype}.png`;
  img.dataset.balltype = ballId;
  ball.dataset.balltype = ballId;
  ball.appendChild(img);

  linkedlist.dump();
  linkedlist.add(ballId);
  console.log(`Ball color to linked list: ${ballId} (${ballColor})`);

  return ball;
}

export function removeBallsFromChain(balls) {
  balls.forEach(ball => {
    ball.classList.add("remove");
    // wait for next frame to start new animation
    requestAnimationFrame( () => {
      ball.addEventListener("animationend", removeElement);
    });
    function removeElement() {
      ball.removeEventListener("animationend", removeElement);
      ball.remove();

      // Remove ball from linked list
      const balltype = ball.dataset.balltype;
      const node = linkedlist.findNodeByData(parseInt(balltype));
      if (node) {
        // Find matches around the current node
        const matches = linkedlist.findMatchesAround(node);
        if (matches.length >= 3) {
          // Remove matched nodes from the linked list
          matches.forEach(match => linkedlist.removeNode(match));
        }
      }
    }
  });
}
