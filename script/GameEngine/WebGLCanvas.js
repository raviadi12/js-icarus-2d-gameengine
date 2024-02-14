export class WebGLCanvasCreator {
  constructor(width, height) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    document.body.appendChild(this.canvas);

    this.gl =
      this.canvas.getContext("webgl") ||
      this.canvas.getContext("experimental-webgl");
    if (!this.gl) {
      console.error(
        "Unable to initialize WebGL. Your browser may not support it."
      );
      return;
    }

    this.shapes = [];
    this.texts = [];

    this.initBuffers();
    this.initShaders();
  }

  initBuffers() {
    // Create a buffer for the rectangle vertices
    this.rectBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.rectBuffer);

    const vertices = new Float32Array([
      0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
    ]);

    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

    // Create a vertex buffer object for position
    this.positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
  }

  initShaders() {
    // Vertex shader program
    const vsSource = `
            attribute vec4 a_position;

            void main(void) {
                gl_Position = a_position;
            }
        `;

    // Fragment shader program
    const fsSource = `
            precision mediump float;

            uniform vec4 u_color;

            void main(void) {
                gl_FragColor = u_color;
            }
        `;

    // Compile shaders
    const vertexShader = this.compileShader(this.gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.compileShader(
      this.gl.FRAGMENT_SHADER,
      fsSource
    );

    // Link shaders
    this.shaderProgram = this.gl.createProgram();
    this.gl.attachShader(this.shaderProgram, vertexShader);
    this.gl.attachShader(this.shaderProgram, fragmentShader);
    this.gl.linkProgram(this.shaderProgram);

    if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
      console.error(
        "Unable to initialize the shader program: " +
          this.gl.getProgramInfoLog(this.shaderProgram)
      );
    }

    this.gl.useProgram(this.shaderProgram);

    // Get attribute and uniform locations
    this.positionAttribute = this.gl.getAttribLocation(
      this.shaderProgram,
      "a_position"
    );
    this.colorUniform = this.gl.getUniformLocation(
      this.shaderProgram,
      "u_color"
    );
  }

  compileShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(
        "Error compiling shader: " + this.gl.getShaderInfoLog(shader)
      );
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  drawShapes() {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.shapes.forEach((shape) => {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
      this.gl.vertexAttribPointer(
        this.positionAttribute,
        2,
        this.gl.FLOAT,
        false,
        0,
        0
      );
      this.gl.enableVertexAttribArray(this.positionAttribute);

      const defaultColor = [0.0, 0.0, 1.0, 1.0];
      let colorArray;
      if (shape.color) {
        colorArray = new Float32Array(shape.color);
      } else {
        colorArray = new Float32Array(defaultColor);
      }
      this.gl.uniform4fv(this.colorUniform, colorArray);
      

      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    });
  }

  getShapeByName(name) {
    return this.shapes.find((shape) => shape.name === name);
  }

  drawText(content, x, y, color, font) {
    // For simplicity, assume drawing text still uses 2D Canvas API
    // You may need to implement a separate WebGL text rendering solution

    // Add text information to the texts array
    this.texts.push({ content, x, y, color, font });

    // Redraw the canvas with updated text
    this.drawShapes();
  }
}
