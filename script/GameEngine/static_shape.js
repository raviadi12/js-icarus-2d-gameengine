import { Physics } from "./physics";

export class StaticShape {
    constructor(x, y, width, height, color) {
      this.dynamic = false;
      this.x = x;
      this.y = y;
      this.color = color;
      this.width = width;
      this.height = height;
    }
}