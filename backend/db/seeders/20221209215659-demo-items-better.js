'use strict';
const {FinalCategory} = require('../models');
const {CategoriesGraphicsAttributesItem, AttributesGamingMouse, AttributesProcessor} = require('../models');

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

    let descStr = `
    <div className='specs-desc-image-wrapper'>
    <img src='https://allegro.stati.pl/AllegroIMG/PRODUCENCI/NVIDIA/RTX-30/rtx-platform.jpg'></img>
    </div>
    <section className='img-text'>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quidem suscipit voluptatum quibusdam porro sit tempora quaerat, odio reprehenderit, eveniet corrupti! Sint nisi aperiam excepturi et nostrum illum officia animi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae doloribus praesentium ullam possimus accusamus iure sunt atque, fugit, aperiam cupiditate, numquam quasi ea reprehenderit laborum nesciunt dolor molestiae minima dolorum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, accusamus repellat! Voluptatum expedita quod, iusto natus illum nam ipsum laboriosam veniam cumque vitae fugiat, non magni incidunt aspernatur cum similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quaerat voluptatum neque, asperiores provident optio accusamus accusantium, nostrum vel, unde eligendi. Quis possimus odio, atque labore nemo eaque quaerat aperiam.</p>
    <div className='specs-desc-image-wrapper'>
    <img src='https://allegro.stati.pl/AllegroIMG/PRODUCENCI/GIGABYTE/GV-N3060EAGLE-OC-12GD-2.0/3-chlodzenie.jpg'></img>
    </div>
    </section>
    <section className='img-text'>
    <div className='specs-desc-image-wrapper'>
    <img src='https://allegro.stati.pl/AllegroIMG/PRODUCENCI/NVIDIA/RTX-30/nvidia-studio-05.jpg'></img>
    </div>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quidem suscipit voluptatum quibusdam porro sit tempora quaerat, odio reprehenderit, eveniet corrupti! Sint nisi aperiam excepturi et nostrum illum officia animi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae doloribus praesentium ullam possimus accusamus iure sunt atque, fugit, aperiam cupiditate, numquam quasi ea reprehenderit laborum nesciunt dolor molestiae minima dolorum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, accusamus repellat! Voluptatum expedita quod, iusto natus illum nam ipsum laboriosam veniam cumque vitae fugiat, non magni incidunt aspernatur cum similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quaerat voluptatum neque, asperiores provident optio accusamus accusantium, nostrum vel, unde eligendi. Quis possimus odio, atque labore nemo eaque quaerat aperiam.</p>
    </section>
    <div className='specs-desc-image-wrapper'>
    <img src="https://allegro.stati.pl/AllegroIMG/PRODUCENCI/NVIDIA/RTX-30/frames-win-games-nvidia-reflex-03.jpg"/>
    </div>
    `

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
        name: "Logitech G Pro Wireless",
        category: "Myszki gamingowe",
        imagesUrl: "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/12/pr_2020_12_16_15_7_53_691_00.jpg",
        specs: [
          ["Sensor", "HERO 16K"],
          ["Weight", "99g"],
          ["Battery life", "70 hours"]
        ],
        attributes: {
          manufacturer: "Logitech",
          connectType: "Wireless",
          dpi: 16000
        }
      },
      {
        name: "Razer DeathAdder V2",
        category: "Myszki gamingowe",
        imagesUrl: "hthttps://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/3/pr_2020_3_26_6_49_24_340_00.jpg",
        specs: [
          ["Sensor", "Razer Focus+"],
          ["Weight", "82g"],
          ["Ergonomic design", ""]
        ],
        attributes: {
          manufacturer: "Razer",
          connectType: "Wired",
          dpi: 20000
        }
      },
      {
        name: "SteelSeries Rival 3",
        category: "Myszki gamingowe",
        imagesUrl: "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/1/pr_2020_1_20_9_50_4_411_00.jpg",
        specs: [
          ["Sensor", "TrueMove Core"],
          ["Weight", "99g"],
          ["RGB lighting", ""]
        ],
        attributes: {
          manufacturer: "SteelSeries",
          connectType: "Wired",
          dpi: 18000
        }
      },
      {
        name: "Corsair Dark Core RGB/SE",
        category: "Myszki gamingowe",
        imagesUrl: "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/4/pr_2020_4_27_12_5_39_526_00.jpg",
        specs: [
          ["Sensor", "Pixart 3367"],
          ["Weight", "121g"],
          ["9 programmable buttons", ""]
        ],
        attributes: {
          manufacturer: "Corsair",
          connectType: "Wireless",
          dpi: 16000
        }
      }
    ]

    // items.forEach(async (item) => {
    for(let i = 0; i < items.length; i++) {
      const item = items[i]

      let itemCategory = await FinalCategory.findOne({
        where: {
          name: item.category
        }
      })

      let createdItem = await itemCategory.createItem({
        price: iRandomRange(50, 500),
        name: item.name,
        imagesUrl: item.imagesUrl,
        specs: JSON.stringify(item.specs),
        description: descStr,
      })

      switch(item.category) {
        case "Myszki gamingowe": {
          await AttributesGamingMouse.create({
            itemId: createdItem.id,
            ...item.attributes
          })
          break
        }
        case "Karty graficzne": {
          await CategoriesGraphicsAttributesItem.create({
            itemId: createdItem.id,
            ...item.attributes
          })
          break
        }
        case "Procesory": {
          await AttributesProcessor.create({
            itemId: createdItem.id,
            ...item.attributes
          })
          break
        }
      }
    }
    // })

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
