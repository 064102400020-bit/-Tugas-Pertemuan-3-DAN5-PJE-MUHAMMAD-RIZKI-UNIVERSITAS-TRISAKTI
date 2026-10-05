// 1. Data produk awal disimpan dalam array
let daftarProduk = [
    { id: 1, nama: "Laptop", harga: 8500000 },
    { id: 2, nama: "Smartphone", harga: 4200000 },
    { id: 3, nama: "Keyboard", harga: 350000 },
    { id: 4, nama: "Mouse", harga: 150000 },
    { id: 5, nama: "Headset", harga: 500000 }
];

// Elemen-elemen DOM yang dibutuhkan
const tabelProduk = document.getElementById("data-produk");
const formTambahProduk = document.getElementById("form-tambah-produk");
const inputNama = document.getElementById("nama-produk");
const inputHarga = document.getElementById("harga-produk");
const btnTampilkanSemua = document.getElementById("btn-tampilkan-semua");
const totalProductsElement = document.getElementById("total-products");
const notifikasi = document.getElementById("notifikasi");
const pesanKosong = document.getElementById("pesan-kosong");
const tabelContainer = document.getElementById("tabel-produk");

// Fungsi untuk format mata uang Rupiah
const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(angka);
};

// Fungsi untuk menampilkan notifikasi
const tampilkanNotifikasi = (pesan, tipe) => {
    notifikasi.textContent = pesan;
    notifikasi.className = `notifikasi ${tipe}`;
    
    // Hilangkan notifikasi setelah 3 detik
    setTimeout(() => {
        notifikasi.className = "notifikasi hide";
    }, 3000);
};

// Fungsi untuk memperbarui ringkasan total produk
const updateRingkasan = () => {
    totalProductsElement.textContent = daftarProduk.length;
};

// Fungsi untuk merender/menampilkan produk ke dalam tabel
const renderProduk = (produkArray) => {
    tabelProduk.innerHTML = ""; // Kosongkan isi tabel terlebih dahulu
    
    if (produkArray.length === 0) {
        tabelContainer.classList.add("hide");
        pesanKosong.classList.remove("hide");
    } else {
        tabelContainer.classList.remove("hide");
        pesanKosong.classList.add("hide");
        
        // [MATERI WAJIB: ARRAY METHOD] - forEach digunakan untuk meloop semua produk
        produkArray.forEach((produk, index) => {
            // [MATERI WAJIB: DESTRUCTURING] - Mengambil properti dari objek produk
            const { id, nama, harga } = produk;
            
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>PRD-${id}</td>
                <td>${nama}</td>
                <td>${formatRupiah(harga)}</td>
                <td>
                    <button class="btn-danger btn-hapus" data-id="${id}">Hapus</button>
                </td>
            `;
            tabelProduk.appendChild(tr);
        });
        
        // Menambahkan event listener ke semua tombol hapus setelah tabel dibuat
        const tombolHapus = document.querySelectorAll(".btn-hapus");
        tombolHapus.forEach(tombol => {
            tombol.addEventListener("click", (e) => {
                const idUntukDihapus = parseInt(e.target.getAttribute("data-id"));
                // Memanggil fungsi hapusProduk dengan satu ID
                hapusProduk(idUntukDihapus);
            });
        });
    }
    
    updateRingkasan();
};

// [MATERI WAJIB: REST PARAMETER] - Fungsi hapusProduk(...ids) menerima satu atau beberapa ID
const hapusProduk = (...ids) => {
    // Menyimpan jumlah produk sebelum dihapus untuk mengetahui apakah ada yang berhasil dihapus
    const jumlahAwal = daftarProduk.length;
    
    // [MATERI WAJIB: ARRAY METHOD] - Menggunakan filter untuk menghapus produk
    // Jika id produk saat ini tidak ada di dalam array parameter "ids", maka simpan produk tersebut
    daftarProduk = daftarProduk.filter(produk => {
        return !ids.includes(produk.id);
    });
    
    if (daftarProduk.length < jumlahAwal) {
        tampilkanNotifikasi("Produk berhasil dihapus!", "sukses");
        renderProduk(daftarProduk); // Render ulang tabel
    }
};

// [MATERI WAJIB: EVENT LISTENER] - Menangani submit form
formTambahProduk.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah reload halaman
    
    const namaBaru = inputNama.value.trim();
    const hargaBaru = parseFloat(inputHarga.value);
    
    // Validasi input
    if (namaBaru === "") {
        tampilkanNotifikasi("Nama produk tidak boleh kosong!", "error");
        return;
    }
    
    if (isNaN(hargaBaru) || hargaBaru <= 0) {
        tampilkanNotifikasi("Harga produk harus berupa angka positif!", "error");
        return;
    }
    
    // Membuat ID otomatis (mencari ID terbesar, lalu ditambah 1)
    let newId = 1;
    if (daftarProduk.length > 0) {
        // [MATERI WAJIB: ARRAY METHOD (map) & SPREAD OPERATOR]
        // map digunakan untuk mendapatkan array id
        const semuaId = daftarProduk.map(p => p.id);
        // Spread operator digunakan pada Math.max untuk mencari nilai tertinggi
        newId = Math.max(...semuaId) + 1;
    }
    
    const produkBaru = {
        id: newId,
        nama: namaBaru,
        harga: hargaBaru
    };
    
    // [MATERI WAJIB: SPREAD OPERATOR] - Membuat array baru berisi produk lama dan produk baru
    daftarProduk = [...daftarProduk, produkBaru];
    
    tampilkanNotifikasi("Produk berhasil ditambahkan!", "sukses");
    
    // Reset form
    formTambahProduk.reset();
    inputNama.focus();
    
    // Tampilkan data terbaru
    renderProduk(daftarProduk);
});

// [MATERI WAJIB: EVENT LISTENER] - Menangani klik tombol tampilkan semua
btnTampilkanSemua.addEventListener("click", () => {
    renderProduk(daftarProduk);
});

// Tampilkan semua data saat halaman pertama kali dibuka
document.addEventListener("DOMContentLoaded", () => {
    renderProduk(daftarProduk);
});
