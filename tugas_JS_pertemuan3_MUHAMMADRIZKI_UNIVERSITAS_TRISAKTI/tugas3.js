// Array produkToko untuk menyimpan daftar produk
let produkToko = [
   {id: 1, nama: "Laptop", harga: 7000000, stok: 5},
   {id: 2, nama: "Mouse", harga: 200000, stok: 10},
   {id: 3, nama: "Keyboard", harga: 350000, stok: 7}
];

// Fungsi untuk menambahkan produk baru
function tambahProduk(nama, harga, stok) {
    // Mencari ID tertinggi untuk produk baru (auto-increment)
    let newId = 1;
    if (produkToko.length > 0) {
        newId = Math.max(...produkToko.map(p => p.id)) + 1;
    }
    
    // Membuat objek produk baru
    let produkBaru = {
        id: newId,
        nama: nama,
        harga: harga,
        stok: stok
    };
    
    // Menambahkan produk ke dalam array
    produkToko.push(produkBaru);
    console.log(`[INFO] Produk "${nama}" berhasil ditambahkan dengan ID ${newId}.`);
}

// Fungsi untuk menghapus produk berdasarkan ID
function hapusProduk(id) {
    // Mencari index produk berdasarkan ID
    const index = produkToko.findIndex(p => p.id === id);
    
    if (index !== -1) {
        // Menghapus produk jika ditemukan
        const produkDihapus = produkToko.splice(index, 1)[0];
        console.log(`[INFO] Produk "${produkDihapus.nama}" (ID: ${id}) berhasil dihapus.`);
    } else {
        // Pesan jika produk tidak ditemukan
        console.log(`[ERROR] Produk dengan ID ${id} tidak ditemukan.`);
    }
}

// Fungsi untuk menampilkan daftar produk
function tampilkanProduk() {
    console.log("\n=== Daftar Produk Toko ===");
    if (produkToko.length === 0) {
        console.log("Tidak ada produk tersedia.");
    } else {
        produkToko.forEach(p => {
            console.log(`ID: ${p.id} | Nama: ${p.nama} | Harga: Rp${p.harga.toLocaleString('id-ID')} | Stok: ${p.stok}`);
        });
    }
    console.log("==========================\n");
}

// ==========================================
// Contoh Penggunaan (Testing)
// ==========================================

console.log("1. Menampilkan produk awal:");
tampilkanProduk();

console.log("2. Menambahkan produk baru (Monitor):");
tambahProduk("Monitor", 2500000, 3);
tampilkanProduk();

console.log("3. Menghapus produk dengan ID 2 (Mouse):");
hapusProduk(2);
tampilkanProduk();

console.log("4. Mencoba menghapus produk dengan ID yang tidak ada (ID 10):");
hapusProduk(10);
