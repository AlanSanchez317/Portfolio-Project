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
  var audio = document.getElementById('clickSound'); // Get the audio element

  // Function to play the sound
  function playSound() {
      audio.play();
  }

  // Attach the function to click events on each menu link
  var links = document.querySelectorAll('.menu-link a'); // Get all links inside menu-link class
  links.forEach(function(link) {
      link.addEventListener('click', playSound);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var bgMusic = document.getElementById('backgroundMusic'); // Get the audio element for background music
  var toggleCheckbox = document.getElementById('toggleMusic');
  var nextSongBtn = document.getElementById('nextSong');
  var prevSongBtn = document.getElementById('prevSong');
  var nowPlaying = document.getElementById('nowPlaying');

  if (!bgMusic || !toggleCheckbox || !nextSongBtn || !prevSongBtn || !nowPlaying) {
    console.log('One or more elements are missing!');
    return; // Exit the function if any elements are missing
  }

  bgMusic.volume = 0.4; // Set the volume to 40%

  const songs = [
    { src: './Media/Audio/Persona3ColorYourLight.mp3', title: 'Persona 3 - Color Your Light' },
    { src: './Media/Audio/Persona3Lofi.mp3', title: 'Persona 3 Reload Lofi Hits' },
    // Ensure to add the file extension like .mp3 in the paths
  ];
  let currentSongIndex = 0;

  function playSong(index) {
    bgMusic.src = songs[index].src; // Set the new source for the music
    bgMusic.play()
      .then(() => {
        nowPlaying.textContent = "Now playing... " + songs[index].title; // Update the now playing text
      })
      .catch(e => console.log("Error playing the song: " + e));
  }

  toggleCheckbox.addEventListener('change', function() {
    if (this.checked) {
      bgMusic.play();
    } else {
      bgMusic.pause();
    }
  });

  nextSongBtn.addEventListener('click', function() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
  });

  prevSongBtn.addEventListener('click', function() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
  });

  // Start the first song
  playSong(currentSongIndex);
});
