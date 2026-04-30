// render.js
document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('games');
  if (!main) return;

  initParticles();
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

// --- Particles ---

function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;';
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');
  const COUNT = 90;
  const particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function randomHue() {
    const r = Math.random();
    if (r < 0.70) return 170 + Math.random() * 40;  // blue core (170-210)
    if (r < 0.85) return 140 + Math.random() * 30;  // toward green (140-170)
    return 230 + Math.random() * 50;                 // toward purple (230-280)
  }

  function spawn(randomOpacity) {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      opacity: randomOpacity ? Math.random() : 0,
      fadeSpeed: 0.002 + Math.random() * 0.005,
      fadeDir: 1,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: (Math.random() - 0.5) * 0.015,
      moveSpeed: 0.08 + Math.random() * 0.15,
      hue: randomHue(),
    };
  }

  for (let i = 0; i < COUNT; i++) particles.push(spawn(true));

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.opacity += p.fadeSpeed * p.fadeDir;
      if (p.opacity >= 1) { p.opacity = 1; p.fadeDir = -1; }
      if (p.opacity <= 0) { particles[i] = spawn(false); continue; }
      p.angle += p.angleSpeed;
      p.x += Math.cos(p.angle) * p.moveSpeed;
      p.y += Math.sin(p.angle) * p.moveSpeed;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = `hsl(${p.hue}, 88%, 76%)`;
      ctx.fillRect(p.x, p.y, 1, 1);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }
  tick();
}

// --- Lightbox ---

function initLightbox() {
  const lb = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightbox-close');

  lb.addEventListener('click', closeLightbox);
  closeBtn.addEventListener('click', e => { e.stopPropagation(); closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

let _lightboxOpener = null;

function openLightbox(src, altText) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const vid = document.getElementById('lightbox-video');
  vid.innerHTML = '';
  vid.style.display = 'none';
  img.src = src;
  img.alt = altText || '';
  img.style.display = 'block';
  _lightboxOpener = document.activeElement;
  lb.classList.add('open');
  document.getElementById('lightbox-close').focus();
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
  _lightboxOpener = document.activeElement;
  lb.classList.add('open');
  document.getElementById('lightbox-close').focus();
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  const vid = document.getElementById('lightbox-video');
  lb.classList.remove('open');
  vid.innerHTML = '';
  if (_lightboxOpener) { _lightboxOpener.focus(); _lightboxOpener = null; }
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
    card.appendChild(buildCapsule(game, card));
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

  card.addEventListener('click', e => {
    if (e.target.closest('a, .media-thumb-small, .media-capsule')) return;
    window.open(game.url, '_blank', 'noopener,noreferrer');
  });

  return card;
}

function buildCapsule(game, hoverTarget) {
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

  (hoverTarget || link).addEventListener('mouseenter', () => {
    canvas.style.display = 'none';
    img.style.display = 'block';
  });

  (hoverTarget || link).addEventListener('mouseleave', () => {
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
  div.setAttribute('role', 'button');
  div.setAttribute('tabindex', '0');

  const img = document.createElement('img');
  img.loading = 'lazy';

  if (item.type === 'youtube') {
    img.src = `https://img.youtube.com/vi/${item.id}/mqdefault.jpg`;
    img.alt = item.label ? `${item.label} (video)` : 'Watch video';
    const playBtn = document.createElement('div');
    playBtn.className = 'thumb-play';
    div.appendChild(img);
    div.appendChild(playBtn);
    div.setAttribute('aria-label', img.alt);
    const open = () => openLightboxVideo(item.id);
    div.addEventListener('click', open);
    div.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  } else {
    img.src = item.src;
    img.alt = item.label || '';
    div.appendChild(img);
    if (item.label) div.setAttribute('aria-label', `View image: ${item.label}`);
    const open = () => openLightbox(item.src, item.label || '');
    div.addEventListener('click', open);
    div.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  }

  return div;
}
