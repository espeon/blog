varying vec3 v_color;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: dither = require(glsl-dither/2x2)

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
