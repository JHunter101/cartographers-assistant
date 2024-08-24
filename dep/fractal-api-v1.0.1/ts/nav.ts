// When the user scrolls the page, execute myFunction
window.onscroll = function () {
	const header: HTMLElement | null = document.getElementById('js-nav-bar');
	if (header) {
		const sticky = header.offsetTop;
		if (window.scrollY > sticky) {
			header.classList.remove('js-nav-bar--transparent');
			header.classList.add('js-nav-bar--solid');
		} else {
			header.classList.add('js-nav-bar--transparent');
			header.classList.remove('js-nav-bar--solid');
		}
	}
};
