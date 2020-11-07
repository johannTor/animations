// Dom elements
const cssAnim = document.querySelector('.rect-container');
const jsAnim = document.querySelector('.rect-container-js');
const jsAnim2 = document.querySelector('.circle-container');
const header = document.querySelector('.page-header');
const cssLink = document.getElementById('css-link');
const jsLink = document.getElementById('js-link');
const rekt = document.createElement('span');
const allRects = document.querySelectorAll('.moving-rect');
const allCircles = document.querySelectorAll('.circles');

// Variables for working with the dom element lists and timers
let interval;
let circleInterval;
let i = 0;
let circleI = 0;
let inwards = true;

// Once elements are loaded start the small app
document.addEventListener('DOMContentLoaded', () => {
    startUp();
    cssLink.addEventListener('click', showAnimation);
    jsLink.addEventListener('click', showAnimation);
});

// Function for the click events on the 2 buttons
function showAnimation(ev) {
    // Check which button was clicked
    switch(ev.currentTarget.id) {
        // If the css button was clicked hide the js animations and slide in the css animation
        case 'css-link':
            cssLink.classList.add('active-link');
            jsLink.classList.remove('active-link');
            cssAnim.style.display = 'block';
            cssAnim.classList.remove('animation-hidden');
            jsAnim.classList.add('animation-hidden');
            jsAnim2.style.display = 'none';
            // Stop the js timers
            clearInterval(interval);
            clearInterval(circleInterval);
            break;

        // If the js button was clicked hide css animation and show the js animations
        case 'js-link':
            i = 0;
            circleI = 0;
            resetRects();
            cssLink.classList.remove('active-link');
            jsLink.classList.add('active-link');
            cssAnim.classList.add('animation-hidden');
            jsAnim.style.display = 'block';
            jsAnim2.style.display = 'flex';
            // If there isn't a small timeout here, the element won't transition properly, not sure why
            setTimeout(() => {
                jsAnim.classList.remove('animation-hidden');               
            }, 30);
            // Stop the js timers
            clearInterval(interval);
            clearInterval(circleInterval);
            // Start the animation
            moveRect();
            moveCircles();
            break;
    }
}

// When the app is opened, show the css animation for 2 seconds and then display the header
function startUp() {
    cssAnim.style.display = 'block';
    setTimeout(() => {
        // Add the hidden class to the two animations
        cssAnim.classList.add('animation-hidden');
        jsAnim.classList.add('animation-hidden');
        header.style.display = 'block';
        // Have to add another timeout for the transition to take effect?
        setTimeout(() => {
            document.querySelector('h1').classList.add('move-in');
        }, 30);
    }, 2000);
}

// Start the timer for the javascript rectangle animation
function moveRect() {
    interval = setInterval(moveColors, 80);
}

// This function is called every set interval and colors the rectangles based on the index
function moveColors() {
    // If the index is within the array, color the rectangle white, and if the index is 2 slots away from the start, change the opacity
    if(i < allRects.length) {
        allRects[i].style.backgroundColor = 'rgba(255, 255, 255, 1)';
    }

    if(i > 0) {
        allRects[i-1].style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
    } else if(i === 0) {    // Changing the color opacity of the last positions if the index is within first 2 positions
        allRects[allRects.length -1].style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
        allRects[allRects.length -2].style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    }

    if(i > 1) {
        allRects[i-2].style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    } else if(i === 1) {    // Changing the color opacity of the last positions if the index is within first 2 positions
        allRects[0].style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
        allRects[allRects.length -1].style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    }

    // Once the first 3 rects have been colored, start coloring them black again.
    if(i > 2) {
        allRects[i-3].style.backgroundColor = 'rgba(255,255,255,0)';
    } else if(i === 2) {    // If the i value is at the first 3 slots we have to color the last 3 rectangles black
        allRects[allRects.length -1].style.backgroundColor = 'rgba(255, 255, 255, 0)';
    } else if(i === 1) {
        allRects[allRects.length -2].style.backgroundColor = 'rgba(255, 255, 255, 0)';
    } else if(i === 0) {
        allRects[allRects.length -3].style.backgroundColor = 'rgba(255, 255, 255, 0)';
    }
    
    // Every tick increase the i value if it's within the array size
    if(i < allRects.length -1) {
        i++;
    } else {
        i = 0;
    }
}

// Reset the color of all the rectangle elements
function resetRects() {
    allRects.forEach(rec  => {
        rec.style.backgroundColor = 'rgba(0, 0, 0, 1)';
    });
}

// Start the circle timer
function moveCircles() {
    circleInterval = setInterval(animateCircles, 100);
    
}

// Gets called every tick for the circle interval, and changes the border style for each circle element
function animateCircles() {
    resetCircles();
    allCircles[circleI].style.border = '2px solid black';
    // Inwards boolean controls in what direction the circles should be filled, if it's true then increase the circleI value otherwise decrease it
    if(inwards) {
        if(circleI < allCircles.length -1) {
            circleI++;
        } else {    // The last circle has been colored so start counting the circleI down
            inwards = false;
            circleI--;
        }
    } else {
        if(circleI > 0) {
            circleI--;
        } else {
            inwards = true;
            circleI++;
        }
    }
}

// Reset the borders of all the circle elements
function resetCircles() {
    allCircles.forEach(cir => {
        cir.style.border = 'none';
    })
}
