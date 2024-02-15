import { Physics } from "./physics";
import { CollisionDetectionMechanics } from "./Utility/collisionDetection";

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
    this.collision = new CollisionDetectionMechanics();
  }

  updatePosition() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  update(gravity, canvasCreator) {
    // Check for collisions with other shapes
    this.updatePosition();
    this.physics.applyGravity(this, gravity);
    for (const othershape of canvasCreator.shapes) {
      if (othershape !== this && (this.collision.isCollidingWith(this, othershape, this.velocityY, this.velocityX).collideTop == true || this.collision.isCollidingWith(this, othershape, this.velocityY, this.velocityX).collideTop == true)) {
        if (othershape.dynamic) {
          console.log("Top collided")
          this.physics.applyVerticalElasticity(this);
          othershape.physics.applyMomentum(othershape, this);
    //    shape.updatePosition();
          return;
        } else {
          this.physics.applyVerticalElasticity(this);
    //    this.updatePosition();
          return;
        }
      }
      if (othershape !== this && (this.collision.isCollidingWith(this, othershape, this.velocityY, this.velocityX).collideLeft == true || this.collision.isCollidingWith(this, othershape, this.velocityY, this.velocityX).collideRight == true)) {
        if (othershape.dynamic) {
          console.log("Top collided")
          this.physics.applyHorizontalElasticity(this);
          othershape.physics.applyMomentum(othershape, this);
    //    shape.updatePosition();
          return;
        } else {
          this.physics.applyHorizontalElasticity(this);
    //    this.updatePosition();
          return;
        }
      }
    }
    if (this.x + this.width > canvasCreator.canvas.width - this.velocityX) {
      this.x += this.velocityX/2;
      this.physics.applyHorizontalElasticity(this);
    }
    if (this.x <= 0) {
      this.x -= this.velocityX/2;
      this.physics.applyHorizontalElasticity(this);
    }
    if (this.y + this.height > canvasCreator.canvas.height - this.velocityY) {
      this.y += this.velocityY/2;
      this.physics.applyVerticalElasticity(this);
    }
    // Update position and apply gravity

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
