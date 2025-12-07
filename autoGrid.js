const grid = document.querySelector('.grid');
const MAX_IMAGES = 200;
const extensions = ['jpg', 'jpeg', 'png', 'webp'];

let imagesLoaded = 0;

// --- Masonry Resize Function ---
function resizeGridItem(item) {
    const gridElement = document.querySelector(".grid");
    const rowHeight = parseInt(window.getComputedStyle(gridElement).getPropertyValue("grid-auto-rows"));
    const rowGap = parseInt(window.getComputedStyle(gridElement).getPropertyValue("gap"));

    const img = item.querySelector("img");
    const itemHeight = img.getBoundingClientRect().height;

    const rowSpan = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = "span " + rowSpan;
}

// --- Rebuild grid (Used also when navigating back) ---
function rebuildGrid() {
    const items = document.querySelectorAll('.grid-item');
    items.forEach(item => resizeGridItem(item));
}

// --- Lazy Load Setup ---
const lazyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;

            img.onload = () => {
                const parent = img.parentElement;
                resizeGridItem(parent);
            };

            lazyObserver.unobserve(img);
        }
    });
});

// --- Dynamically Generate Grid ---
for (let i = 1; i <= MAX_IMAGES; i++) {
    for (let ext of extensions) {
        const imgPath = `assets/work${i}.${ext}`;

        fetch(imgPath).then(res => {
            if (res.ok) {
                const item = document.createElement('div');
                item.classList.add('grid-item');

                const img = document.createElement('img');
                img.dataset.src = imgPath;
                img.classList.add('lazy');
                img.alt = `work${i}`;

                item.appendChild(img);
                grid.appendChild(item);

                lazyObserver.observe(img);
            }
        });
    }
}

// --- FIX: Navigation backwards (cache load) ---
window.addEventListener("pageshow", (evt) => {
    if (evt.persisted) {
        setTimeout(rebuildGrid, 50); // give images time to attach
    }
});
