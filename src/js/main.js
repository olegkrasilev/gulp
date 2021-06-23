// Lazy background-image
// https://web.dev/lazy-loading-images/

document.addEventListener('DOMContentLoaded', () => {
	const lazyBackgrounds = [].slice.call(
		document.querySelectorAll('.lazy-background'),
	);

	if ('IntersectionObserver' in window) {
		const lazyBackgroundObserver = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						lazyBackgroundObserver.unobserve(entry.target);
					}
				});
			},
		);

		lazyBackgrounds.forEach((lazyBackground) => {
			lazyBackgroundObserver.observe(lazyBackground);
		});
	}
});

// End Lazy background-image

//  Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = (entries, observer) => {
	const [entry] = entries;

	if (!entry.isIntersecting) return;

	entry.target.src = entry.target.dataset.src;

	entry.target.addEventListener('load', () => {
		entry.target.classList.remove('lazy-img');
	});

	observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
	root: null,
	threshold: 0,
	rootMargin: '-200px',
});

imgTargets.forEach((img) => imgObserver.observe(img));
