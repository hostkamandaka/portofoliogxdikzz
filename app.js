/* =========================================================
   DATA PROJEK
   EDIT DI SINI: tambah / ubah projek kamu.
   ========================================================= */
const PROJECTS = [
  {
    title: "Gx Dikzz Store",
    desc: "Web store resmi milik Gx Dikzz.",
    tags: ["Bot Dikzz AI", "Nokos", "Panel Pterodactyl"],
    link: "https://gxdikzz-store.web.id"
  },
  {
    title: "WhatsApp Bot — dikzz.js",
    desc: "Bot WhatsApp custom dengan fitur play & playvid YouTube, auto-switch endpoint saat API berubah, dan parsing JSON yang fleksibel buat respons yang ga konsisten.",
    tags: ["Node.js", "WhatsApp API", "YouTube API"],
    link: "https://chat.whatsapp.com/GkLTIzg5EfLFRDN1YCLc8A?s=cl&p=a&ilr=4&=3"
  },
  {
    title: "API Gx Dikzz",
    desc: "Website penyedia API",
    tags: ["API"],
    link: "https://webgxdikzz.biz.id/"
  }
];

/* =========================================================
   RENDER PROJEK
   ========================================================= */
function renderProjects(){
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = PROJECTS.map(p => `
    <article class="project-card">
      <h3 class="project-card__title">${p.title}</h3>
      <p class="project-card__desc">${p.desc}</p>
      <div class="project-card__tags">
        ${p.tags.map(t => `<span class="project-card__tag">${t}</span>`).join('')}
      </div>
      <a href="${p.link}" class="project-card__link">Lihat detail →</a>
    </article>
  `).join('');
}

/* =========================================================
   AUTO-LOAD SERTIFIKAT
   Cara kerja: fetch folder media/sertifikat/ dan baca daftar file
   dari HTML directory-listing yang server-mu kasih otomatis.
   Ini akan bekerja kalau kamu buka lewat server yang punya
   "directory listing" aktif, misalnya:
     - jalanin lokal:  python -m http.server   (lalu buka localhost)
     - atau:            npx serve
   Kalau host-mu TIDAK mendukung directory listing (misal beberapa
   static hosting), auto-load ga akan jalan — tinggal isi manual di
   array MANUAL_CERTS di bawah ini sebagai fallback.
   ========================================================= */
const CERT_FOLDER = 'media/sertifikat/';

// Fallback manual kalau auto-detect gagal di hosting kamu.
// Contoh: const MANUAL_CERTS = ['sertifikat-1.jpg', 'sertifikat-lomba.png'];
const MANUAL_CERTS = ['sertifikat-pkl.jpg', 'sertifikat-tka.jpg'];

async function detectCertificates(){
  try{
    const res = await fetch(CERT_FOLDER);
    if(!res.ok) throw new Error('Directory listing tidak tersedia');
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const hrefs = [...doc.querySelectorAll('a')].map(a => a.getAttribute('href') || '');
    const files = hrefs
      .map(h => decodeURIComponent(h.split('/').pop()))
      .filter(name => /\.(jpe?g|png)$/i.test(name));
    return files.length ? files : MANUAL_CERTS;
  }catch(err){
    console.warn('[sertifikat] Auto-load gagal, pakai MANUAL_CERTS. Detail:', err.message);
    return MANUAL_CERTS;
  }
}

function renderCertificates(files){
  const strip = document.getElementById('certStrip');
  const empty = document.getElementById('certEmpty');

  if(!files.length){
    strip.innerHTML = '';
    strip.appendChild(empty);
    return;
  }

  strip.innerHTML = files.map(name => `
    <div class="cert-card" data-src="${CERT_FOLDER}${name}">
      <img src="${CERT_FOLDER}${name}" alt="Sertifikat ${name}" loading="lazy">
      <p class="cert-card__name">${name.replace(/\.(jpe?g|png)$/i,'')}</p>
    </div>
  `).join('');

  // Klik kartu -> buka lightbox preview full size
  strip.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => openLightbox(card.dataset.src));
  });
}

/* Tombol panah geser strip sertifikat */
function wireCertNav(){
  const strip = document.getElementById('certStrip');
  document.getElementById('certPrev').addEventListener('click', () => {
    strip.scrollBy({ left: -260, behavior: 'smooth' });
  });
  document.getElementById('certNext').addEventListener('click', () => {
    strip.scrollBy({ left: 260, behavior: 'smooth' });
  });

  // Geser pakai mouse drag (desktop) — di HP sudah bisa swipe native
  let isDown = false, startX, scrollLeft;
  strip.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - strip.offsetLeft;
    scrollLeft = strip.scrollLeft;
  });
  ['mouseleave','mouseup'].forEach(evt => strip.addEventListener(evt, () => isDown = false));
  strip.addEventListener('mousemove', e => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - strip.offsetLeft;
    strip.scrollLeft = scrollLeft - (x - startX) * 1.2;
  });
}

/* =========================================================
   LIGHTBOX
   ========================================================= */
function openLightbox(src){
  const lb = document.getElementById('lightbox');
  document.getElementById('lightboxImg').src = src;
  lb.classList.add('is-open');
}
function wireLightbox(){
  const lb = document.getElementById('lightbox');
  document.getElementById('lightboxClose').addEventListener('click', () => lb.classList.remove('is-open'));
  lb.addEventListener('click', e => { if(e.target === lb) lb.classList.remove('is-open'); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') lb.classList.remove('is-open'); });
}

/* =========================================================
   FOTO PROFIL — fallback kalau media/foto.jpg belum ada
   ========================================================= */
function wirePhotoFallback(){
  const img = document.getElementById('profilePhoto');
  const fallback = document.getElementById('photoFallback');
  img.addEventListener('error', () => {
    img.classList.add('is-broken');
    fallback.classList.add('show');
  });
}

/* =========================================================
   TOGGLE MUSIK LATAR (media/audio.mp3)
   ========================================================= */
function wireAudioToggle(){
  const btn = document.getElementById('soundToggle');
  const audio = document.getElementById('bgAudio');
  btn.addEventListener('click', () => {
    if(audio.paused){
      audio.play().catch(() => console.warn('[audio] Gagal play, cek file media/audio.mp3'));
      btn.classList.add('is-playing');
    }else{
      audio.pause();
      btn.classList.remove('is-playing');
    }
  });
}

/* =========================================================
   INIT
   ========================================================= */
document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  renderProjects();
  wirePhotoFallback();
  wireAudioToggle();
  wireLightbox();
  wireCertNav();

  const files = await detectCertificates();
  renderCertificates(files);
});
