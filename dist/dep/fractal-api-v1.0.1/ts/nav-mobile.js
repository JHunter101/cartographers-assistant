"use strict";
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);
    nav.classList.toggle('show-menu');
    toggle_elem(navId);
    toggle.classList.toggle('show-icon');
};
