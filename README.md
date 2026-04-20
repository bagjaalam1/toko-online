# Rumah Daun (Toko Tanaman Hias)

Aplikasi web toko online sederhana untuk **Tugas Personal Lab Week 6**. Stack: React (Vite) + Node.js/Express + MongoDB Atlas.

## Struktur Project

```
toko-online/
  backend/          Express + Mongoose REST API
    src/
      server.js
      models/Product.js
      controllers/productController.js
      routes/productRoutes.js
      routes/categoryRoutes.js
      seed.js
    package.json
    .env.example
  frontend/         React + Vite + React Router
    src/
      main.jsx
      App.jsx
      api/client.js         (axios)
      components/           (Navbar, Footer, ProductCard)
      pages/                (Home, Products, ProductDetail, Admin, AdminForm, NotFound)
      styles/global.css     (earthy tones palette)
    package.json
    .env.example
  DOKUMENTASI.md    Panduan menjalankan + screenshot
  README.md
```

## Fitur

**Frontend (React)**
- Beranda (Home) dengan hero + produk unggulan
- Daftar Produk dengan filter kategori + search
- Detail Produk (dynamic route)
- Admin: tabel produk + Create/Edit/Delete (CRUD)
- Navigasi: React Router (BrowserRouter)
- Layout: CSS Grid + Flexbox
- Desain: earthy tones (cream, clay, moss, terracotta)

**Backend (Node.js + Express)**
- REST API CRUD untuk produk
- Kategori enum: Indoor, Outdoor, Sukulen, Pot & Aksesoris
- MongoDB Atlas via Mongoose
- CORS aktif untuk integrasi dengan frontend
- Seed data otomatis (`npm run seed`)

**Integrasi**
- Frontend mengambil data dari backend via Axios
- Semua interaksi CRUD dari halaman Admin memanggil REST API

## Endpoint API

| Method | URL                   | Deskripsi                               |
|--------|-----------------------|-----------------------------------------|
| GET    | /api/products         | Daftar produk (query: category, search) |
| GET    | /api/products/:id     | Detail produk                           |
| POST   | /api/products         | Buat produk baru                        |
| PUT    | /api/products/:id     | Update produk                           |
| DELETE | /api/products/:id     | Hapus produk                            |
| GET    | /api/categories       | Daftar kategori                         |

## Cara Menjalankan

Lihat [DOKUMENTASI.md](./DOKUMENTASI.md) untuk panduan lengkap step-by-step
(termasuk setup MongoDB Atlas dan screenshot hasil).
