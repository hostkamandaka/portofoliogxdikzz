# 🏁 Portofolio — Gx Dikzz

Website portofolio pribadi untuk menampilkan profil, skill, projek, dan koleksi sertifikat. Dibangun manual dari nol pakai HTML, CSS, dan JavaScript murni — tanpa framework, tanpa template generik.

**🔗 Live site:** [https://gxdikzz-store.web.id](https://gxdikzz-store.web.id)

---

## ✨ Fitur

| Fitur | Keterangan |
|---|---|
| Hero Profil | Foto, nama, dan deskripsi singkat |
| Skill Section | Daftar kemampuan dalam bentuk tag |
| Projects Section | Showcase projek dengan tag teknologi & link |
| Rak Sertifikat | Auto-load semua file dari folder `media/sertifikat/`, bisa digeser (drag/swipe) |
| Lightbox Preview | Klik sertifikat untuk lihat versi full-size |
| Toggle Musik | Play/pause musik latar dari `media/audio.mp3` |
| Responsive | Menyesuaikan tampilan dari desktop sampai mobile |

---

## 🗂️ Struktur Folder
portfolio/
├── index.html
├── main.css
├── app.js
└── media/
├── foto.jpg          # foto profil
├── audio.mp3         # musik latar
└── sertifikat/       # taruh file sertifikat di sini
├── contoh1.jpg
└── contoh2.png

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| Struktur | HTML5 |
| Styling | CSS3 (custom, tanpa framework) |
| Interaktivitas | JavaScript (Vanilla JS) |
| Font | Archivo Black, Inter, JetBrains Mono (Google Fonts) |

---

## 📸 Cara Menambah Sertifikat

1. Simpan file sertifikat (`.jpg` atau `.png`) ke folder `media/sertifikat/`
2. Nama file bebas
3. Refresh halaman — sertifikat baru otomatis muncul di rak

> Catatan: auto-load butuh server dengan *directory listing* aktif (contoh: `python -m http.server`). Jika hosting tidak mendukung ini, isi manual lewat variabel `MANUAL_CERTS` di `app.js`.

---

## ▶️ Menjalankan di Lokal

```bash
cd portfolio
python -m http.server 8000

👤 Tentang
Dibuat dan dikelola oleh Gx Dikzz — independent developer yang fokus di JavaScript, integrasi API, dan web app dengan tampilan yang ga generik.
Live: gxdikzz-store.web.id
© 2026 Gx Dikzz. Dibangun manual, bukan template.
