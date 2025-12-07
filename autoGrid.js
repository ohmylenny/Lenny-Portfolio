const grid = document.querySelector('.grid');

// Change if you want more/less images
const MAX_IMAGES = 200;
const extensions = ['jpg', 'jpeg', 'png', 'webp'];

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
      }
    });
  }
}
