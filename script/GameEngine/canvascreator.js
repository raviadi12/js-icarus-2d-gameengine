export class CanvasCreator {
  constructor(width, height) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.shapes = []; // Array to store shapes
    this.texts = [];  // Array to store text information
    this.images = []; // Array to store 
    this.GUIText = [];

    this.camera = {
      x: 0,
      y: 0,
      scale: 2,
    };
  }

  setCameraPosition(x, y) {
    this.camera.x = x;
    this.camera.y = y;
  }

  setCameraScale(scale) {
    this.camera.scale = scale;
  }

  drawImages() {
    this.images.forEach((image) => {
      const img = new Image();
      img.src = image.src;

      // Transform the image position based on camera
      const transformedX = (image.x - this.camera.x) * this.camera.scale;
      const transformedY = (image.y - this.camera.y) * this.camera.scale;
      const transformedWidth = image.width * this.camera.scale;
      const transformedHeight = image.height * this.camera.scale;

      // Draw the image on the canvas
      this.context.drawImage(img, transformedX, transformedY, transformedWidth, transformedHeight);
    });
  }

  drawShapes() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw shapes
    this.shapes.forEach((shape) => {
      const transformedX = (shape.x - this.camera.x) * this.camera.scale;
      const transformedY = (shape.y - this.camera.y) * this.camera.scale;
      const transformedWidth = shape.width * this.camera.scale;
      const transformedHeight = shape.height * this.camera.scale;

      this.context.fillStyle = shape.color || "blue";
      this.context.fillRect(transformedX, transformedY, transformedWidth, transformedHeight);
    });

    // Draw text
    this.texts.forEach((text) => {
      const transformedX = (text.x - this.camera.x) * this.camera.scale;
      const transformedY = (text.y - this.camera.y) * this.camera.scale;

      this.context.fillStyle = text.color || "black";
      this.context.font = text.font || "12px Monospace";
      this.context.fillText(text.content, transformedX, transformedY);
    });
    this.GUIText.forEach((text) => {

      this.context.fillStyle = text.color || "black";
      this.context.font = text.font || "12px Monospace";
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
