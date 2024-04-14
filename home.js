$(document).ready(function() {
  // Apply the ripples effect to the body of the page
  $('body').ripples({
      resolution: 512,
      dropRadius: 20, // size of the ripple
      perturbance: 0.04,
      // You can also specify imageUrl to use an image as the background of the ripples
  });

  
  // You can still add other JavaScript code here
});

document.addEventListener('DOMContentLoaded', function() {
  // Animate the full-page image to move up and down
  gsap.to("#full-page-image", {
    y: '1.9%', // Adjust the vertical movement extent
    duration: 4, // Duration of the animation in seconds
    yoyo: true, // Makes the animation go back and forth
    repeat: -1, // Makes the animation repeat indefinitely
    ease: "sine.inOut" // Smooth easing function for a more natural effect
  });
});

gsap.registerPlugin(); // We don't need any specific plugins for this effect.

function waveAnimation() {
  const tl = gsap.timeline({repeat: -1, yoyo: true}); // Create a timeline that loops back and forth indefinitely.
  
  tl.to("#foam", {
    duration: 4,
    ease: "sine.inOut",
    scale: 1.05, // Slightly increase the scale to give a 'breathing' effect.
    skewX: 5, // Skew the image to simulate the wave motion.
    transformOrigin: "center bottom" // Keeps the bottom part anchored while the top moves.
  });

  return tl;
}

const masterTimeline = gsap.timeline();
masterTimeline.add(waveAnimation());
document.addEventListener('DOMContentLoaded', function() {
  const songs = [
    { src: './Media/Audio/Persona3ColorYourLight.mp3', title: 'Persona 3 - Color Your Light' },
    { src: './Media/Audio/Persona3Lofi.mp3', title: 'Persona 3 Reload Lofi Hits' },
    { src: './Media/Audio/Persona5Lofi.mp3', title: 'Persona 5 Lofi Hits' },
    { src: './Media/Audio/Persona3RBestTracks.mp3', title: 'Persona 3 Reload Best Tracks' },
    { src: './Media/Audio/HappySpedUp.mp3', title: 'Happy Songs :) (Sped Up)' },
    { src: './Media/Audio/TheRainbowGoblins.mp3', title: 'Masayoshi Takanaka - The Rainbow Goblins (1981)' },
    { src: './Media/Audio/JapaneseSoftIndieRock.mp3', title: 'Japanese Soft Indie/Rock Jams' },
    { src: './Media/Audio/TheWeekend.mp3', title: 'Michael Gray - The Weekend (Original 12" Mix)' }
  ];
  let currentSongIndex = 0;

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var audioElement = document.getElementById('backgroundMusic');
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();

  audioSrc.connect(analyser);
  analyser.connect(audioCtx.destination);

  analyser.fftSize = 256;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  var canvas = document.getElementById('visualizer');
  var canvasCtx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = canvas.offsetHeight;  // Use offsetHeight to match the actual element size
  }
  
  // Call resizeCanvas on load and window resize
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
  
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
  
    var barWidth = (canvas.width / bufferLength) * 2.5;
    var barHeight;
    var x = 0;
  
    for(var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 3; // Increased height of bars
  
      canvasCtx.fillStyle = 'rgb(50, 50, ' + (barHeight + 100) + ')'; // Make the bars blue
      canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
  
      x += barWidth + 1;
    }
  }
  
  draw();
  

  var bgMusic = document.getElementById('backgroundMusic');
  var toggleCheckbox = document.getElementById('toggleMusic');
  var nextSongBtn = document.getElementById('nextSong');
  var prevSongBtn = document.getElementById('prevSong');
  var nowPlaying = document.getElementById('nowPlaying');
  const clickSound = document.getElementById('clickSound');



  function playSong(index) {
    bgMusic.src = songs[index].src;
    bgMusic.play()
      .then(() => nowPlaying.textContent = "Now playing... " + songs[index].title)
      .catch(e => console.log("Error playing the song: " + e));
  }

  const links = document.querySelectorAll('.menu-link a');
  links.forEach(link => {
    link.addEventListener('click', () => clickSound.play());
  });

  toggleCheckbox.addEventListener('change', function() {
    if (this.checked) {
      bgMusic.play();
      nowPlaying.textContent = "Now playing... " + songs[currentSongIndex].title;
      nextSongBtn.disabled = false;
      prevSongBtn.disabled = false;
    } else {
      bgMusic.pause();
      nowPlaying.textContent = "Now playing... Nothing!";
      nextSongBtn.disabled = true;
      prevSongBtn.disabled = true;
    }
  });

  nextSongBtn.addEventListener('click', function() {
    if (!this.disabled) {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      playSong(currentSongIndex);
    }
  });

  prevSongBtn.addEventListener('click', function() {
    if (!this.disabled) {
      currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      playSong(currentSongIndex);
    }
  });
  
  document.getElementById('startAudio').addEventListener('click', function() {
    audioCtx.resume().then(() => {
      playSong(currentSongIndex);
      drawVisualizer();
    });
  });

  // Start the first song
  playSong(currentSongIndex);
});

