'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const choose = (array) => {
      const min = 0
      const max = array.length - 1
      const randomInt = Math.floor(Math.random() * (max - min + 1) + min)
      return array[randomInt]
    }

    const iRandomRange = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const items = [
      {
        name: 'Intel i5-11400F',
        category: 'Procesory',
        imagesUrl: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/4/pr_2022_4_4_13_1_27_284_00.jpg',
        attributes: {
          manufacturer: 'amd',
          socketType: 'am4',
          coresCount: 6
        }
      },
      {
        name: 'Intel i5-10400F',
        category: 'Procesory',
        imagesUrl: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/5/pr_2020_5_6_15_54_11_386_00.jpg',
        attributes: {
          manufacturer: 'intel',
          socketType: 'lga 1200',
          coresCount: 6
        }
      },
      {
        name: 'Intel i5-12400F',
        category: 'Procesory',
        imagesUrl: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/12/pr_2021_12_23_9_31_19_942_00.jpg',
        attributes: {
          manufacturer: 'intel',
          socketType: 'lga 1700',
          coresCount: 6
        }
      },
      {
        name: 'Intel i5-11400F',
        category: 'Procesory',
        imagesUrl: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/3/pr_2021_3_16_17_21_50_504_00.jpg',
        attributes: {
          manufacturer: 'intel',
          socketType: 'lga 1200',
          coresCount: 6
        }
      },
      {
        name: 'AMD Ryzen 7 5700X',
        category: 'Procesory',
        imagesUrl: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/4/pr_2022_4_15_16_29_20_759_00.jpg',
        attributes: {
          manufacturer: 'amd',
          socketType: 'am4',
          coresCount: 8
        }
      },
      {
        name: 'AMD Ryzen 7 5800X3D',
        category: 'Procesory',
        imagesUrl: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/4/pr_2022_4_5_15_32_46_110_00.jpg',
        attributes: {
          manufacturer: 'amd',
          socketType: 'am4',
          coresCount: 8
        }
      },
      {
        name: 'AMD Ryzen 9 5900X',
        category: 'Procesory',
        imagesUrl: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/10/pr_2020_10_9_13_56_59_540_00.jpg',
        attributes: {
          manufacturer: 'amd',
          socketType: 'am4',
          coresCount: 12
        }
      },
      {
        name: 'Intel i3-12100F',
        category: 'Procesory',
        imagesUrl: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/12/pr_2021_12_23_9_29_13_571_00.jpg',
        attributes: {
          manufacturer: 'intel',
          socketType: 'lga 1700',
          coresCount: 4
        }
      },
      {
        name: 'Intel Core i5-13600KF',
        category: 'Procesory',
        imagesUrl: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/9/pr_2022_9_27_12_11_20_160_02.jpg',
        attributes: {
          manufacturer: 'intel',
          socketType: 'lga 1700',
          coresCount: 14
        }
      },
      {
        name: 'Gigabyte GeForce RTX 3060 EAGLE OC LHR 12GB GDDR6',
        category: 'Karty graficzne',
        imagesUrl: `https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_27_153_06.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_13_405_00.png https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png`,
        specs: [
          ['Pamięć', '12 GB GDDR6X'],
          ['Taktowanie rdzenia', '2375 Mhz'],
          ['Taktowanie pamięci', '6550 Mhz'],
          ['TDP', '240 W'],
          ['Kolor', 'Dojebany'],
          ['Szerokość', '128 mm'],
          ['Wysokość', '58 mm'],
          ['Długość', '294 mm'],
        ],
        attributes: {
          producent: 'gigabyte',
          memorySize: 12,
          graphicChip: 'geforce rtx 3060',
        }
      },
      {
        name: 'Gigabyte GeForce RTX 3090 Ti GAMING OC 24GB GDDR6X',
        category: 'Karty graficzne',
        imagesUrl: `https://cdn.x-kom.pl/i/setup/images/prod/big/product-medium,,2022/3/pr_2022_3_29_12_53_6_223_07.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_27_153_06.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_13_405_00.png https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png`,
        specs: [
          ['Pamięć', '24 GB GDDR6X'],
          ['Taktowanie rdzenia', '2375 Mhz'],
          ['Taktowanie pamięci', '6550 Mhz'],
          ['TDP', '240 W'],
          ['Kolor', 'Dojebany'],
          ['Szerokość', '128 mm'],
          ['Wysokość', '58 mm'],
          ['Długość', '294 mm'],
        ],
        attributes: {
          producent: 'gigabyte',
          memorySize: 24,
          graphicChip: 'geforce rtx 3090 ti',
        }
      },
      {
        name: 'Gigabyte GeForce RTX 3060 GAMING OC LHR 12GB GDDR6',
        category: 'Karty graficzne',
        imagesUrl: `https://cdn.x-kom.pl/i/setup/images/prod/big/product-medium,,2021/6/pr_2021_6_15_13_24_23_26_05.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_27_153_06.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_13_405_00.png https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png`,
        specs: [
          ['Pamięć', '12 GB GDDR6X'],
          ['Taktowanie rdzenia', '2375 Mhz'],
          ['Taktowanie pamięci', '6550 Mhz'],
          ['TDP', '240 W'],
          ['Kolor', 'Dojebany'],
          ['Szerokość', '128 mm'],
          ['Wysokość', '58 mm'],
          ['Długość', '294 mm'],
        ],
        attributes: {
          producent: 'gigabyte',
          memorySize: 12,
          graphicChip: 'geforce rtx 3060',
        }
      },
      {
        name: 'Gainward GeForce RTX 4080 Phantom GS 16GB GDDR6X',
        category: 'Karty graficzne',
        imagesUrl: `https://cdn.x-kom.pl/i/setup/images/prod/big/product-medium,,2022/10/pr_2022_10_24_8_18_4_616_00.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_27_153_06.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_13_405_00.png https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png`,
        specs: [
          ['Pamięć', '16 GB GDDR6X'],
          ['Taktowanie rdzenia', '2375 Mhz'],
          ['Taktowanie pamięci', '6550 Mhz'],
          ['TDP', '240 W'],
          ['Kolor', 'Dojebany'],
          ['Szerokość', '128 mm'],
          ['Wysokość', '58 mm'],
          ['Długość', '294 mm'],
        ],
        attributes: {
          producent: 'gainward',
          memorySize: 16,
          graphicChip: 'geforce rtx 4080',
        }
      },
      {
        name: 'KFA2 GeForce GTX 1660 SUPER 1-Click OC 6GB GDDR6',
        category: 'Karty graficzne',
        imagesUrl: `https://cdn.x-kom.pl/i/setup/images/prod/big/product-medium,,2020/1/pr_2020_1_3_17_52_13_564_05.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_27_153_06.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_13_405_00.png https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png`,
        specs: [
          ['Pamięć', '6 GB GDDR6X'],
          ['Taktowanie rdzenia', '2375 Mhz'],
          ['Taktowanie pamięci', '6550 Mhz'],
          ['TDP', '240 W'],
          ['Kolor', 'Dojebany'],
          ['Szerokość', '128 mm'],
          ['Wysokość', '58 mm'],
          ['Długość', '294 mm'],
        ],
        attributes: {
          producent: 'kfa2',
          memorySize: 6,
          graphicChip: 'geforce gtx 1660 super',
        },
      },
      {
        name: 'Gigabyte GeForce RTX 3060 Ti GAMING OC LHR 8GB GDDR6',
        category: 'Karty graficzne',
        imagesUrl: `https://cdn.x-kom.pl/i/setup/images/prod/big/product-medium,,2021/8/pr_2021_8_2_11_14_57_392_05.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_27_153_06.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_13_405_00.png https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png`,
        specs: [
          ['Pamięć', '8 GB GDDR6X'],
          ['Taktowanie rdzenia', '2375 Mhz'],
          ['Taktowanie pamięci', '6550 Mhz'],
          ['TDP', '240 W'],
          ['Kolor', 'Dojebany'],
          ['Szerokość', '128 mm'],
          ['Wysokość', '58 mm'],
          ['Długość', '294 mm'],
        ],
        attributes: {
          producent: 'gigabyte',
          memorySize: 8,
          graphicChip: 'geforce rtx 3060 ti',
        }
      },
      {
        name: 'Zotac GeForce RTX 3060 Twin Edge 12GB GDDR6',
        category: 'Karty graficzne',
        imagesUrl: `https://cdn.x-kom.pl/i/setup/images/prod/big/product-medium,,2021/2/pr_2021_2_22_13_53_10_939_04.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_27_153_06.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_13_405_00.png https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png`,
        specs: [
          ['Pamięć', '12 GB GDDR6X'],
          ['Taktowanie rdzenia', '2375 Mhz'],
          ['Taktowanie pamięci', '6550 Mhz'],
          ['TDP', '240 W'],
          ['Kolor', 'Dojebany'],
          ['Szerokość', '128 mm'],
          ['Wysokość', '58 mm'],
          ['Długość', '294 mm'],
        ],
        attributes: {
          producent: 'zotac',
          memorySize: 12,
          graphicChip: 'geforce rtx 3060',
        }
      },
      {
        name: 'EVGA GeForce GTX 1660 SUPER GAMING SC ULTRA 6GB GDDR6',
        category: 'Karty graficzne',
        imagesUrl: `https://cdn.x-kom.pl/i/setup/images/prod/big/product-medium,,2020/12/pr_2020_12_23_11_42_55_461_05.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_27_153_06.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_13_405_00.png https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png`,
        specs: [
          ['Pamięć', '6 GB GDDR6X'],
          ['Taktowanie rdzenia', '2375 Mhz'],
          ['Taktowanie pamięci', '6550 Mhz'],
          ['TDP', '240 W'],
          ['Kolor', 'Dojebany'],
          ['Szerokość', '128 mm'],
          ['Wysokość', '58 mm'],
          ['Długość', '294 mm'],
        ],
        attributes: {
          producent: 'evga',
          memorySize: 6,
          graphicChip: 'geforce gtx 1660 super',
        }
      },
      {
        name: 'Gainward GeForce RTX 4090 Phantom 24GB GDDR6X',
        category: 'Karty graficzne',
        imagesUrl: `https://cdn.x-kom.pl/i/setup/images/prod/big/product-medium,,2022/10/pr_2022_10_10_11_39_2_260_00.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_27_153_06.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_13_405_00.png https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png`,
        specs: [
          ['Pamięć', '24 GB GDDR6X'],
          ['Taktowanie rdzenia', '2375 Mhz'],
          ['Taktowanie pamięci', '6550 Mhz'],
          ['TDP', '240 W'],
          ['Kolor', 'Dojebany'],
          ['Szerokość', '128 mm'],
          ['Wysokość', '58 mm'],
          ['Długość', '294 mm'],
        ],
        attributes: {
          producent: 'gainward',
          memorySize: 24,
          graphicChip: 'geforce rtx 4090',
        }
      },
      {
        name: 'Gigabyte GeForce RTX 3090 Ti GAMING OC 24GB GDDR6X',
        category: 'Karty graficzne',
        imagesUrl: `https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_27_153_06.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_13_405_00.png https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png`,
        specs: [
          ['Pamięć', '8 GB GDDR6X'],
          ['Taktowanie rdzenia', '2375 Mhz'],
          ['Taktowanie pamięci', '6550 Mhz'],
          ['TDP', '240 W'],
          ['Kolor', 'Dojebany'],
          ['Szerokość', '128 mm'],
          ['Wysokość', '58 mm'],
          ['Długość', '294 mm'],
        ],
        attributes: {
          producent: 'gigabyte',
          memorySize: 24,
          graphicChip: 'geforce rtx 3090 ti',
        }
      },
      {
        name: 'Gigabyte GeForce RTX 3090 Ti GAMING OC 24GB GDDR6X',
        category: 'Karty graficzne',
        imagesUrl: `https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_27_153_06.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_13_405_00.png https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png`,
        specs: [
          ['Pamięć', '8 GB GDDR6X'],
          ['Taktowanie rdzenia', '2375 Mhz'],
          ['Taktowanie pamięci', '6550 Mhz'],
          ['TDP', '240 W'],
          ['Kolor', 'Dojebany'],
          ['Szerokość', '128 mm'],
          ['Wysokość', '58 mm'],
          ['Długość', '294 mm'],
        ],
        attributes: {
          producent: 'gigabyte',
          memorySize: 24,
          graphicChip: 'geforce rtx 3090 ti',
        }
      },
      {
        name: 'Gigabyte GeForce RTX 3090 Ti GAMING OC 24GB GDDR6X',
        category: 'Karty graficzne',
        imagesUrl: `https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_27_153_06.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_13_405_00.png https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png`,
        specs: [
          ['Pamięć', '8 GB GDDR6X'],
          ['Taktowanie rdzenia', '2375 Mhz'],
          ['Taktowanie pamięci', '6550 Mhz'],
          ['TDP', '240 W'],
          ['Kolor', 'Dojebany'],
          ['Szerokość', '128 mm'],
          ['Wysokość', '58 mm'],
          ['Długość', '294 mm'],
        ],
        attributes: {
          producent: 'gigabyte',
          memorySize: 24,
          graphicChip: 'geforce rtx 3090 ti',
        }
      },
      {
        name: 'Gigabyte GeForce RTX 3090 Ti GAMING OC 24GB GDDR6X',
        category: 'Karty graficzne',
        imagesUrl: `https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_27_153_06.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_13_405_00.png https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png`,
        specs: [
          ['Pamięć', '8 GB GDDR6X'],
          ['Taktowanie rdzenia', '2375 Mhz'],
          ['Taktowanie pamięci', '6550 Mhz'],
          ['TDP', '240 W'],
          ['Kolor', 'Dojebany'],
          ['Szerokość', '128 mm'],
          ['Wysokość', '58 mm'],
          ['Długość', '294 mm'],
        ],
        attributes: {
          producent: 'gigabyte',
          memorySize: 24,
          graphicChip: 'geforce rtx 3090 ti',
        }
      },
      {
        name: 'Gigabyte GeForce RTX 3090 Ti GAMING OC 24GB GDDR6X',
        category: 'Karty graficzne',
        imagesUrl: `https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_27_153_06.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_13_405_00.png https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png`,
        specs: [
          ['Pamięć', '8 GB GDDR6X'],
          ['Taktowanie rdzenia', '2375 Mhz'],
          ['Taktowanie pamięci', '6550 Mhz'],
          ['TDP', '240 W'],
          ['Kolor', 'Dojebany'],
          ['Szerokość', '128 mm'],
          ['Wysokość', '58 mm'],
          ['Długość', '294 mm'],
        ],
        attributes: {
          producent: 'gigabyte',
          memorySize: 24,
          graphicChip: 'geforce rtx 3090 ti',
        }
      },
      {
        name: 'Gigabyte GeForce RTX 3090 Ti GAMING OC 24GB GDDR6X',
        category: 'Karty graficzne',
        imagesUrl: `https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_27_153_06.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_13_405_00.png https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png`,
        specs: [
          ['Pamięć', '8 GB GDDR6X'],
          ['Taktowanie rdzenia', '2375 Mhz'],
          ['Taktowanie pamięci', '6550 Mhz'],
          ['TDP', '240 W'],
          ['Kolor', 'Dojebany'],
          ['Szerokość', '128 mm'],
          ['Wysokość', '58 mm'],
          ['Długość', '294 mm'],
        ],
        attributes: {
          producent: 'gigabyte',
          memorySize: 24,
          graphicChip: 'geforce rtx 3090 ti',
        }
      },
      {
        name: 'RTX 3080',
        category: 'Karty graficzne',
        producent: choose(producents),
        memorySize: choose(memorySizes)
      },
      {
        name: 'RX 6700 XT',
        category: 'Karty graficzne',
        producent: choose(producents),
        memorySize: choose(memorySizes)
      },
      {
        name: 'Nvidia Titan',
        category: 'Karty graficzne',
        producent: choose(producents),
        memorySize: choose(memorySizes)
      },
      {
        name: 'Bequiet Pure Dark Rock 4 PRO',
        category: 'Chłodzenia CPU'
      },
      {
        name: 'SilentiumPC Fera 5 Dual',
        category: 'Chłodzenia CPU'
      },
      {
        name: 'SilentiumPC Fera 5',
        category: 'Chłodzenia CPU'
      }
    ]
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
