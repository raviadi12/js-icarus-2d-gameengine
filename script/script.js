import { PhysicsShape } from "./GameEngine/shape_with_physics";
import { CanvasCreator } from "./GameEngine/canvascreator";
import { StaticShape } from "./GameEngine/static_shape";
import { Text } from "./GameEngine/textrendering";
import { WebGLCanvasCreator } from "./GameEngine/WebGLCanvas";

let isKeyPressed = false;

const canvasCreator = new CanvasCreator(1200, 900);

let manuallycreatedblock = [];

const shape1 = new PhysicsShape(50, 50, 30, 30, "red");
const shape2 = new PhysicsShape(150, 100, 30, 30, "green");
const shape3 = new PhysicsShape(200, 150, 50, 50, "purple");

const wall1 = new StaticShape(100, 300, 30, 100, "white");
const wall2 = new StaticShape(120, 300, 200, 30, "white");
const wall3 = new StaticShape(290, 250, 30, 50, "white");
const wall4 = new StaticShape(120, 300, 200, 30, "white");
const text = new Text("AADADADA!", 50, 50, "white", "20px Arial");
const text2 = new Text("Unik wkwkwk", 50, 100, "white", "20px Arial");

shape1.name = "shape1"; 
shape2.name = "shape2";

canvasCreator.shapes.push(shape1, shape2, shape3, wall1, wall2, wall3);
canvasCreator.texts.push(text, text2);

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
        selectedShape.physics.accelerate(selectedShape, 0, -5);
        jumlah++;
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
        console.log("Space pressed");
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
  canvasCreator.shapes.forEach((shape) => {
    if (shape.dynamic) {
      shape.update(1, canvasCreator);
      text.content =
        "Kecepatan sumbu x object 1 " + parseFloat(shape1.velocityY).toFixed(2);
    }
  });

  // Redraw the canvas with updated shape positions
  canvasCreator.drawShapes();

  // Request the next animation frame
  requestAnimationFrame(animate);
}

// Start the animation loop
animate();
