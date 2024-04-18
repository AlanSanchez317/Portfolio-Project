document.addEventListener('DOMContentLoaded', function() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const audioElement = document.getElementById('backgroundMusic');
    const analyser = audioCtx.createAnalyser();
    let audioSrc = audioCtx.createMediaElementSource(audioElement);
    audioSrc.connect(analyser);
    analyser.connect(audioCtx.destination);

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

    const canvas = document.getElementById('visualizer');
    const canvasCtx = canvas.getContext('2d');
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function draw() {
        requestAnimationFrame(draw);
        let dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        let barWidth = (canvas.width / dataArray.length) * 2.5;
        let barHeight;
        let x = 0;

        for(let i = 0; i < dataArray.length; i++) {
            barHeight = dataArray[i] * 2;
            canvasCtx.fillStyle = `rgb(50, 50, ${barHeight + 100})`;
            canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
        }
    }
    draw();

    const nowPlaying = document.getElementById('nowPlaying');
    function playSong(index) {
        const song = songs[index];
        audioElement.src = song.src;
        audioElement.play().then(() => {
            nowPlaying.textContent = "Now playing... " + song.title;
        }).catch(e => {
            console.error("Error playing the song:", e);
        });
    }

    document.getElementById('nextSong').addEventListener('click', () => {
        if (!audioElement.paused) {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            playSong(currentSongIndex);
        }
    });

    document.getElementById('prevSong').addEventListener('click', () => {
        if (!audioElement.paused) {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            playSong(currentSongIndex);
        }
    });

    document.getElementById('toggleMusic').addEventListener('change', function() {
        if (this.checked) {
            audioElement.play();
        } else {
            audioElement.pause();
            nowPlaying.textContent = "Now playing... Nothing!";
        }
    });

    document.getElementById('startAudio').addEventListener('click', () => {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        playSong(currentSongIndex);
    });

    $('body').ripples({
        resolution: 512,
        dropRadius: 20,
        perturbance: 0.04
    });

    const coolBlueThingy = document.getElementById('Cool-Blue-Thingy');
    function bloomEffect() {
        gsap.fromTo(coolBlueThingy, { filter: 'brightness(100%)' }, {
            filter: 'brightness(150%)',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    }
    bloomEffect();
});

document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('info-text-content');
    const thumb = document.getElementById('info-text-thumb');
    const scrollbar = document.getElementById('info-text-scrollbar');
  
    
    function updateThumb() {
        const contentHeight = content.scrollHeight;
        const visibleHeight = content.clientHeight;
        const scrollableHeight = contentHeight - visibleHeight;
        const thumbHeight = (visibleHeight / contentHeight) * (scrollbar.offsetHeight);
        const thumbPosition = (content.scrollTop / scrollableHeight) * (scrollbar.offsetHeight - thumbHeight);
      
        thumb.style.height = `${thumbHeight}px`;
        thumb.style.transform = `translateY(${thumbPosition}px) skewY(-20deg)`; 
      }
      
      
      updateThumb();
      
      
      content.addEventListener('scroll', updateThumb);
      
      
      let isDragging = false;
      thumb.addEventListener('mousedown', (e) => {
        isDragging = true;
        e.preventDefault(); 
      });
      
      document.addEventListener('mousemove', (e) => {
        if (isDragging) {
          const deltaY = e.movementY;
          const contentHeight = content.scrollHeight;
          const visibleHeight = content.clientHeight;
          const thumbPercentage = deltaY / (scrollbar.offsetHeight - thumb.offsetHeight);
          content.scrollTop += thumbPercentage * (contentHeight - visibleHeight);
          updateThumb();
        }
      });
      
      document.addEventListener('mouseup', () => {
        isDragging = false;
      });

      function onScrollWheel(e) {
        const content = document.getElementById('info-text-content');
        const delta = e.deltaY; 
        content.scrollTop += delta; 
      
        
        updateThumb();
      }
      
      
      document.getElementById('info-text-container').addEventListener('wheel', onScrollWheel);

  });
  
