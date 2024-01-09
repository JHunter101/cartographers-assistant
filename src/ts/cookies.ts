window.onload = function (): void {
  const myCookies = localStorage.getItem('cartographer-assistant-pageHTML');
  if (myCookies !== null) {
    // load the saved HTML from local storage and set it as the HTML of the body element
    document.documentElement.innerHTML = myCookies;
  }

  const form = document.getElementById('main-menu-settings-form');
  if (form !== null) {
    form.addEventListener('change', function () {
      saveProgress();
    });
  }
};

// function to save data to local storage
function saveProgress() {
  localStorage.setItem(
    'cartographer-assistant-pageHTML',
    document.documentElement.innerHTML,
  );
}
