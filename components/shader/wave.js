/*
 *   Stripe WebGl Gradient Animation
 *   All Credits to Stripe.com
 *   ScrollObserver functionality to disable animation when not scrolled into view has been disabled and
 *   commented out for now.
 */

/*
 *   HTML
 *   <canvas id="gradient-canvas" data-transition-in />
 */

/*
 *   CSS
 *   #gradient-canvas {
 *     width:100%;
 *     height:100%;
 *     --gradient-color-1: #6a00ff;
 *     --gradient-color-2: #5618ad;
 *     --gradient-color-3: #ff9382;
 *     --gradient-color-4: #f6575b;
 *   }
 */

/*
 *   JS
 *   import { Gradient } from './Gradient.js'
 *
 *   // Create your instance
 *   const gradient = new Gradient()
 *
 *   // Call `initGradient` with the selector to your canvas
 *   gradient.initGradient('#gradient-canvas')
 */

import blendGlsl from "./blend.glsl";
import fragmentGlsl from "./fragment.glsl";
import noiseGlsl from "./noise.glsl";
import vertexGlsl from "./vert.glsl";

//Converting colors to proper format
function normalizeColor(hexCode) {
  return [
    ((hexCode >> 16) & 255) / 255,
    ((hexCode >> 8) & 255) / 255,
    (255 & hexCode) / 255,
  ];
}
["SCREEN", "LINEAR_LIGHT"].reduce(
  (hexCode, t, n) =>
    Object.assign(hexCode, {
      [t]: n,
    }),
  {},
);

