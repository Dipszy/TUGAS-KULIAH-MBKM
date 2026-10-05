const EventEmitter = require("events");
const emitter = new EventEmitter();

let produkList = [
  { id: 1, nama: "Laptop", harga: 12000000 },
  { id: 2, nama: "Smartphone", harga: 5000000 },
  { id: 3, nama: "Headphone", harga: 750000 },
  { id: 4, nama: "Keyboard Mechanical", harga: 900000 },
  { id: 5, nama: "Mouse Wireless", harga: 250000 },
];

const eventHandler = {
  produkDitambah: ({ id, nama, harga }) => {
    console.log(
      `[EVENT] Produk ditambah: ${nama} (ID ${id}, Rp${harga.toLocaleString("id-ID")})`,
    );
  },
  produkDihapus: (...idHapus) => {
    console.log(`[EVENT] Produk dihapus, ID: ${idHapus.join(", ")}`);
  },
};

emitter.on("tambah", eventHandler.produkDitambah);
emitter.on("hapus", eventHandler.produkDihapus);

function tambahProduk(id, nama, harga) {
  if (produkList.some((p) => p.id === id)) {
    console.log(`ID ${id} sudah dipakai, produk "${nama}" tidak ditambahkan.`);
    return;
  }
  const produkBaru = { id, nama, harga };
  produkList = [...produkList, produkBaru];
  emitter.emit("tambah", produkBaru);
}

function hapusProduk(...idHapus) {
  produkList = produkList.filter(({ id }) => !idHapus.includes(id));
  emitter.emit("hapus", ...idHapus);
}

function tampilkanProduk() {
  console.log("\n=== Daftar Produk ===");
  if (produkList.length === 0) {
    console.log("(kosong)");
    return;
  }
  produkList.forEach(({ id, nama, harga }) => {
    console.log(`${id}. ${nama} - Rp${harga.toLocaleString("id-ID")}`);
  });
  console.log("=====================\n");
}

tampilkanProduk();
tambahProduk(6, "Tablet", 7000000);
tampilkanProduk();
hapusProduk(2);
tampilkanProduk();
hapusProduk(3, 4);
tampilkanProduk();
