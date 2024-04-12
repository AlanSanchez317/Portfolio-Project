let foamTexture;
let foamShader;
let foamHeight;

function preload() {
  // Preload the texture
  foamTexture = loadImage('./Media/testing.jpg');
  
  // Load the shader
  foamShader = loadShader('foam.vert', 'foam.frag');
}

function setup() {
  // Create the WebGL canvas
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  
  // Set the foam height after the image has loaded
  foamHeight = foamTexture.height;

  // Adjust the texture mode
  textureMode(NORMAL);
  
  // Adjust the texture wrapping mode
  foamTexture.wrapS = REPEAT;
  foamTexture.wrapT = REPEAT;

  // Set up the shader and the uniforms
  shader(foamShader);
  foamShader.setUniform('uTexture', foamTexture);
  foamShader.setUniform('uFoamHeight', foamHeight / windowHeight); // Pass the normalized foam height
}

function draw() {
  // Update the time uniform every frame
  foamShader.setUniform('uTime', millis() / 1000.0);
  
  // Render a rectangle with the shader
  rect(0, 0, width, height);
}

function windowResized() {
  // Handle window resizing
  resizeCanvas(windowWidth, windowHeight);
  
  // Update uniforms to account for the new canvas size
  foamShader.setUniform('uResolution', [width, height]);
  foamShader.setUniform('uFoamHeight', foamHeight / windowHeight); // Update the normalized foam height
}
