import { PhysicsShape } from "./GameEngine/shape_with_physics";
import { CanvasCreator } from "./GameEngine/canvascreator";
import { StaticShape } from "./GameEngine/static_shape";
import { Text } from "./GameEngine/textrendering";
import { WebGLCanvasCreator } from "./GameEngine/WebGLCanvas";

let isKeyPressed = false;

const canvasCreator = new CanvasCreator(1200, 900);

let manuallycreatedblock = [];

const shape1 = new PhysicsShape(50, 50, 30, 30, "red", 10);
const shape2 = new PhysicsShape(150, 100, 30, 30, "green");
const shape3 = new PhysicsShape(200, 150, 50, 50, "purple");

const wall1 = new StaticShape(100, 300, 30, 100, "white");
const wall2 = new StaticShape(120, 300, 400, 30, "white");
const wall3 = new StaticShape(490, 250, 30, 50, "white");
const wall4 = new StaticShape(600, 800, 30, 100, "white");
const text = new Text("AADADADA!", 50, 50, "white", "20px Monospace");
const text2 = new Text("Unik wkwkwk", 50, 100, "white", "20px Monospace");
const y_pos = new Text("Unik wkwkwk", 500, 100, "white", "20px Monospace");
const x_pos = new Text("Unik wkwkwk", 500, 50, "white", "20px Monospace");
const x_vel = new Text("Unik wkwkwk", 50, 150, "white", "20px Monospace");

shape1.name = "shape1"; 
shape2.name = "shape2";

canvasCreator.shapes.push(shape1, shape2, shape3, wall1, wall2, wall3, wall4);
canvasCreator.GUIText.push(text, text2, y_pos, x_pos, x_vel);

let selectedShapeName = shapeSelector.value;
let selectedShape = canvasCreator.getShapeByName(selectedShapeName);

function placeBlocks(x, y) {
  const new_block = new StaticShape(x, y, 30, 30, "white");
  canvasCreator.shapes.push(new_block);
  return;
}

function placeDynBlocks(x, y) {
  const new_block = new PhysicsShape(x, y, 30, 30, "white");
  canvasCreator.shapes.push(new_block);
  return;
}

function deleteBlock(blockid) {
// maybe i'll implement this next time
}

document.addEventListener("keydown", (event) => {
  if (!isKeyPressed) {
    isKeyPressed = true;
  } // Set the flag to true when a key is pressed
  selectedShapeName = shapeSelector.value;
  selectedShape = canvasCreator.getShapeByName(selectedShapeName);

  if (selectedShape) {
    switch (event.key) {
      case "ArrowUp":
        selectedShape.physics.accelerate(selectedShape, 0, -5);;
        break;
      case "ArrowDown":
        selectedShape.physics.accelerate(selectedShape, 0, 5);
        break;
      case "ArrowLeft":
        selectedShape.physics.accelerate(selectedShape, -5, 0);
        break;
      case "ArrowRight":
        selectedShape.physics.accelerate(selectedShape, 5, 0);
        break;
      case " ":
        //console.log("Space pressed");
        placeBlocks(selectedShape.x + selectedShape.width + 5, selectedShape.y)
        break;
      case "G":
        placeDynBlocks(selectedShape.x + selectedShape.width + 5, selectedShape.y)
    }
  }
});

document.addEventListener("keyup", () => {
  isKeyPressed = false; // Reset the flag when the key is released
});



function animate() {
  if (isKeyPressed) {
    text2.content = "Keyboard sedang dipencet";
  } else {
    text2.content = "Keyboard tidak dipencet";
  }
  canvasCreator.camera.x = selectedShape.x - canvasCreator.canvas.width/4;
//  canvasCreator.camera.y = selectedShape.y - canvasCreator.canvas.height/2;
  canvasCreator.camera.y = selectedShape.y - canvasCreator.canvas.height/4;

  y_pos.content = "Current Cube 1 Y position: " + parseFloat(shape1.y).toFixed(2);
  x_pos.content = "Current Cube 1 X position: " + parseFloat(shape1.x).toFixed(2);
  x_vel.content = "Current Cube 1 X Velocity: " + parseFloat(shape1.velocityX).toFixed(2);
  canvasCreator.shapes.forEach((shape) => {
    if (shape.dynamic) {
      shape.update(1, canvasCreator);
      text.content =
        "Kecepatan sumbu y object 1 " + parseFloat(shape1.velocityY).toFixed(2);
    }
  });

  // Redraw the canvas with updated shape positions
  canvasCreator.drawShapes();

  // Request the next animation frame
  requestAnimationFrame(animate);
}

// Start the animation loop
animate();




// alternate rendering mode


/*
function animate() {
  if (isKeyPressed) {
    text2.content = "Keyboard sedang dipencet";
  } else {
    text2.content = "Keyboard tidak dipencet";
  }


  canvasCreator.shapes.forEach((shape) => {
    if (shape.dynamic) {
      shape.update(1, canvasCreator);
      text.content =
        "Kecepatan sumbu x object 1 " + parseFloat(shape1.velocityY).toFixed(2);
        y_pos.content = "Current Cube 1 Y position: " + parseFloat(shape1.y).toFixed(2);
    }
  });

  // Redraw the canvas with updated shape positions
  canvasCreator.drawShapes();
}

// Set your desired frame rate (e.g., 60 frames per second)
const frameRate = 3;

// Calculate the interval between frames in milliseconds
const frameInterval = 1000 / frameRate;

// Start the animation loop with setInterval
setInterval(animate, frameInterval);


*/