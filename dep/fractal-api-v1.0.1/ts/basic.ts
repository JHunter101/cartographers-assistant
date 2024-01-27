function spoiler(element: HTMLElement): void {
  element.classList.toggle('blur');
}

function toggle_elem(elem: string): void {
  const element = document.getElementById(elem);
  if (element) {
    if (element.classList.contains('hidden')) {
      unhide_elem(elem);
    } else {
      hide_elem(elem);
    }
  }
}

function unhide_elem(elem: string): void {
  const element = document.getElementById(elem);
  if (element) element.classList.remove('hidden');
}

function hide_elem(elem: string): void {
  const element = document.getElementById(elem);
  if (element) element.classList.add('hidden');
}

function clearBox(elem: string): void {
  (document.getElementById(elem) as HTMLInputElement).innerHTML = '';
}

function getInputElementValue(id: string): string {
  const inputElement = document.getElementById(id) as HTMLInputElement | null;

  if (inputElement) {
    return inputElement.value;
  }

  console.error(`Element with id '${id}' not found.`);

  return '';
}
