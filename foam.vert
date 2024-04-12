// Vertex Shader
attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;
  // Transform the vertex position to clip space
  gl_Position = vec4(aPosition * 2.0 - 1.0, 1.0);
}
