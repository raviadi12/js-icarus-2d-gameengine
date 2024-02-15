// physics.js
export class Physics {
  applyMomentum(shape, otherShape) {
    if (otherShape.dynamic) {
      // Transfer momentum based on mass and velocity
      const totalMass = shape.mass + otherShape.mass;
      const thisRatio = shape.mass / totalMass;
      const otherRatio = otherShape.mass / totalMass;

      shape.velocityX =
        thisRatio * shape.velocityX + otherRatio * otherShape.velocityX;
      //    shape.velocityY = thisRatio * shape.velocityY + otherRatio * otherShape.velocityY;
    } else {
      this.applyElasticity(shape);
    }
  }

  applyGravity(shape, gravity) {
    // Update the velocity based on gravity
    shape.velocityY += gravity;
  }

  applyHorizontalElasticity(shape) {
    if (Math.abs(shape.velocityX) < 0.34) {
      shape.velocityY = 0;
    } else {
      shape.velocityX *= -shape.elasticity;
      shape.velocityY *= shape.elasticity;
    } // Reverse direction and reduce velocity for bouncing effect
  }
  applyVerticalElasticity(shape) {
    // Check if velocityY is below 0.34, then set it to 0
    if (Math.abs(shape.velocityY) < 0.34) {
      shape.velocityY = 0;
    } else {
      // Reduce the velocity based on elasticity when hitting a surface
      shape.velocityX *= shape.elasticity;
      shape.velocityY *= -shape.elasticity; // Reverse direction and reduce velocity for bouncing effect
    }
  }

  applyElasticity(shape) {
    // Reduce the velocity based on elasticity when hitting a surface
    shape.velocityX *= shape.elasticity;
    shape.velocityY *= -shape.elasticity; // Reverse direction and reduce velocity for bouncing effect
  }
  accelerate(shape, x, y) {
    shape.velocityX += x;
    shape.velocityY += y;
  }

  // Add other physics-related methods as needed
}
