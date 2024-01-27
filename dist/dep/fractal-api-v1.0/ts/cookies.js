"use strict";
window.onload = function () {
    const pageTitle = document.title.replace(/\s+/g, '-');
    const myCookies = localStorage.getItem(pageTitle);
    if (myCookies !== null) {
        document.documentElement.innerHTML = myCookies;
    }
    const forms = document.querySelectorAll('form');
    forms.forEach(function (form) {
        form.addEventListener('change', function () {
            saveProgress();
        });
    });
};
// function to save data to local storage
function saveProgress() {
    const pageTitle = document.title.replace(/\s+/g, '-');
    const pageHTML = document.documentElement.innerHTML;
    localStorage.setItem(pageTitle, pageHTML);
}
