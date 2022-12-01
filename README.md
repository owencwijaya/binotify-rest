# BiNotify REST
> _REST server_ untuk manajemen data penyanyi dan lagu Premium
> Implementasi untuk Tugas Besar 2 IF3110 Pengembangan Berbasis Web, Prodi Informatika ITB Tahun Ajaran 2022/2023

## Deskripsi Singkat
_REST server BiNotify_ digunakan untuk mengelola data lagu dan artis pada fitur BiNotify Premium, dan akan berinteraksi secara langsung dengan _website_  <a href = "https://gitlab.informatika.org/if3110-2022-k01-02-11/binotify-app">BiNotify App</a> dan  <a href = "https://gitlab.informatika.org/if3110-2022-k01-02-11/binotify-premium">BiNotify Premium</a>. _REST server_ berfungsi sebagai perantara BiNotify App / Premium dengan _SOAP server_  <a href = "https://gitlab.informatika.org/if3110-2022-k01-02-11/binotify-soap">BiNotify SOAP</a> dalam perihal manajemen _subscription_, dan menyimpan data artis pada fitur BiNotify Premium serta daftar lagu yang dimiliki oleh artis tersebut. Server juga akan digunakan untuk autentikasi pengguna pada BiNotify Premium.

Server ini dibuat menggunakan pustaka ExpressJS dan _database_ MongoDB.

## Skema Basis Data
Skema basis data yang digunakan adalah sebagai berikut:
```
song
├── _id (ObjectId), ID lagu
├── judul (string), berisi judul lagu
├── id_penyanyi (ObjectId), mengacu kepada _id user pemilik lagu
└── audio_path (string), menyimpan URL lagu yang akan dimainkan di BiNotify App

user
├── _id (ObjectId), id seorang artis untuk referensi foreign key dan subscription
├── email (string), berisi email pengguna
├── password (string), berisi password pengguna, hashing dilakukan oleh library Passport
├── username (string), berisi username pengguna
├── name (string), berisi nama pengguna
└── admin (boolean), untuk membedakan pengguna admin atau bukan
```

## Daftar _Requirements_
Perangkat lunak yang dibutuhkan untuk bisa mengoperasikan BiNotify adalah:
- Docker versi 20.10.21, <a href = "https://docs.docker.com/engine/install/">*panduan instalasi* </a>
- Docker Compose versi 1.26.2, <a href = "https://docs.docker.com/compose/install/">*panduan instalasi* </a>
- _Operating system_ berbasis _Windows 10_ atau _Linux Ubuntu 20.04_
- Node Package Manager (NPM) versi 8.15.0, <a href = "https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">_panduan instalasi_ </a>

Pengguna juga harus melakukan _setup_ terkait repo berikut:
1. <a href = "https://gitlab.informatika.org/if3110-2022-k01-02-11/binotify-config">BiNotify Config</a>, untuk mengakses database utama (**wajib** untuk penggunaan umum)
2. <a href = "https://gitlab.informatika.org/if3110-2022-k01-02-11/binotify-soap">BiNotify SOAP</a>, untuk melakukan manajemen _subscription_ (**wajib**)
3. <a href = "https://gitlab.informatika.org/if3110-2022-k01-02-11/binotify-app">BiNotify App</a>, untuk melakukan demonstrasi penggunaan (**opsional**)
4. <a href = "https://gitlab.informatika.org/if3110-2022-k01-02-11/binotify-premium">BiNotify Premium/a>, untuk melakukan demonstrasi penggunaan (**opsional**)

## Cara Menjalankan
1. **[IMPORTANT]** Pastikan NPM sudah ter-_install_ dengan benar dan _repository_ ini (beserta _repository_ wajib lainnya) sudah di-_clone_ ke _local_
> Setup _repository_ wajib dapat dilihat pada README repository masing-masing
2. Jalankan _Docker container_ dengan perintah:
```
docker-compose down && docker-compose build && docker-compose up
```
Apabila terkonfigurasi benar, _endpoint_ dapat diakses pada http://localhost:3000

## Pembagian Tugas
Legenda NIM adalah sebagai berikut:
- 13520043: Muhammad Risqi Firdaus
- 13520117: Hafidz Nur Rahman Ghozali
- 13520124: Owen Christian Wijaya

Daftar Pengerjaan
- Backend BiNotify Premium Fungsi Autentikasi: 13520043, 13520124
- Backend BiNotify Premium Fungsi Mendapatkan Daftar Artis: 13520043, 13520124
- Backend BiNotify Premium / App Fungsi Mendapatkan Daftar Lagu per Artis: 13520117, 13520124
- Backend BiNotify Premium Pengelolaan Lagu: 13520124
- Backend BiNotify Premium Mendapatkan Daftar Subscription: 13520117, 13520124
- Backend BiNotify Premium Mendapatkan Daftar Subscription: 13520117, 13520124