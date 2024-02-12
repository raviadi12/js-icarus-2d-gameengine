import { PhysicsShape } from "./GameEngine/shape_with_physics";
import { CanvasCreator } from "./GameEngine/canvascreator";
import { StaticShape } from "./GameEngine/static_shape";
  
const canvasCreator = new CanvasCreator(600, 500);

const shape1 = new PhysicsShape(50, 50, 30, 30, "red");
const shape2 = new PhysicsShape(150, 100, 30, 30, "green");
const shape3 = new PhysicsShape(200, 150, 50, 50, "purple");


const wall1 = new StaticShape(100, 300, 30, 100, "white");
const wall2 = new StaticShape(120, 300, 200, 30, "white")

canvasCreator.drawText("Hai Nadhifa!", 50, 50, "red", "20px Arial");


shape1.name = "shape1"; // Assign a name to each shape
shape2.name = "shape2";

canvasCreator.shapes.push(shape1, shape2, shape3, wall1, wall2);
canvasCreator.drawShapes(); // Initial drawing

// Function to move the selected shape based on the dropdown selection

document.addEventListener("keydown", (event) => {
  const selectedShapeName = shapeSelector.value;
  const selectedShape = canvasCreator.getShapeByName(selectedShapeName);

  if (selectedShape) {
    switch (event.key) {
      case "ArrowUp":
        selectedShape.physics.accelerate(selectedShape, 0, -5);
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
    }
  }
});



function animate() {
  // Update each shape in the canvas
  canvasCreator.shapes.forEach((shape) => {
    if (shape.dynamic) {
      shape.update(1, canvasCreator);
     } 
  });

  // Redraw the canvas with updated shape positions
  canvasCreator.drawShapes();

  // Request the next animation frame
  requestAnimationFrame(animate);
}

// Start the animation loop
animate();
