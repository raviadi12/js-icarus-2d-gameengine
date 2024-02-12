import { Physics } from "./physics";

export class PhysicsShape {
  constructor(x, y, width, height, color, mass, elasticity) {
    this.dynamic = true;
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.mass = mass || 1; // Mass of the shape (default is 1)
    this.elasticity = elasticity || 0.5; // Elasticity coefficient (default is 0.8)
    this.velocityX = 0; // Initial velocity in the x-direction
    this.velocityY = 0; // Initial velocity in the y-
    this.minVelocity = 0.1;
    this.physics = new Physics();
  }

  updatePosition() {
    // Update position based on velocity
    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  update(gravity, canvasCreator) {
    // Update position and apply gravity
    this.updatePosition();
    this.physics.applyGravity(this, gravity);

    // Check for collisions with other shapes
    for (const shape of canvasCreator.shapes) {
      if (shape !== this && this.isCollidingWith(shape)) {
        // Handle collision with other shapes
        if (shape.dynamic) {
          this.physics.applyElasticity(this);
          this.physics.applyMomentum(this, shape);
    //    this.updatePosition(); 
          shape.physics.applyMomentum(shape, this);
    //    shape.updatePosition(); 
          return;
        } else {
          this.physics.applyElasticity(this);
          this.physics.applyMomentum(this, shape);
  //      this.updatePosition();
          return; 
        }
      }
    }
    if (this.x < 0 || this.x + this.width > canvasCreator.canvas.width) {
      this.velocityX *= -this.elasticity; // Reverse x-direction for bouncing effect
    }
    if (this.y < 0 || this.y + this.height > canvasCreator.canvas.height) {
      this.physics.applyElasticity(this); 
    }
  }
/*
  move(deltaX, deltaY, canvasCreator) {
    // Store current position for potential rollback
    const originalX = this.x;
    const originalY = this.y;

    // Update position
    this.x += deltaX;
    this.y -= deltaY;

    // Check for collisions with other shapes
    for (const shape of canvasCreator.shapes) {
      if (shape !== this && this.isCollidingWith(shape)) {
        // Rollback to original position if collision detected
        this.x = originalX;
        this.y = originalY;
        return;
      }
    }
    if (
      this.x < 0 ||
      this.x + this.width > canvasCreator.canvas.width ||
      this.y < 0 ||
      this.y + this.height > canvasCreator.canvas.height
    ) {
      // Rollback to original position if collision detected with canvas boundaries
      this.x = originalX;
      this.y = originalY;
    }
  }
  */

  isCollidingWith(otherShape) {
    return (
      this.x < otherShape.x + otherShape.width &&
      this.x + this.width > otherShape.x &&
      this.y < otherShape.y + otherShape.height &&
      this.y + this.height > otherShape.y
    );
  }
}


/*
DELETED FUNCTION


function moveSelectedShape() {
  const selectedShapeName = shapeSelector.value;
  const x_value = document.getElementById("x_input").value;
  const y_value = document.getElementById("y_input").value;

  const selectedShape = canvasCreator.getShapeByName(selectedShapeName);

  if (selectedShape) {
    // Ensure x_value and y_value are parsed as numbers
    const deltaX = parseFloat(x_value);
    const deltaY = parseFloat(y_value);
    document.getElementById("s1_xcoor").innerHTML = shape1.x;
    document.getElementById("s1_ycoor").innerHTML = shape1.y;
    document.getElementById("s2_xcoor").innerHTML = shape2.x;
    document.getElementById("s2_ycoor").innerHTML = shape2.y;

    // Check if parsing is successful
    if (!isNaN(deltaX) && !isNaN(deltaY)) {
      // Move the selected shape by the specified delta values
      selectedShape.move(deltaX, deltaY);
      canvasCreator.drawShapes(); // Redraw after moving
    } else {
      alert("Invalid numerical values for x and y");
    }
  } else {
    alert("Invalid shape selection");
  }
}

function moveSelectedShapebyKeys(deltaX, deltaY) {
  const selectedShapeName = shapeSelector.value;
  const selectedShape = canvasCreator.getShapeByName(selectedShapeName);

  if (selectedShape) {
    selectedShape.move(deltaX, deltaY);
    canvasCreator.drawShapes(); // Redraw after moving
  }
}


*/