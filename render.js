// render.js
document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('games');
  if (!main) return;

  initLightbox();

  const byYear = {};
  GAMES.forEach(game => {
    if (!byYear[game.year]) byYear[game.year] = [];
    byYear[game.year].push(game);
  });

  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);

  const grid = document.createElement('div');
  grid.className = 'games-grid';

  years.forEach(year => {
    byYear[year].forEach(game => {
      grid.appendChild(buildCard(game));
    });
  });

  main.appendChild(grid);
});

// --- Lightbox ---

function initLightbox() {
  const lb = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightbox-close');

  lb.addEventListener('click', closeLightbox);
  closeBtn.addEventListener('click', e => { e.stopPropagation(); closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const vid = document.getElementById('lightbox-video');
  vid.innerHTML = '';
  vid.style.display = 'none';
  img.src = src;
  img.style.display = 'block';
  lb.classList.add('open');
}

function openLightboxVideo(id) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const vid = document.getElementById('lightbox-video');
  img.src = '';
  img.style.display = 'none';
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.title = 'Game video';
  vid.innerHTML = '';
  vid.appendChild(iframe);
  vid.style.display = 'block';
  lb.classList.add('open');
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  const vid = document.getElementById('lightbox-video');
  lb.classList.remove('open');
  vid.innerHTML = ''; // stop video playback
}

// --- Card building ---

function buildCard(game) {
  const card = document.createElement('div');
  card.className = 'game-card';

  // Header: title link + itch badge
  const header = document.createElement('div');
  header.className = 'card-header';

  const titleLink = document.createElement('a');
  titleLink.className = 'game-title';
  titleLink.href = game.url;
  titleLink.target = '_blank';
  titleLink.rel = 'noopener noreferrer';
  titleLink.textContent = game.title;

  const badge = document.createElement('a');
  badge.className = 'itch-badge';
  badge.href = game.url;
  badge.target = '_blank';
  badge.rel = 'noopener noreferrer';
  badge.textContent = game.platform === 'steam' ? 'Steam ↗' : 'itch.io ↗';

  const yearTag = document.createElement('span');
  yearTag.className = 'card-year';
  yearTag.textContent = game.year;

  const meta = document.createElement('div');
  meta.className = 'card-meta';
  meta.appendChild(badge);
  meta.appendChild(yearTag);

  header.appendChild(titleLink);
  header.appendChild(meta);
  card.appendChild(header);

  // Capsule — row 2
  if (game.capsule) {
    card.appendChild(buildCapsule(game));
  }

  // Description — row 3
  const desc = document.createElement('div');
  desc.className = 'game-desc';
  desc.textContent = game.description;
  card.appendChild(desc);

  // Thumbnail grid — row 4, up to 4 items, 2 columns × 2 rows
  const media = game.media || [];
  const thumbItems = media.slice(0, 4);
  if (thumbItems.length > 0) {
    const thumbsRow = document.createElement('div');
    thumbsRow.className = 'media-thumbs';
    thumbItems.forEach(item => {
      thumbsRow.appendChild(buildSmallThumb(item));
    });
    card.appendChild(thumbsRow);
  }

  return card;
}

function buildCapsule(game) {
  const link = document.createElement('a');
  link.className = 'media-capsule';
  link.href = game.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  const img = document.createElement('img');
  img.alt = game.title;
  img.style.display = 'none';

  const canvas = document.createElement('canvas');

  img.addEventListener('load', () => {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext('2d').drawImage(img, 0, 0);
  });

  // Trigger load — set src after attaching load listener
  img.src = game.capsule;

  link.appendChild(canvas);
  link.appendChild(img);

  link.addEventListener('mouseenter', () => {
    canvas.style.display = 'none';
    img.style.display = 'block';
  });

  link.addEventListener('mouseleave', () => {
    img.style.display = 'none';
    canvas.style.display = 'block';
    // Reset GIF so next hover replays from frame 1
    const src = img.src;
    img.src = '';
    img.src = src;
  });

  return link;
}

function buildSmallThumb(item) {
  const div = document.createElement('div');
  div.className = 'media-thumb-small';

  const img = document.createElement('img');
  img.alt = '';
  img.loading = 'lazy';
  img.src = item.type === 'youtube'
    ? `https://img.youtube.com/vi/${item.id}/mqdefault.jpg`
    : item.src;

  div.appendChild(img);

  if (item.type === 'youtube') {
    const playBtn = document.createElement('div');
    playBtn.className = 'thumb-play';
    div.appendChild(playBtn);
    div.addEventListener('click', () => openLightboxVideo(item.id));
  } else {
    div.addEventListener('click', () => openLightbox(item.src));
  }

  return div;
}
