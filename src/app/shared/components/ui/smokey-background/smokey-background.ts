import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  effect,
  input,
  viewChild,
} from '@angular/core';

const VERTEX_SHADER_SOURCE = `
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
`;

const FRAGMENT_SHADER_SOURCE = `
precision mediump float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform vec3 u_color;

void mainImage(out vec4 fragColor, in vec2 fragCoord){
    vec2 uv = fragCoord / iResolution;
    vec2 centeredUV = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);

    float time = iTime * 0.5;

    // Normalize mouse input (0.0 - 1.0) and remap to -1.0 ~ 1.0
    vec2 mouse = iMouse / iResolution;
    vec2 rippleCenter = 2.0 * mouse - 1.0;

    vec2 distortion = centeredUV;
    // Apply distortion for a wavy, smokey effect
    for (float i = 1.0; i < 8.0; i++) {
        distortion.x += 0.5 / i * cos(i * 2.0 * distortion.y + time + rippleCenter.x * 3.1415);
        distortion.y += 0.5 / i * cos(i * 2.0 * distortion.x + time + rippleCenter.y * 3.1415);
    }

    // Create a glowing wave pattern
    float wave = abs(sin(distortion.x + distortion.y + time));
    float glow = smoothstep(0.9, 0.2, wave);

    fragColor = vec4(u_color * glow, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

/** Converts a `#rrggbb` string to RGB components in the 0-1 range. */
function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.substring(1, 3), 16) / 255,
    parseInt(hex.substring(3, 5), 16) / 255,
    parseInt(hex.substring(5, 7), 16) / 255,
  ];
}

/**
 * Renders an interactive WebGL shader background that reacts to the pointer.
 * The GL context is created only in the browser, so it is SSR safe.
 */
@Component({
  selector: 'app-smokey-background',
  templateUrl: './smokey-background.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block absolute inset-0 w-full h-full overflow-hidden',
  },
})
export class SmokeyBackground implements OnDestroy {
  readonly color = input('#1E20AF'); // Default dark blue

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private gl: WebGLRenderingContext | null = null;
  private colorLocation: WebGLUniformLocation | null = null;
  private frameId = 0;
  private mouseX = 0;
  private mouseY = 0;
  private isHovering = false;
  private readonly listeners: (() => void)[] = [];

  constructor() {
    afterNextRender(() => this.initWebGl());

    // Push colour changes straight to the uniform instead of rebuilding the program.
    effect(() => {
      const [r, g, b] = hexToRgb(this.color());
      this.gl?.uniform3f(this.colorLocation, r, g, b);
    });
  }

  ngOnDestroy(): void {
    // `frameId` is only ever set by the browser render loop, so this also
    // keeps `cancelAnimationFrame` from being touched during SSR teardown.
    if (this.frameId) cancelAnimationFrame(this.frameId);
    for (const remove of this.listeners) remove();
  }

  private initWebGl(): void {
    const canvas = this.canvas().nativeElement;
    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    this.gl = gl;

    const vertexShader = this.compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragmentShader = this.compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, 'iResolution');
    const timeLocation = gl.getUniformLocation(program, 'iTime');
    const mouseLocation = gl.getUniformLocation(program, 'iMouse');
    this.colorLocation = gl.getUniformLocation(program, 'u_color');

    const [r, g, b] = hexToRgb(this.color());
    gl.uniform3f(this.colorLocation, r, g, b);

    const startTime = performance.now();
    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      gl.uniform2f(resolutionLocation, width, height);
      gl.uniform1f(timeLocation, (performance.now() - startTime) / 1000);
      gl.uniform2f(
        mouseLocation,
        this.isHovering ? this.mouseX : width / 2,
        this.isHovering ? height - this.mouseY : height / 2
      );

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      this.frameId = requestAnimationFrame(render);
    };

    render();
  }

  private compileShader(
    gl: WebGLRenderingContext,
    type: number,
    source: string
  ): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }
}
