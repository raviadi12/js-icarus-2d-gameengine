export class Text {
    constructor(content, x, y, color, font) {
      this.content = content;
      this.x = x;
      this.y = y;
      this.color = color || "black";
      this.font = font || "12px Arial";
    }
  }