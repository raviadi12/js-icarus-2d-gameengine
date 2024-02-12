export class CanvasCreator {
    constructor(width, height) {
      this.canvas = document.createElement("canvas");
      this.canvas.width = width;
      this.canvas.height = height;
      this.context = this.canvas.getContext("2d");
      document.body.appendChild(this.canvas);
  
      this.shapes = []; // Array to store shapes
      this.texts = [];  // Array to store text information
    }
  
    drawShapes() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      // Draw shapes
      this.shapes.forEach((shape) => {
        this.context.fillStyle = shape.color || "blue";
        this.context.fillRect(shape.x, shape.y, shape.width, shape.height);
      });
  
      // Draw text
      this.texts.forEach((text) => {
        this.context.fillStyle = text.color || "black";
        this.context.font = text.font || "12px Arial";
        this.context.fillText(text.content, text.x, text.y);
      });
    }
  
    getShapeByName(name) {
      return this.shapes.find((shape) => shape.name === name);
    }
  
    drawText(content, x, y, color, font) {
      // Add text information to the texts array
      this.texts.push({ content, x, y, color, font });
  
      // Redraw the canvas with updated text
      this.drawShapes();
    }
  }