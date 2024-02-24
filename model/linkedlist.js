"use strict";

export const colorMapping = {
  1: "orange",
  2: "green",
  3: "blue",
  4: "red",
  5: "dark blue",
  6: "purple"
}

export class Node {
  constructor(data, color) {
    this.data = data;
    this.color = color;
    this.next = null;
    this.prev = null;
  }
}

let head = null;
let tail = null;

export function dump() {
  let node = head;
  let output = "";
  while(node != null) {
    output += '"' + node.data + '"';
    output += " -> ";
   
    node = node.next;
  }
  output += "null";
  console.log(output);
}

export function randomBall() {
  const balls = ["🔴", "🔵","🟡","🟢"]
  return balls[Math.floor(Math.random()*balls.length)];
}

export function add( data ) {
  const color = colorMapping[data];
  const newNode = new Node(data, color);
  if( head == null ) {
    head = newNode;
    tail = newNode;
  } else {
    tail.next = newNode;
    newNode.prev = tail;
    tail = newNode;
  }
  return newNode;
}

export function get( index ) {
  let node = head;
  while(index > 0) {
    node = node.next;
    index--;
  }
  return node;
}

export function insertBeforeNode( data, existingNode ) {
  const newNode = { data: data, next: existingNode, prev: existingNode.prev};
  // TODO: Doesn't handle if this is the first node
  existingNode.prev.next = newNode;
  existingNode.prev = newNode;

  return newNode;
}

export function insertAfterNode( data, existingNode ) {
  const newNode = { data: data, next: existingNode.next, prev: existingNode};
  // TODO: Doesn't handle if this is the last node
  existingNode.next.prev = newNode;
  existingNode.next = newNode;

  return newNode;
}

export function findNodeByData() {
  let currentNode = head;
  while (currentNode !== null) {
    if (currentNode.data === data) {
      return currentNode;
    }
    currentNode = currentNode.next;
  }
  return null;
}

export function removeNode( existingNode ) {
  const prev = existingNode.prev;
  const next = existingNode.next;

  if(prev == null) {
    // this is the first node - make head point to the next one
    head = existingNode.next;
    // and make this one point back to nothing
    if(head)
      head.prev = null;
  } 
  
  if(next == null) {
    // this is the last node - make tail point to the one before
    tail = existingNode.prev;
    if(tail)
      tail.next = null;
  }

  if(existingNode.prev)
    existingNode.prev.next = existingNode.next;
  if(existingNode.next)
    existingNode.next.prev = existingNode.prev;
}

export function findMatchesAround(node) {
    const matches = [node];

    // Check to the left
    let before = node.prev;
    while(before.prev !== null && before.color === node.color) {
        matches.unshift(before);
        before = before.prev;
    }
    // Check to the right
    let after = node.next;
    while (after !== null && after.color === node.data) {
        matches.push(after);
        after = after.next;
    }
    if (matches.length >= 3) {
      return matches;
    }

    return [];
}