import { index, store, destroy } from './controller.mjs';

const main = () => {
  const user1 = { nama: 'Kevin', umur: 29, alamat: 'Jl. Wijaya Kusuma No. 15', email: 'kevin.maulana@mail.com' };
  const user2 = { nama: 'Citra', umur: 22, alamat: 'Jl. Bougenville No. 27', email: 'citra.lestari@mail.com' };

  store(user1);
  store(user2);
  index();
  destroy();
  index();
};

main();
