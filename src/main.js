import './style.css';

const hideBrokenThumb = (img) => {
	img.hidden = true;
};

document.querySelectorAll('img[data-thumb]').forEach((img) => {
	if (img.complete && img.naturalWidth === 0) return hideBrokenThumb(img);
	img.addEventListener('error', () => hideBrokenThumb(img), { once: true });
});

const networkToggle = document.querySelector('[data-network-toggle]');
const networkMenu = document.getElementById('network-menu');

const setNetworkOpen = (isOpen) => {
	networkToggle.setAttribute('aria-expanded', String(isOpen));
	networkMenu.hidden = !isOpen;
};

networkToggle?.addEventListener('click', () =>
	setNetworkOpen(networkToggle.getAttribute('aria-expanded') !== 'true')
);

document.addEventListener('keydown', (event) => {
	if (event.key !== 'Escape' || networkMenu.hidden) return;
	setNetworkOpen(false);
	networkToggle.focus();
});

document.addEventListener('click', (event) => {
	if (networkMenu.hidden || event.target.closest('[data-network]')) return;
	setNetworkOpen(false);
});
