class Kendaraan {
  #sedangDisewa = false;

  constructor(nama, platNomor, tarifPerHari) {
    this.nama = nama;
    this.platNomor = platNomor;
    this.tarifPerHari = tarifPerHari;
  }

  get sedangDisewa() {
    return this.#sedangDisewa;
  }

  setStatusSewa(status) {
    this.#sedangDisewa = status;
  }

  info() {
    return `${this.nama} (${this.platNomor})`;
  }
}

class Mobil extends Kendaraan {
  constructor(nama, platNomor, tarifPerHari, jumlahPenumpang) {
    super(nama, platNomor, tarifPerHari);
    this.jumlahPenumpang = jumlahPenumpang;
  }

  info() {
    return `Mobil ${super.info()} - ${this.jumlahPenumpang} penumpang`;
  }
}

class Motor extends Kendaraan {
  constructor(nama, platNomor, tarifPerHari, jenisMesin) {
    super(nama, platNomor, tarifPerHari);
    this.jenisMesin = jenisMesin;
  }

  info() {
    return `Motor ${super.info()} - mesin ${this.jenisMesin}`;
  }
}

class Pelanggan {
  constructor(nama, nomorTelepon) {
    this.nama = nama;
    this.nomorTelepon = nomorTelepon;
    this.kendaraanDisewa = null;
    this.lamaSewa = 0;
  }

  sewaKendaraan(kendaraan, lamaHari) {
    if (this.kendaraanDisewa) {
      console.log(`${this.nama} masih menyewa ${this.kendaraanDisewa.info()}.`);
      return false;
    }
    if (kendaraan.sedangDisewa) {
      console.log(`${kendaraan.info()} sedang disewa pelanggan lain.`);
      return false;
    }

    this.kendaraanDisewa = kendaraan;
    this.lamaSewa = lamaHari;
    kendaraan.setStatusSewa(true);

    const total = kendaraan.tarifPerHari * lamaHari;
    console.log(
      `Transaksi dicatat: ${this.nama} menyewa ${kendaraan.info()} ` +
        `selama ${lamaHari} hari. Total: Rp${total.toLocaleString("id-ID")}`,
    );
    return true;
  }

  kembalikanKendaraan() {
    if (!this.kendaraanDisewa) {
      console.log(`${this.nama} tidak sedang menyewa kendaraan.`);
      return;
    }
    console.log(`${this.nama} mengembalikan ${this.kendaraanDisewa.info()}.`);
    this.kendaraanDisewa.setStatusSewa(false);
    this.kendaraanDisewa = null;
    this.lamaSewa = 0;
  }
}

class SistemRental {
  constructor() {
    this.daftarPelanggan = [];
  }

  tambahPelanggan(pelanggan) {
    this.daftarPelanggan.push(pelanggan);
  }

  tampilkanPenyewaAktif() {
    const penyewa = this.daftarPelanggan.filter(
      (p) => p.kendaraanDisewa !== null,
    );

    console.log("\n=== Daftar Pelanggan yang Sedang Menyewa ===");
    if (penyewa.length === 0) {
      console.log("Tidak ada pelanggan yang sedang menyewa kendaraan.");
      return;
    }

    penyewa.forEach((p, i) => {
      console.log(
        `${i + 1}. ${p.nama} | Telp: ${p.nomorTelepon} | ` +
          `${p.kendaraanDisewa.info()} | ${p.lamaSewa} hari`,
      );
    });
  }
}

const avanza = new Mobil("Toyota Avanza", "B 1234 ABC", 350000, 7);
const brio = new Mobil("Honda Brio", "B 5678 DEF", 300000, 5);
const vario = new Motor("Honda Vario", "B 9012 GHI", 100000, "125cc");

const budi = new Pelanggan("Budi", "081234567890");
const sari = new Pelanggan("Sari", "082345678901");
const andi = new Pelanggan("Andi", "083456789012");

const rental = new SistemRental();
[budi, sari, andi].forEach((p) => rental.tambahPelanggan(p));

budi.sewaKendaraan(avanza, 3);
sari.sewaKendaraan(vario, 2);
andi.sewaKendaraan(avanza, 1);

rental.tampilkanPenyewaAktif();

budi.kembalikanKendaraan();
rental.tampilkanPenyewaAktif();
