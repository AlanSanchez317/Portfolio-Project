// Fragment Shader
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;
uniform float uScale; // Uniform for scaling the foam texture

varying vec2 vTexCoord;

void main() {
  // Scale the texture coordinates
  vec2 scaledUV = vec2(vTexCoord.x, vTexCoord.y * uScale);
  
  // Flip the texture vertically
  scaledUV.y = 1.0 - scaledUV.y;
  
  // Calculate the y-coordinate for the texture with the wave effect
  float wave = sin(scaledUV.x * 10.0 + uTime * 5.0) * 0.02 * uScale;

  // Apply the wave effect
  scaledUV.y += wave;

  // Check if the fragment is within the foam area
  if (scaledUV.y <= uScale) {
    gl_FragColor = texture2D(uTexture, scaledUV);
  } else {
    // Below the foam texture, fill with the solid background color
    gl_FragColor = vec4(0.125, 0.196, 0.388, 1.0); // Light blue background color
  }
}
