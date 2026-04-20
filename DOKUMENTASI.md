# Dokumentasi Rumah Daun (Toko Tanaman Hias)

**Tugas Personal Lab ke-1, Week 6**
Topik: Membangun Toko Web Online (Frontend & Backend Development for Web)

---

## A. Informasi Project

- **Judul**: Rumah Daun, Toko Tanaman Hias Online
- **Stack**:
  - Frontend: React 18 + Vite + React Router 6 + Axios
  - Backend: Node.js + Express 4 + Mongoose 8
  - Database: MongoDB Atlas (cloud)
- **Kategori Produk**: Indoor, Outdoor, Sukulen, Pot & Aksesoris
- **Live Demo**:
  - Frontend: <https://rumah-daun.vercel.app>
  - API Backend: <https://toko-tanaman-api.vercel.app>
  - Repository: <https://github.com/bagjaalam1/toko-online>

---

## B. Persiapan

### 1. Install Node.js

Download dan install dari https://nodejs.org (versi LTS, 20.x atau lebih baru).
Verifikasi:

```bash
node --version
npm --version
```

### 2. Setup MongoDB Atlas (Gratis)

1. Buka https://www.mongodb.com/cloud/atlas/register dan buat akun.
2. Buat **New Project**, namanya bebas, mis. `TokoTanaman`.
3. **Build a Database** → pilih tier **M0 FREE** → pilih region terdekat (mis. Singapore) → Create.
4. Pada **Security Quickstart**:
   - Username & password → simpan (mis. `admin` / `passwordkuat123`).
   - **Network Access** → Add IP Address → **Allow Access from Anywhere** (`0.0.0.0/0`) untuk kemudahan pengembangan.
5. Setelah cluster siap → klik **Connect** → **Drivers** → **Node.js** → copy **connection string**.
   Contoh:
   ```
   mongodb+srv://admin:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
   ```
   Ganti `<password>` dengan password asli, dan tambahkan nama database sebelum tanda tanya:
   ```
   mongodb+srv://admin:passwordkuat123@cluster0.abcde.mongodb.net/tokoTanaman?retryWrites=true&w=majority
   ```

---

## C. Menjalankan Backend

1. Masuk ke folder backend:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Buat file `.env` (copy dari `.env.example`) dan isi `MONGO_URI` dengan connection string dari Atlas:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://admin:passwordkuat123@cluster0.abcde.mongodb.net/tokoTanaman?retryWrites=true&w=majority
   ```
4. Isi data contoh (opsional, 8 produk tanaman):
   ```bash
   npm run seed
   ```
5. Jalankan server:
   ```bash
   npm run dev
   ```
   Server jalan di **http://localhost:5000**. Buka link tersebut, harusnya muncul JSON info endpoint.

---

## D. Menjalankan Frontend

Buka **terminal baru** (biarkan backend tetap jalan).

1. Masuk ke folder frontend:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Opsional) buat `.env` jika backend bukan di localhost:5000. Default sudah cukup.
4. Jalankan dev server:
   ```bash
   npm run dev
   ```
   Browser otomatis terbuka di **http://localhost:5173**.

---

## E. Menguji API dengan Postman/cURL

**Get all products**
```bash
curl http://localhost:5000/api/products
```

**Get by kategori**
```bash
curl "http://localhost:5000/api/products?category=Sukulen"
```

**Create product**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Lidah Mertua","price":45000,"stock":20,"category":"Indoor","description":"Sansevieria","image":"https://..."}'
```

**Update product**
```bash
curl -X PUT http://localhost:5000/api/products/<id> \
  -H "Content-Type: application/json" \
  -d '{"price":50000}'
```

**Delete product**
```bash
curl -X DELETE http://localhost:5000/api/products/<id>
```

---

## F. Struktur Routing Frontend

| URL                    | Halaman          | Keterangan                     |
|------------------------|------------------|--------------------------------|
| `/`                    | Home             | Landing + featured produk      |
| `/products`            | Products         | Grid + filter + search         |
| `/products/:id`        | ProductDetail    | Detail satu produk             |
| `/admin`               | Admin            | Tabel produk + tombol CRUD     |
| `/admin/new`           | AdminForm        | Form tambah produk             |
| `/admin/edit/:id`      | AdminForm        | Form edit produk               |

---

## G. Desain & UX

- **Palette earthy tones**: krem (`#f7f2ea`), clay (`#b89574`), moss (`#8a9a7b`), terracotta (`#c08464`), ink (`#3a332b`).
- **Tipografi**: Cormorant Garamond (serif, untuk heading) + Inter (sans-serif, untuk body).
- **Layout responsif** dengan CSS Grid & Flexbox.
- **Tanpa framework CSS**, styling ditulis langsung supaya ringan dan mudah dikustomisasi.

---

## H. Screenshot Hasil Aplikasi

### 1. Halaman Beranda

![Halaman Beranda](screenshots/01-beranda.png)

### 2. Daftar Produk

![Daftar Produk](screenshots/02-daftar-produk.png)

### 3. Detail Produk

![Detail Produk](screenshots/03-detail-produk.png)

### 4. Admin (Daftar Produk)

![Admin List](screenshots/04-admin-list.png)

### 5. Admin (Tambah Produk)

![Admin Form Tambah](screenshots/05-admin-form-tambah.png)

### 6. Admin (Edit Produk)

![Admin Form Edit](screenshots/06-admin-form-edit.png)

### 7. Terminal Backend

![Terminal Backend](screenshots/08-terminal-backend.png)

### 8. MongoDB Atlas Collection

Data produk tersimpan di cluster `Cluster0` → database `tokoTanaman` → collection `products` dengan total 8 dokumen.

![Atlas Data Explorer 1](screenshots/07a-atlas.png)

![Atlas Data Explorer 2](screenshots/07b-atlas.png)

![Atlas Data Explorer 3](screenshots/07c-atlas.png)

![Atlas Data Explorer 4](screenshots/07d-atlas.png)

---

## I. Troubleshooting

- **Backend error `MongoDB connection error`**
  → Cek `MONGO_URI`, pastikan IP sudah di-whitelist di Atlas (Network Access).

- **Frontend error `Network Error` / CORS**
  → Pastikan backend jalan di port 5000. Kalau port berbeda, edit `frontend/.env`:
  `VITE_API_URL=http://localhost:PORT/api`.

- **Produk tidak muncul**
  → Jalankan `npm run seed` di backend.


