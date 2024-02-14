import { Physics } from "./physics";
import { randomStringGenerator } from "./Utility/FastRandomStringGenerator";

export class StaticShape {
    constructor(x, y, width, height, color, id = `staticblock_${randomStringGenerator(10)}`) {
      this.id = id;
      this.dynamic = false;
      this.x = x;
      this.y = y;
      this.color = color;
      this.width = width;
      this.height = height;
      console.log("Created Static Shape with ID " + this.id)
    }
}