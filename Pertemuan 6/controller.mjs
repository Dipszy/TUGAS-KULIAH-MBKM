import users from './data.mjs';

const index = () => {
  console.log('=== Daftar Users ===');
  users
    .map(
      (user, i) =>
        `${i + 1}. Nama: ${user.nama} | Umur: ${user.umur} | Alamat: ${user.alamat} | Email: ${user.email}`
    )
    .forEach((baris) => console.log(baris));
  console.log(`Total: ${users.length} data\n`);
};

const store = (user) => {
  users.push(user);
  console.log(`Data "${user.nama}" berhasil ditambahkan.`);
};

const destroy = () => {
  const dihapus = users.pop();
  console.log(`Data "${dihapus.nama}" berhasil dihapus.`);
};

export { index, store, destroy };
