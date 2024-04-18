
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
