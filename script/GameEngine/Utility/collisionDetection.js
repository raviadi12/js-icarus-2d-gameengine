export class CollisionDetectionMechanics {
    isCollidingWith(shape, otherShape, velocityY, velocityX) {
        const deltaX =
          otherShape.x + otherShape.width / 2 - (shape.x + shape.width / 2);
        const deltaY =
          otherShape.y + otherShape.height / 2 - (shape.y + shape.height / 2);
      
        const combinedHalfWidths = shape.width / 2 + otherShape.width / 2;
        const combinedHalfHeights = shape.height / 2 + otherShape.height / 2;
      
        const overlapX = combinedHalfWidths - Math.abs(deltaX);
        const overlapY = combinedHalfHeights - Math.abs(deltaY);
      
        // Initialize collision flags
        let collideBottom = false;
        let collideTop = false;
        let collideLeft = false;
        let collideRight = false;
      
        if (overlapX >= 0 && overlapY >= 0) {
          // Colliding
      
          // Determine collision direction
          if (overlapX >= overlapY) {
            // Colliding vertically
            if (deltaY >= 0 - Math.abs(velocityY)) {
              console.log("Hitted Top Velocity " + velocityY)
              collideTop = true;
            } else {
              collideBottom = true;
            }
          } else {
            // Colliding horizontally
            if (deltaX >= 0 - Math.abs(velocityX)) {
              collideLeft = true;
            } else {
              collideRight = true;
            }
          }
      
          return {
            colliding: true,
            collideBottom,
            collideTop,
            collideLeft,
            collideRight,
          };
        } else {
          // Not colliding
          return {
            colliding: false,
            collideBottom,
            collideTop,
            collideLeft,
            collideRight,
          };
        }
      }
      
isCollidingWithHorizontal(shape, otherShape) {
  const deltaX =
    otherShape.x + otherShape.width / 2 - (shape.x + shape.width / 2);

  const combinedHalfWidths = shape.width / 2 + otherShape.width / 2;

  const overlapX = combinedHalfWidths - Math.abs(deltaX);

  return overlapX > 0;
}

isCollidingWithVertical(shape, otherShape) {
  const deltaY =
    otherShape.y + otherShape.height / 2 - (shape.y + shape.height / 2);

  const combinedHalfHeights = shape.height / 2 + otherShape.height / 2;

  const overlapY = combinedHalfHeights - Math.abs(deltaY);

  return overlapY > 0;
}
}
