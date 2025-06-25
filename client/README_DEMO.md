# OSM (Onsite Meeting) - Demo Mode

Aplikasi OSM sekarang berjalan dalam **Demo Mode** menggunakan data dummy yang diambil dari seeder backend.

## 🎯 Fitur Demo

### ✅ Sudah Dikonversi ke Demo Mode:
- **User Authentication** - Login dengan data dummy
- **Participant Management** - CRUD participants
- **SOT (Safety Observation Tour)** - Data inspeksi keamanan
- **SOT Findings** - Temuan keamanan (safe/unsafe) 
- **Attendance System** - Check-in participants
- **Meeting Seats** - Manajemen tempat duduk
- **Chart Data** - Dashboard statistik
- **Reference Data** - CLSR, Locations, Companies, Vehicles

### 🔧 Data Dummy Yang Tersedia:
- **15 Participants** dari 5 perusahaan berbeda
- **8 SOT Records** dengan lokasi inspeksi berbeda
- **15 SOT Findings** (mix safe/unsafe observations)
- **20 Meeting Seats** dengan layout ruang meeting
- **Attendance Data** untuk tracking kehadiran
- **Chart Statistics** untuk dashboard

## 🚀 Cara Menjalankan Demo

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Jalankan aplikasi:**
   ```bash
   npm run dev
   ```

3. **Login dengan credentials:**
   - Email: `admin@sbi.co.id`
   - Password: `password123`
   
   (Lihat `DEMO_CREDENTIALS.md` untuk daftar lengkap users)

## 📊 Simulasi API

- Semua API calls diganti dengan data dummy
- Delay simulasi untuk pengalaman realistis  
- Data tersimpan di memory (tidak persisten)
- Notifikasi menampilkan "(Demo Mode)"

## 🏗️ Struktur Data Dummy

```
src/data/
├── index.js              # Export utama dan helper functions
├── reference-data.js     # CLSR, Locations, Companies, Vehicles
├── users-data.js         # User authentication data
├── participants-data.js  # Participant data
├── sot-data.js          # SOT inspection data
├── sot-findings-data.js # Safety findings data
├── attendance-data.js   # Check-in attendance data
└── meeting-seat-data.js # Meeting room seating
```

## 🔄 Store Updates

Semua Pinia stores telah diupdate untuk menggunakan data dummy:
- `participant-store.js`
- `sot-store.js` 
- `user-store.js`
- `chart-store.js`
- `attendance-store.js`
- `meeting-seat-store.js`

## 🎨 UI Demo Features

- **Demo Banner** di header untuk menunjukkan mode demo
- **Credentials Dialog** untuk melihat login options
- **Loading Simulations** untuk pengalaman realistis
- **Demo Notifications** untuk feedback user

## 🔍 Testing Demo

1. **Login System**: Test berbagai user roles
2. **Participant CRUD**: Add, edit, delete participants  
3. **SOT Management**: Create, view SOT groups
4. **Findings**: Add safe/unsafe observations
5. **Attendance**: Check-in participants
6. **Charts**: View dashboard statistics
7. **Seats**: Manage meeting room layout

## 📝 Notes

- Data reset setiap reload aplikasi
- Perfect untuk demo, testing, dan development
- Semua fitur frontend tetap berfungsi normal
- Mudah switch back ke backend API mode
