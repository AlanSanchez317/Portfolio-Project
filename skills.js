
function animateText(textSelector) {
    
    var text = document.querySelector(textSelector);
    var splitText = new SplitText(text, { type: "chars" });
    var chars = splitText.chars; 

    
    gsap.set(chars, { visibility: "visible" });
    gsap.from(chars, {
        opacity: 0,
        x: 10,
        stagger: 0.05,
        ease: "power1.inOut"
    });
}


document.querySelectorAll('.skill-item').forEach(function(item) {
    item.addEventListener('mouseenter', function() {
        animateText('.skill-text'); 
    });
});



var modal = document.getElementById("resumeModal");


var img = document.getElementById("skillstemplate8");


var span = document.getElementsByClassName("close")[0];


img.onclick = function() {
  modal.style.display = "block";
}


span.onclick = function() {
  modal.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleEffectsBtn = document.getElementById('toggle-effects');

  if (localStorage.getItem('fancyEffects') === 'disabled') {
    disableAdvancedEffects();
  }

  toggleEffectsBtn.addEventListener('click', () => {
    const effectsDisabled = document.body.classList.toggle('fancy-effects-disabled');
    
    if (effectsDisabled) {
      disableAdvancedEffects();
    } else {
      enableAdvancedEffects();
    }
    
    localStorage.setItem('fancyEffects', effectsDisabled ? 'disabled' : 'enabled');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const toggleEffectsBtn = document.getElementById('toggle-effects');

  if (localStorage.getItem('fancyEffects') === 'disabled') {
    disableFancyEffects();
  }

  toggleEffectsBtn.addEventListener('click', () => {
    if (document.body.classList.contains('fancy-effects-disabled')) {
      enableFancyEffects();
      localStorage.setItem('fancyEffects', 'enabled');
    } else {
      disableFancyEffects();
      localStorage.setItem('fancyEffects', 'disabled');
    }
  });
});

function disableFancyEffects() {
  document.body.classList.add('fancy-effects-disabled');
  $('*').stop(true);
  $('canvas').css('display', 'none');
  gsap.globalTimeline.pause();
}

function enableFancyEffects() {
  document.body.classList.remove('fancy-effects-disabled');
  $('canvas').css('display', 'block');
  gsap.globalTimeline.resume();
}