//Essential functionality of WebGl
//t = width
//n = height
class MiniGl {
  constructor(canvas, width, height, debug = false) {
    const _miniGl = this,
      debug_output =
        -1 !== document.location.search.toLowerCase().indexOf("debug=webgl");
    (_miniGl.canvas = canvas),
      (_miniGl.gl = _miniGl.canvas.getContext("webgl", {
        antialias: true,
      })),
      (_miniGl.meshes = []);
    const context = _miniGl.gl;
    width && height && this.setSize(width, height),
      _miniGl.lastDebugMsg,
      (_miniGl.debug =
        debug && debug_output
          ? function (e) {
              const t = new Date();
              t - _miniGl.lastDebugMsg > 1e3 && console.log("---"),
                console.log(
                  t.toLocaleTimeString() +
                    Array(Math.max(0, 32 - e.length)).join(" ") +
                    e +
                    ": ",
                  ...Array.from(arguments).slice(1),
                ),
                (_miniGl.lastDebugMsg = t);
            }
          : () => {}),
      Object.defineProperties(_miniGl, {
        Material: {
          enumerable: false,
          value: class {
            constructor(vertexShaders, fragments, uniforms = {}) {
              const material = this;
              function getShaderByType(type, source) {
                const shader = context.createShader(type);
                return (
                  context.shaderSource(shader, source),
                  context.compileShader(shader),
                  context.getShaderParameter(shader, context.COMPILE_STATUS) ||
                    console.error(context.getShaderInfoLog(shader)),
                  _miniGl.debug("Material.compileShaderSource", {
                    source: source,
                  }),
                  shader
                );
              }
              function getUniformVariableDeclarations(uniforms, type) {
                return Object.entries(uniforms)
                  .map(([uniform, value]) =>
                    value.getDeclaration(uniform, type),
                  )
                  .join("\n");
              }
              (material.uniforms = uniforms), (material.uniformInstances = []);

              const prefix =
                "\n              precision highp float;\n            ";
              (material.vertexSource = `\n              ${prefix}\n              attribute vec4 position;\n              attribute vec2 uv;\n              attribute vec2 uvNorm;\n              ${getUniformVariableDeclarations(
                _miniGl.commonUniforms,
                "vertex",
              )}\n              ${getUniformVariableDeclarations(
                uniforms,
                "vertex",
              )}\n              ${vertexShaders}\n            `),
                (material.Source = `\n              ${prefix}\n              ${getUniformVariableDeclarations(
                  _miniGl.commonUniforms,
                  "fragment",
                )}\n              ${getUniformVariableDeclarations(
                  uniforms,
                  "fragment",
                )}\n              ${fragments}\n            `),
                (material.vertexShader = getShaderByType(
                  context.VERTEX_SHADER,
                  material.vertexSource,
                )),
                (material.fragmentShader = getShaderByType(
                  context.FRAGMENT_SHADER,
                  material.Source,
                )),
                (material.program = context.createProgram()),
                context.attachShader(material.program, material.vertexShader),
                context.attachShader(material.program, material.fragmentShader),
                context.linkProgram(material.program),
                context.getProgramParameter(
                  material.program,
                  context.LINK_STATUS,
                ) || console.error(context.getProgramInfoLog(material.program)),
                context.useProgram(material.program),
                material.attachUniforms(void 0, _miniGl.commonUniforms),
                material.attachUniforms(void 0, material.uniforms);
            }
            //t = uniform
            attachUniforms(name, uniforms) {
              //n  = material
              const material = this;
              void 0 === name
                ? Object.entries(uniforms).forEach(([name, uniform]) => {
                    material.attachUniforms(name, uniform);
                  })
                : "array" == uniforms.type
                  ? uniforms.value.forEach((uniform, i) =>
                      material.attachUniforms(`${name}[${i}]`, uniform),
                    )
                  : "struct" == uniforms.type
                    ? Object.entries(uniforms.value).forEach(([uniform, i]) =>
                        material.attachUniforms(`${name}.${uniform}`, i),
                      )
                    : (_miniGl.debug("Material.attachUniforms", {
                        name: name,
                        uniform: uniforms,
                      }),
                      material.uniformInstances.push({
                        uniform: uniforms,
                        location: context.getUniformLocation(
                          material.program,
                          name,
                        ),
                      }));
            }
          },
        },
        Uniform: {
          enumerable: !1,
          value: class {
            constructor(e) {
              (this.type = "float"), Object.assign(this, e);
              (this.typeFn =
                {
                  float: "1f",
                  int: "1i",
                  vec2: "2fv",
                  vec3: "3fv",
                  vec4: "4fv",
                  mat4: "Matrix4fv",
                }[this.type] || "1f"),
                this.update();
            }
            update(value) {
              void 0 !== this.value &&
                context[`uniform${this.typeFn}`](
                  value,
                  0 === this.typeFn.indexOf("Matrix")
                    ? this.transpose
                    : this.value,
                  0 === this.typeFn.indexOf("Matrix") ? this.value : null,
                );
            }
            //e - name
            //t - type
            //n - length
            getDeclaration(name, type, length) {
              const uniform = this;
              if (uniform.excludeFrom !== type) {
                if ("array" === uniform.type)
                  return (
                    uniform.value[0].getDeclaration(
                      name,
                      type,
                      uniform.value.length,
                    ) + `\nconst int ${name}_length = ${uniform.value.length};`
                  );
                if ("struct" === uniform.type) {
                  let name_no_prefix = name.replace("u_", "");
                  return (
                    (name_no_prefix =
                      name_no_prefix.charAt(0).toUpperCase() +
                      name_no_prefix.slice(1)),
                    `uniform struct ${name_no_prefix}
                                {\n` +
                      Object.entries(uniform.value)
                        .map(([name, uniform]) =>
                          uniform
                            .getDeclaration(name, type)
                            .replace(/^uniform/, ""),
                        )
                        .join("") +
                      `\n} ${name}${length > 0 ? `[${length}]` : ""};`
                  );
                }
                return `uniform ${uniform.type} ${name}${
                  length > 0 ? `[${length}]` : ""
                };`;
              }
            }
          },
        },
        PlaneGeometry: {
          enumerable: !1,
          value: class {
            constructor(width, height, n, i, orientation) {
              context.createBuffer(),
                (this.attributes = {
                  position: new _miniGl.Attribute({
                    target: context.ARRAY_BUFFER,
                    size: 3,
                  }),
                  uv: new _miniGl.Attribute({
                    target: context.ARRAY_BUFFER,
                    size: 2,
                  }),
                  uvNorm: new _miniGl.Attribute({
                    target: context.ARRAY_BUFFER,
                    size: 2,
                  }),
                  index: new _miniGl.Attribute({
                    target: context.ELEMENT_ARRAY_BUFFER,
                    size: 3,
                    type: context.UNSIGNED_SHORT,
                  }),
                }),
                this.setTopology(n, i),
                this.setSize(width, height, orientation);
            }
            setTopology(e = 1, t = 1) {
              const n = this;
              (n.xSegCount = e),
                (n.ySegCount = t),
                (n.vertexCount = (n.xSegCount + 1) * (n.ySegCount + 1)),
                (n.quadCount = n.xSegCount * n.ySegCount * 2),
                (n.attributes.uv.values = new Float32Array(2 * n.vertexCount)),
                (n.attributes.uvNorm.values = new Float32Array(
                  2 * n.vertexCount,
                )),
                (n.attributes.index.values = new Uint16Array(3 * n.quadCount));
              for (let e = 0; e <= n.ySegCount; e++)
                for (let t = 0; t <= n.xSegCount; t++) {
                  const i = e * (n.xSegCount + 1) + t;
                  if (
                    ((n.attributes.uv.values[2 * i] = t / n.xSegCount),
                    (n.attributes.uv.values[2 * i + 1] = 1 - e / n.ySegCount),
                    (n.attributes.uvNorm.values[2 * i] =
                      (t / n.xSegCount) * 2 - 1),
                    (n.attributes.uvNorm.values[2 * i + 1] =
                      1 - (e / n.ySegCount) * 2),
                    t < n.xSegCount && e < n.ySegCount)
                  ) {
                    const s = e * n.xSegCount + t;
                    (n.attributes.index.values[6 * s] = i),
                      (n.attributes.index.values[6 * s + 1] =
                        i + 1 + n.xSegCount),
                      (n.attributes.index.values[6 * s + 2] = i + 1),
                      (n.attributes.index.values[6 * s + 3] = i + 1),
                      (n.attributes.index.values[6 * s + 4] =
                        i + 1 + n.xSegCount),
                      (n.attributes.index.values[6 * s + 5] =
                        i + 2 + n.xSegCount);
                  }
                }
              n.attributes.uv.update(),
                n.attributes.uvNorm.update(),
                n.attributes.index.update(),
                _miniGl.debug("Geometry.setTopology", {
                  uv: n.attributes.uv,
                  uvNorm: n.attributes.uvNorm,
                  index: n.attributes.index,
                });
            }
            setSize(width = 1, height = 1, orientation = "xz") {
              const geometry = this;
              (geometry.width = width),
                (geometry.height = height),
                (geometry.orientation = orientation),
                (geometry.attributes.position.values &&
                  geometry.attributes.position.values.length ===
                    3 * geometry.vertexCount) ||
                  (geometry.attributes.position.values = new Float32Array(
                    3 * geometry.vertexCount,
                  ));
              const o = width / -2,
                r = height / -2,
                segment_width = width / geometry.xSegCount,
                segment_height = height / geometry.ySegCount;
              for (let yIndex = 0; yIndex <= geometry.ySegCount; yIndex++) {
                const t = r + yIndex * segment_height;
                for (let xIndex = 0; xIndex <= geometry.xSegCount; xIndex++) {
                  const r = o + xIndex * segment_width,
                    l = yIndex * (geometry.xSegCount + 1) + xIndex;
                  (geometry.attributes.position.values[
                    3 * l + "xyz".indexOf(orientation[0])
                  ] = r),
                    (geometry.attributes.position.values[
                      3 * l + "xyz".indexOf(orientation[1])
                    ] = -t);
                }
              }
              geometry.attributes.position.update(),
                _miniGl.debug("Geometry.setSize", {
                  position: geometry.attributes.position,
                });
            }
          },
        },
        Mesh: {
          enumerable: !1,
          value: class {
            constructor(geometry, material) {
              const mesh = this;
              (mesh.geometry = geometry),
                (mesh.material = material),
                (mesh.wireframe = !1),
                (mesh.attributeInstances = []),
                Object.entries(mesh.geometry.attributes).forEach(
                  ([e, attribute]) => {
                    mesh.attributeInstances.push({
                      attribute: attribute,
                      location: attribute.attach(e, mesh.material.program),
                    });
                  },
                ),
                _miniGl.meshes.push(mesh),
                _miniGl.debug("Mesh.constructor", {
                  mesh: mesh,
                });
            }
            draw() {
              context.useProgram(this.material.program),
                this.material.uniformInstances.forEach(
                  ({ uniform: e, location: t }) => e.update(t),
                ),
                this.attributeInstances.forEach(
                  ({ attribute: e, location: t }) => e.use(t),
                ),
                context.drawElements(
                  this.wireframe ? context.LINES : context.TRIANGLES,
                  this.geometry.attributes.index.values.length,
                  context.UNSIGNED_SHORT,
                  0,
                );
            }
            remove() {
              _miniGl.meshes = _miniGl.meshes.filter((e) => e != this);
            }
          },
        },
        Attribute: {
          enumerable: !1,
          value: class {
            constructor(e) {
              (this.type = context.FLOAT),
                (this.normalized = !1),
                (this.buffer = context.createBuffer()),
                Object.assign(this, e),
                this.update();
            }
            update() {
              void 0 !== this.values &&
                (context.bindBuffer(this.target, this.buffer),
                context.bufferData(
                  this.target,
                  this.values,
                  context.STATIC_DRAW,
                ));
            }
            attach(e, t) {
              const n = context.getAttribLocation(t, e);
              return (
                this.target === context.ARRAY_BUFFER &&
                  (context.enableVertexAttribArray(n),
                  context.vertexAttribPointer(
                    n,
                    this.size,
                    this.type,
                    this.normalized,
                    0,
                    0,
                  )),
                n
              );
            }
            use(e) {
              context.bindBuffer(this.target, this.buffer),
                this.target === context.ARRAY_BUFFER &&
                  (context.enableVertexAttribArray(e),
                  context.vertexAttribPointer(
                    e,
                    this.size,
                    this.type,
                    this.normalized,
                    0,
                    0,
                  ));
            }
          },
        },
      });
    const a = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    _miniGl.commonUniforms = {
      projectionMatrix: new _miniGl.Uniform({
        type: "mat4",
        value: a,
      }),
      modelViewMatrix: new _miniGl.Uniform({
        type: "mat4",
        value: a,
      }),
      resolution: new _miniGl.Uniform({
        type: "vec2",
        value: [1, 1],
      }),
      aspectRatio: new _miniGl.Uniform({
        type: "float",
        value: 1,
      }),
    };
  }
  setSize(e = 1080, t = 1920) {
    (this.width = e),
      (this.height = t),
      (this.canvas.width = e),
      (this.canvas.height = t),
      this.gl.viewport(0, 0, e, t),
      (this.commonUniforms.resolution.value = [e, t]),
      (this.commonUniforms.aspectRatio.value = e / t),
      this.debug("MiniGL.setSize", {
        width: e,
        height: t,
      });
  }
  //left, right, top, bottom, near, far
  setOrthographicCamera(e = 0, t = 0, n = 0, i = -2e3, s = 2e3) {
    (this.commonUniforms.projectionMatrix.value = [
      2 / this.width,
      0,
      0,
      0,
      0,
      2 / this.height,
      0,
      0,
      0,
      0,
      2 / (i - s),
      0,
      e,
      t,
      n,
      1,
    ]),
      this.debug(
        "setOrthographicCamera",
        this.commonUniforms.projectionMatrix.value,
      );
  }
  render() {
    this.gl.clearColor(0, 0, 0, 0),
      this.gl.clearDepth(1),
      this.meshes.forEach((e) => e.draw());
  }
}

