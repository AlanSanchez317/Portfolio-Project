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
  