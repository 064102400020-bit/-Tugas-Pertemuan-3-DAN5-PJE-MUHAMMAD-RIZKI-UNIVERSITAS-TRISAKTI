import { index, store, destroy } from './controller.mjs';

console.log("=== 1. DATA AWAL (10 USER) ===");
index();

console.log("\n=== 2. & 3. MENAMBAHKAN 2 DATA BARU (Menggunakan store/push) ===");
store({
    nama: "Kiki Amalia",
    umur: 22,
    alamat: "Jl. Riau No. 88, Pekanbaru",
    email: "kiki.amalia@yahoo.com"
});
store({
    nama: "Fajar Siddiq",
    umur: 29,
    alamat: "Jl. Thamrin No. 2, Jakarta",
    email: "fajar.siddiq@gmail.com"
});

console.log("\n=== 4. DATA SETELAH DITAMBAHKAN (Menampilkan menggunakan index/map) ===");
index();

console.log("\n=== 5. MENGHAPUS 1 DATA (Menggunakan destroy) ===");
destroy();

console.log("\n=== 6. DATA SETELAH PENGHAPUSAN ===");
index();
