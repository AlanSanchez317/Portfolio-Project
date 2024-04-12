// Fragment Shader
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;
uniform float uFoamHeight; // Uniform for the relative height of the foam texture

varying vec2 vTexCoord;

void main() {
  // Calculate the y-coordinate for the texture with the wave effect
  float wave = sin(vTexCoord.x * 10.0 + uTime * 5.0) * 0.02;
  
  // Adjusted vTexCoord for the foam texture
  vec2 foamTexCoord = vec2(vTexCoord.x, vTexCoord.y + wave);

  // Get the color from the foam texture or the background color
  // The check here ensures the foam texture is drawn on the top part of the canvas
  if (vTexCoord.y > 1.0 - uFoamHeight) {
    gl_FragColor = texture2D(uTexture, foamTexCoord);
  } else {
    gl_FragColor = vec4(0.678, 0.847, 0.902, 1.0); // Light blue background color
  }
}
