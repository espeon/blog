varying vec3 v_color;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise2(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

float luma(vec4 color) {
  return dot(color.rgb, vec3(0.299, 0.587, 0.114));
}


float dither2x2(vec2 position, float brightness) {
  int x = int(mod(position.x, 2.0));
  int y = int(mod(position.y, 2.0));
  int index = x + y * 2;
  float limit = 0.0;

  if (x < 8) {
    if (index == 0) limit = 0.25;
    if (index == 1) limit = 0.75;
    if (index == 2) limit = 1.00;
    if (index == 3) limit = 0.50;
  }

  return brightness < limit ? 0.0 : 1.0;
}

vec3 dither2x2(vec2 position, vec3 color) {
  return color * dither2x2(position, luma(color));
}

vec4 dither2x2(vec2 position, vec4 color) {
  return vec4(color.rgb * dither2x2(position, luma(color)), 1.0);
}

float perlinNoise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float fBm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 2; i++) { // Adjust the number of octaves as needed
        value += amplitude * perlinNoise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

// clampOpp
// Clamps a value if it is outside the specified range.
// If the value is within the range, it returns a specified value.
float clampOpp(float value, float min, float max, float val) {
    // If the float is in bounds, inBounds will be 0
    float inBounds = step(min, value) - step(value, max);
    return mix(val, value, inBounds);
}

void main() {
    vec3 color = v_color;
    vec2 st = gl_FragCoord.xy / resolution.xy;

    float lightness = color.r + color.g + color.b / 3.;

    // Darken effect
    if (u_darken_top == 1.0) {
        color.g -= pow(st.y + sin(-12.0) * st.x, u_shadow_power) * 0.4;
    }

    // Apply simplex noise overlay
    // Only changes the noise seed if lightness has changed

    float noise2 = fBm(st * 10.0 + clampOpp(lightness, 0.15, 1.7, 0.0));
    color *= (max(0.9, 1.0 - lightness) + noise2 * max(0.1, 1.0 - lightness));

    // // Apply simplex noise overlay to a separate color
    // float noise = fBm(st * 100.0 + max(0.9, 1. - lightness));
    // vec3 nc = color * (1.0 + noise * 0.3); // Combine noise with color

    // // Apply dithering to the modified color
    // vec3 dc = (dither(gl_FragCoord.xy, nc));

    // float threshold = .2; // Adjust this value to reduce darkness
    // dc = mix(dc, vec3(1.0), step(threshold, dc.r + dc.g + dc.b / 3.));

    // // Blend the dithered color with the original color
    // float di = 0.075; // Adjust this value for how much darker the dithered areas should be
    // color = mix(color, dc, 0.1);

    gl_FragColor = vec4(color, 1.0);
}
