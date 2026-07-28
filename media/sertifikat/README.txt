Taruh file sertifikat kamu di sini.
Format: .jpg atau .png
Nama file bebas — contoh: sertifikat-lomba-web.jpg, ai-cert-2026.png

Web akan otomatis membaca semua file di folder ini SELAMA kamu
membuka website lewat server yang mendukung "directory listing",
contoh paling gampang jalanin dari folder project ini:

    python -m http.server 8000

lalu buka http://localhost:8000 di browser.

Kalau nanti kamu upload ke hosting yang TIDAK mendukung directory
listing, buka file app.js, cari variabel MANUAL_CERTS, dan isi
manual nama-nama file sertifikatnya di situ sebagai cadangan.
