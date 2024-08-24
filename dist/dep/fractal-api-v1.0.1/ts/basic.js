"use strict";
function spoiler(element) {
    element.classList.toggle('blur');
}
function toggle_elem(elem) {
    const element = document.getElementById(elem);
    const classesToCheck = ['hidden', 'desktop-only', 'mobile-only'];
    const hasAnyClass = classesToCheck.some((className) => element.classList.contains(className));
    if (hasAnyClass) {
        unhide_elem(elem);
    }
    else {
        hide_elem(elem);
    }
}
function unhide_elem(elem) {
    const element = document.getElementById(elem);
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
    }
    if (element.classList.contains('mobile-only')) {
        element.classList.remove('mobile-only');
        element.classList.add('mobile-only-off');
    }
    if (element.classList.contains('desktop-only')) {
        element.classList.remove('desktop-only');
        element.classList.add('desktop-only-off');
    }
}
function hide_elem(elem) {
    const element = document.getElementById(elem);
    if (element.classList.contains('mobile-only-off')) {
        element.classList.remove('mobile-only-off');
        element.classList.add('mobile-only');
    }
    else if (element.classList.contains('desktop-only-off')) {
        element.classList.remove('desktop-only-off');
        element.classList.add('desktop-only');
    }
    else {
        element.classList.add('hidden');
    }
}
function clearBox(elem) {
    document.getElementById(elem).innerHTML = '';
}
function getInputElementValue(id) {
    const inputElement = document.getElementById(id);
    return inputElement.value;
}
function range(start, end, step = 1) {
    const result = [];
    for (let i = start; i < end; i += step) {
        result.push(i);
    }
    return result;
}
function indexDictExtract(indexes, dict) {
    const output = {};
    let i = 0;
    for (const [key, value] of Object.entries(dict)) {
        if (indexes[i]) {
            output[key] = value;
        }
        if (dict[i]) {
            output[key] = value;
        }
        i++;
    }
    return output;
}
const idCounter = 0;