//Sets initial properties
function e(object, propertyName, val) {
  return (
    propertyName in object
      ? Object.defineProperty(object, propertyName, {
          value: val,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (object[propertyName] = val),
    object
  );
}

//Gradient object
class Gradient {
  constructor(...t) {
    e(this, "el", void 0),
      e(this, "cssVarRetries", 0),
      e(this, "maxCssVarRetries", 200),
      e(this, "angle", 0),
      e(this, "isLoadedClass", !1),
      e(this, "isScrolling", !1),
      /*e(this, "isStatic", o.disableAmbientAnimations()),*/ e(
        this,
        "scrollingTimeout",
        void 0,
      ),
      e(this, "scrollingRefreshDelay", 200),
      e(this, "isIntersecting", !1),
      e(this, "shaderFiles", void 0),
      e(this, "vertexShader", void 0),
      e(this, "sectionColors", void 0),
      e(this, "computedCanvasStyle", void 0),
      e(this, "conf", void 0),
      e(this, "uniforms", void 0),
      e(this, "t", 1253106),
      e(this, "last", 0),
      e(this, "width", void 0),
      e(this, "minWidth", 1111),
      e(this, "height", 600),
      e(this, "xSegCount", void 0),
      e(this, "ySegCount", void 0),
      e(this, "mesh", void 0),
      e(this, "material", void 0),
      e(this, "geometry", void 0),
      e(this, "minigl", void 0),
      e(this, "scrollObserver", void 0),
      e(this, "amp", 320),
      e(this, "seed", 5),
      e(this, "freqX", 14e-5),
      e(this, "freqY", 29e-5),
      e(this, "freqDelta", 1e-5),
      e(this, "activeColors", [1, 1, 1, 1]),
      e(this, "isMetaKey", !1),
      e(this, "isGradientLegendVisible", !1),
      e(this, "isMouseDown", !1),
      e(this, "handleScroll", () => {
        clearTimeout(this.scrollingTimeout),
          (this.scrollingTimeout = setTimeout(
            this.handleScrollEnd,
            this.scrollingRefreshDelay,
          )),
          this.isGradientLegendVisible && this.hideGradientLegend(),
          this.conf.playing && ((this.isScrolling = !0), this.pause());
      }),
      e(this, "handleScrollEnd", () => {
        (this.isScrolling = !1), this.isIntersecting && this.play();
      }),
      e(this, "resize", () => {
        (this.width = window.innerWidth),
          this.minigl.setSize(this.width, this.height),
          this.minigl.setOrthographicCamera(),
          (this.xSegCount = Math.ceil(this.width * this.conf.density[0])),
          (this.ySegCount = Math.ceil(this.height * this.conf.density[1])),
          this.mesh.geometry.setTopology(this.xSegCount, this.ySegCount),
          this.mesh.geometry.setSize(this.width, this.height),
          (this.mesh.material.uniforms.u_shadow_power.value =
            this.width < 600 ? 5 : 6);
      }),
      e(this, "handleMouseDown", (e) => {
        this.isGradientLegendVisible &&
          ((this.isMetaKey = e.metaKey),
          (this.isMouseDown = !0),
          !1 === this.conf.playing && requestAnimationFrame(this.animate));
      }),
      e(this, "handleMouseUp", () => {
        this.isMouseDown = !1;
      }),
      e(this, "animate", (e) => {
        if (!this.shouldSkipFrame(e) || this.isMouseDown) {
          if (
            ((this.t += Math.min(e - this.last, 1e3 / 15)),
            (this.last = e),
            this.isMouseDown)
          ) {
            let e = 160;
            this.isMetaKey && (e = -160), (this.t += e);
          }
          (this.mesh.material.uniforms.u_time.value = this.t),
            this.minigl.render();
        }
        if (0 !== this.last && this.isStatic)
          return this.minigl.render(), void this.disconnect();
        /*this.isIntersecting && */ (this.conf.playing || this.isMouseDown) &&
          requestAnimationFrame(this.animate);
      }),
      e(this, "addIsLoadedClass", () => {
        /*this.isIntersecting && */ !this.isLoadedClass &&
          ((this.isLoadedClass = !0),
          this.el.classList.add("isLoaded"),
          setTimeout(() => {
            this.el.parentElement &&
              this.el.parentElement.classList.add("isLoaded");
          }, 3e3));
      }),
      e(this, "pause", () => {
        this.conf.playing = false;
      }),
      e(this, "play", () => {
        requestAnimationFrame(this.animate), (this.conf.playing = true);
      }),
      e(this, "initGradient", (selector) => {
        this.el = document.querySelector(selector);
        this.connect();
        return this;
      });
  }
  async connect() {
    (this.shaderFiles = {
      vertex: vertexGlsl,
      fragment: fragmentGlsl,
      noise: noiseGlsl,
      blend: blendGlsl,
    }),
      (this.conf = {
        presetName: "",
        wireframe: false,
        density: [0.06, 0.16],
        zoom: 1,
        rotation: 0,
        playing: true,
      }),
      document.querySelectorAll("canvas").length < 1
        ? console.log("DID NOT LOAD HERO STRIPE CANVAS")
        : ((this.minigl = new MiniGl(this.el, null, null, !0)),
          requestAnimationFrame(() => {
            this.el &&
              ((this.computedCanvasStyle = getComputedStyle(this.el)),
              this.waitForCssVars());
          }));
    /*
        this.scrollObserver = await s.create(.1, !1),
        this.scrollObserver.observe(this.el),
        this.scrollObserver.onSeparate(() => {
            window.removeEventListener("scroll", this.handleScroll), window.removeEventListener("mousedown", this.handleMouseDown), window.removeEventListener("mouseup", this.handleMouseUp), window.removeEventListener("keydown", this.handleKeyDown), this.isIntersecting = !1, this.conf.playing && this.pause()
        }),
        this.scrollObserver.onIntersect(() => {
            window.addEventListener("scroll", this.handleScroll), window.addEventListener("mousedown", this.handleMouseDown), window.addEventListener("mouseup", this.handleMouseUp), window.addEventListener("keydown", this.handleKeyDown), this.isIntersecting = !0, this.addIsLoadedClass(), this.play()
        })*/
  }
  disconnect() {
    this.scrollObserver &&
      (window.removeEventListener("scroll", this.handleScroll),
      window.removeEventListener("mousedown", this.handleMouseDown),
      window.removeEventListener("mouseup", this.handleMouseUp),
      window.removeEventListener("keydown", this.handleKeyDown),
      this.scrollObserver.disconnect()),
      window.removeEventListener("resize", this.resize);
  }
  initMaterial() {
    this.uniforms = {
      u_time: new this.minigl.Uniform({
        value: 0,
      }),
      u_shadow_power: new this.minigl.Uniform({
        value: 5,
      }),
      u_darken_top: new this.minigl.Uniform({
        value: "" === this.el.dataset.jsDarkenTop ? 1 : 0,
      }),
      u_active_colors: new this.minigl.Uniform({
        value: this.activeColors,
        type: "vec4",
      }),
      u_global: new this.minigl.Uniform({
        value: {
          noiseFreq: new this.minigl.Uniform({
            value: [this.freqX, this.freqY],
            type: "vec2",
          }),
          noiseSpeed: new this.minigl.Uniform({
            value: 5e-6,
          }),
        },
        type: "struct",
      }),
      u_vertDeform: new this.minigl.Uniform({
        value: {
          incline: new this.minigl.Uniform({
            value: Math.sin(this.angle) / Math.cos(this.angle),
          }),
          offsetTop: new this.minigl.Uniform({
            value: -0.5,
          }),
          offsetBottom: new this.minigl.Uniform({
            value: -0.5,
          }),
          noiseFreq: new this.minigl.Uniform({
            value: [1, 3],
            type: "vec2",
          }),
          noiseAmp: new this.minigl.Uniform({
            value: this.amp,
          }),
          noiseSpeed: new this.minigl.Uniform({
            value: 10,
          }),
          noiseFlow: new this.minigl.Uniform({
            value: 3,
          }),
          noiseSeed: new this.minigl.Uniform({
            value: this.seed,
          }),
        },
        type: "struct",
        excludeFrom: "fragment",
      }),
      u_baseColor: new this.minigl.Uniform({
        value: this.sectionColors[0],
        type: "vec3",
        excludeFrom: "fragment",
      }),
      u_waveLayers: new this.minigl.Uniform({
        value: [],
        excludeFrom: "fragment",
        type: "array",
      }),
    };
    for (let e = 1; e < this.sectionColors.length; e += 1)
      this.uniforms.u_waveLayers.value.push(
        new this.minigl.Uniform({
          value: {
            color: new this.minigl.Uniform({
              value: this.sectionColors[e],
              type: "vec3",
            }),
            noiseFreq: new this.minigl.Uniform({
              value: [
                1 + e / this.sectionColors.length,
                3 + e / this.sectionColors.length,
              ],
              type: "vec2",
            }),
            noiseSpeed: new this.minigl.Uniform({
              value: 11 + 0.3 * e,
            }),
            noiseFlow: new this.minigl.Uniform({
              value: 6.5 + 0.3 * e,
            }),
            noiseSeed: new this.minigl.Uniform({
              value: this.seed + 10 * e,
            }),
            noiseFloor: new this.minigl.Uniform({
              value: 0.1,
            }),
            noiseCeil: new this.minigl.Uniform({
              value: 0.63 + 0.07 * e,
            }),
          },
          type: "struct",
        }),
      );
    return (
      (this.vertexShader = [
        this.shaderFiles.noise,
        this.shaderFiles.blend,
        this.shaderFiles.vertex,
      ].join("\n\n")),
      new this.minigl.Material(
        this.vertexShader,
        this.shaderFiles.fragment,
        this.uniforms,
      )
    );
  }
  initMesh() {
    (this.material = this.initMaterial()),
      (this.geometry = new this.minigl.PlaneGeometry()),
      (this.mesh = new this.minigl.Mesh(this.geometry, this.material));
  }
  shouldSkipFrame(e) {
    return (
      !!window.document.hidden ||
      !this.conf.playing ||
      parseInt(e, 10) % 2 == 0 ||
      void 0
    );
  }
  updateFrequency(e) {
    (this.freqX += e), (this.freqY += e);
  }
  toggleColor(index) {
    this.activeColors[index] = 0 === this.activeColors[index] ? 1 : 0;
  }
  showGradientLegend() {
    this.width > this.minWidth &&
      ((this.isGradientLegendVisible = !0),
      document.body.classList.add("isGradientLegendVisible"));
  }
  hideGradientLegend() {
    (this.isGradientLegendVisible = !1),
      document.body.classList.remove("isGradientLegendVisible");
  }
  init() {
    this.initGradientColors(),
      this.initMesh(),
      this.resize(),
      requestAnimationFrame(this.animate),
      window.addEventListener("resize", this.resize);
  }
  /*
   * Waiting for the css variables to become available, usually on page load before we can continue.
   * Using default colors assigned below if no variables have been found after maxCssVarRetries
   */
  waitForCssVars() {
    if (
      this.computedCanvasStyle &&
      -1 !==
        this.computedCanvasStyle
          .getPropertyValue("--gradient-color-1")
          .indexOf("#")
    )
      this.init(), this.addIsLoadedClass();
    else {
      if (
        ((this.cssVarRetries += 1), this.cssVarRetries > this.maxCssVarRetries)
      ) {
        return (
          (this.sectionColors = [16711680, 16711680, 16711935, 65280, 255]),
          void this.init()
        );
      }
      requestAnimationFrame(() => this.waitForCssVars());
    }
  }
  /*
   * Initializes the four section colors by retrieving them from css variables.
   */
  initGradientColors() {
    this.sectionColors = [
      "--gradient-color-1",
      "--gradient-color-2",
      "--gradient-color-3",
      "--gradient-color-4",
    ]
      .map((cssPropertyName) => {
        let hex = this.computedCanvasStyle
          .getPropertyValue(cssPropertyName)
          .trim();
        //Check if shorthand hex value was used and double the length so the conversion in normalizeColor will work.
        if (4 === hex.length) {
          const hexTemp = hex
            .substr(1)
            .split("")
            .map((hexTemp) => hexTemp + hexTemp)
            .join("");
          hex = `#${hexTemp}`;
        }
        return hex && `0x${hex.substr(1)}`;
      })
      .filter(Boolean)
      .map(normalizeColor);
  }
}

export { Gradient };

/*
 *Finally initializing the Gradient class, assigning a canvas to it and calling Gradient.connect() which initializes everything,
 * Use Gradient.pause() and Gradient.play() for controls.
 *
 * Here are some default property values you can change anytime:
 * Amplitude:    Gradient.amp = 0
 * Colors:       Gradient.sectionColors (if you change colors, use normalizeColor(#hexValue)) before you assign it.
 *
 *
 * Useful functions
 * Gradient.toggleColor(index)
 * Gradient.updateFrequency(freq)
 */
