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
