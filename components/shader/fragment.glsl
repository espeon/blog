varying vec3 v_color;

// fake noise
float perlinNoise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float fBm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.0;
    for (int i = 0; i < 6; i++) { // Adjust the number of octaves as needed
        value += amplitude * perlinNoise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec3 color = v_color;
    if (u_darken_top == 1.0) {
        vec2 st = gl_FragCoord.xy / resolution.xy;
        color.g -= pow(st.y + sin(-12.0) * st.x, u_shadow_power) * 0.4;
    }
    // Apply Perlin noise overlay
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float noise = fBm(st * 10.0); // Adjust the '1.0' for noise scale
    color *= (0.8 + noise * 0.3); // luminance + noise * intensity

    gl_FragColor = vec4(color, 1.0);
}
