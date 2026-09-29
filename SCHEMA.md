# Format Properti Konten (Notion Database & MDX Schema)

Dokumen ini menjelaskan struktur data yang digunakan oleh sistem portfolio untuk merender **Post** dan **Project** secara otomatis dan dinamis.

---

## 1. Database Notion: **Posts** (`DB_ID`)

Pastikan database Notion untuk artikel blog/posts memiliki kolom properti berikut:

| Nama Properti | Tipe Notion | Keterangan | Contoh Nilai |
| :--- | :--- | :--- | :--- |
| **Name / title** | `Title` | Judul utama artikel *(Wajib)* | `Next.js App Router Architecture` |
| **slug** | `Rich Text` | URL slug unik *(Wajib)* | `nextjs-app-router-architecture` |
| **description** | `Rich Text` | Ringkasan singkat untuk list explorer | `Deep dive into modern Next.js server actions...` |
| **date** | `Date` | Tanggal publikasi | `2026-03-30` |
| **tags** | `Multi-select` | Tag / kategori artikel | `Next.js`, `Architecture`, `React` |
| **published** | `Checkbox` | Hanya tampil jika dicentang `true` | `[x]` |
| **coverImage** | `URL` / `Files` | URL banner hero gambar | `https://images.unsplash.com/...` |

---

## 2. Database Notion: **Projects** (`PROJECT_DB_ID`)

Pastikan database Notion untuk portofolio proyek memiliki kolom properti berikut:

| Nama Properti | Tipe Notion | Keterangan | Contoh Nilai |
| :--- | :--- | :--- | :--- |
| **Name / title** | `Title` | Nama proyek *(Wajib)* | `E-Commerce Enterprise Dashboard` |
| **slug** | `Rich Text` | URL slug unik *(Wajib)* | `e-commerce-dashboard` |
| **description** | `Rich Text` | Ringkasan singkat proyek | `Real-time analytics & sales platform...` |
| **coverImage** | `URL` | Banner utama proyek | `https://images.unsplash.com/...` |
| **technologies** | `Multi-select` | Stack teknologi (mentrigger Architecture Blueprint) | `Next.js`, `React`, `TypeScript`, `PostgreSQL` |
| **liveUrl** | `URL` | Link live demo/website (Opsional) | `https://my-app.vercel.app` |
| **githubUrl** | `URL` | Link repository GitHub (Opsional) | `https://github.com/user/repo` |
| **year** | `Rich Text` / `Text` | Tahun rilis (Mentrigger Timeline Gantt) | `2026` |
| **duration** | `Rich Text` / `Text` | Lama pengerjaan (Mentrigger Timeline Gantt) | `6 Weeks` |
| **client** | `Rich Text` / `Text` | Klien / Perusahaan / Personal | `Enterprise Client Ltd.` |
| **role** | `Rich Text` / `Text` | Peran teknis | `Lead Fullstack Architect` |
| **images** | `Rich Text` | Daftar URL gambar gallery (pisahkan koma `,`) | `https://img1.jpg, https://img2.jpg` |

---

## 3. Fitur yang Otomatis Aktif Berdasarkan Data:
- Jika `technologies` diisi: Modul **Tech Architecture Blueprint** akan membedah stack menjadi *Presentation Layer*, *Data & Services*, dan *DevOps/Tooling*.
- Jika `images` diisi (URL dipisah koma): Modul **Screenshots Gallery Modal & Lightbox** akan aktif.
- Jika `year` atau `duration` diisi: Modul **Lifecycle Timeline / Gantt Chart** akan aktif.
- Jika `liveUrl` / `githubUrl` diisi: Tombol **Launch Live Demo** & **View Source** akan aktif di sidecar card.
- Jika salah satu properti di atas kosong: Modul tersebut **tidak akan dirender** (zero empty card artifact).
