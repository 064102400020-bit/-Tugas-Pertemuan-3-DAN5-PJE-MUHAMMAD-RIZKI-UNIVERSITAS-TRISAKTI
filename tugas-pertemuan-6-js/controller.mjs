import users from './data.mjs';

// Menampilkan semua data menggunakan method map()
const index = () => {
    users.map((user, i) => {
        console.log(`${i + 1}. Nama: ${user.nama}, Umur: ${user.umur}, Alamat: ${user.alamat}, Email: ${user.email}`);
    });
};

// Menambahkan data baru menggunakan method push()
const store = (user) => {
    users.push(user);
};

// Menghapus satu data (data terakhir) menggunakan method pop()
const destroy = () => {
    users.pop();
};

export { index, store, destroy };
