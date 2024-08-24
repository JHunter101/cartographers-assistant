function spoiler(element: HTMLElement): void {
	element.classList.toggle('blur');
}

function toggle_elem(elem: string): void {
	const element = document.getElementById(elem) as HTMLInputElement;
	const classesToCheck = ['hidden', 'desktop-only', 'mobile-only'];
	const hasAnyClass = classesToCheck.some((className) =>
		element.classList.contains(className)
	);
	if (hasAnyClass) {
		unhide_elem(elem);
	} else {
		hide_elem(elem);
	}
}

function unhide_elem(elem: string): void {
	const element = document.getElementById(elem) as HTMLInputElement;
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

function hide_elem(elem: string): void {
	const element = document.getElementById(elem) as HTMLInputElement;
	if (element.classList.contains('mobile-only-off')) {
		element.classList.remove('mobile-only-off');
		element.classList.add('mobile-only');
	} else if (element.classList.contains('desktop-only-off')) {
		element.classList.remove('desktop-only-off');
		element.classList.add('desktop-only');
	} else {
		element.classList.add('hidden');
	}
}

function clearBox(elem: string): void {
	(document.getElementById(elem) as HTMLInputElement).innerHTML = '';
}

function getInputElementValue(id: string): string {
	const inputElement = document.getElementById(id) as HTMLInputElement;
	return inputElement.value;
}

function range(start: number, end: number, step = 1): number[] {
	const result = [];
	for (let i = start; i < end; i += step) {
		result.push(i);
	}
	return result;
}

function indexDictExtract(
	indexes: (number | string)[],
	dict: { [key: string]: any }
): { [key: string]: any } {
	const output: { [key: string]: any } = {};

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
