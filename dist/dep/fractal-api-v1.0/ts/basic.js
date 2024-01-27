"use strict";
function spoiler(element) {
    element.classList.toggle('blur');
}
function toggle_elem(elem) {
    const element = document.getElementById(elem);
    if (element) {
        if (element.classList.contains('hidden')) {
            unhide_elem(elem);
        }
        else {
            hide_elem(elem);
        }
    }
}
function unhide_elem(elem) {
    const element = document.getElementById(elem);
    if (element)
        element.classList.remove('hidden');
}
function hide_elem(elem) {
    const element = document.getElementById(elem);
    if (element)
        element.classList.add('hidden');
}
function clearBox(elem) {
    document.getElementById(elem).innerHTML = '';
}
function getInputElementValue(id) {
    const inputElement = document.getElementById(id);
    if (inputElement) {
        return inputElement.value;
    }
    console.error(`Element with id '${id}' not found.`);
    return '';
}
