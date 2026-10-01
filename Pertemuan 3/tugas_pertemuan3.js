let produkToko = [
  { id: 1, nama: "Laptop", harga: 7000000, stok: 5 },
  { id: 2, nama: "Mouse", harga: 200000, stok: 10 },
  { id: 3, nama: "Keyboard", harga: 350000, stok: 7 }
];

function tambahProduk(nama, harga, stok) {
  const idBaru = produkToko.length > 0
    ? Math.max(...produkToko.map(p => p.id)) + 1
    : 1;

  produkToko.push({ id: idBaru, nama: nama, harga: harga, stok: stok });
  console.log(`Produk "${nama}" berhasil ditambahkan dengan id ${idBaru}.`);
}

function hapusProduk(id) {
  const index = produkToko.findIndex(p => p.id === id);

  if (index === -1) {
    console.log(`Produk dengan id ${id} tidak ditemukan.`);
    return;
  }

  const dihapus = produkToko.splice(index, 1);
  console.log(`Produk "${dihapus[0].nama}" berhasil dihapus.`);
}

function tampilkanProduk() {
  console.log("=== Daftar Produk Toko ===");

  if (produkToko.length === 0) {
    console.log("Belum ada produk.");
    return;
  }

  produkToko.forEach(p => {
    console.log(
      `ID: ${p.id} | ${p.nama} | Harga: Rp${p.harga.toLocaleString("id-ID")} | Stok: ${p.stok}`
    );
  });
}

tampilkanProduk();

tambahProduk("Monitor", 1500000, 4);
tampilkanProduk();

hapusProduk(2);
tampilkanProduk();