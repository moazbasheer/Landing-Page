/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let sections = document.querySelectorAll('section');
let navList = document.querySelector('#navbar__list');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function isInFrontOfViewport(element) {
    let x = element.getBoundingClientRect();
    if(x.top <= 0){
    	return true;
    }
    return false;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
/**
* @description Adds elements dynamically according to sections in the html.
 */
function buildMenu() {
    for(const i of sections) {
        // add an li element with the name of the id of its section
        let li = document.createElement('li');
        navList.appendChild(li);
        let sectionId = document.createTextNode(i.id);
        li.appendChild(sectionId);
    }
}

// Add class 'active' to section when near top of viewport
function activateWhenSee() {
    let arr = [];
    for(const i of sections) {
        if(isInFrontOfViewport(i))
            arr.push(i);
    }
    let mx = undefined;
    if(arr.length > 0) {
    	mx = arr[0].getBoundingClientRect().top;
    }
    let requiredElement = undefined;
    for(let section of arr) {
        let upper_bound = section.getBoundingClientRect().top;
        // if it touches the top of the page then it is the active
        // and get the last one active.
        if(upper_bound > mx) {
            mx = upper_bound;
            requiredElement = section;
        }
    }
    // if there's an active section add active class to it.
    if(requiredElement){
        requiredElement.classList.add('your-active-class');
        for(let item of sections) {
            // remove active class from other sections
            if(requiredElement && item.id !== requiredElement.id) {
                item.classList.remove('your-active-class');
            }
        }
    } else {
        sections[0].classList.add('your-active-class');
        for(let item of sections) {
            // remove active class from other sections
            if(item.id !== sections[0].id) {
                item.classList.remove('your-active-class');
            }
        }
    }
    setTimeout(activateWhenSee,0);
}


// Scroll to anchor ID using scrollTO event
/**
* @description Adds event listeners for scrolling.
 */
function scrollIfClick() {
    navList.addEventListener('click', (e) => {
        let itemId = e.target.textContent;
        let item = document.querySelector('#' + itemId);
        item.scrollIntoView();
    });
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildMenu();

// Scroll to section on link click
scrollIfClick();

// Set sections as active
activateWhenSee();
