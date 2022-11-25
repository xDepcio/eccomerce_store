'use strict';
const {FinalCategory} = require('../models');
const {CategoriesGraphicsAttributesItem} = require('../models');

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

    const producents = ['amd', 'nvidia', 'intel']
    const memorySizes = [2, 4, 6, 8, 10, 16]
    const graphicChips = ['nivida rtx 3070', 'nvidia rtx 3060', 'nvidia rtx 3060ti', 'nvidia rtx 3090', 'radeon rx 6700', 'radeon rx 6800']

    const items = [
      {
        name: 'Intel i5-11400f',
        category: 'Procesory'
      },
      {
        name: 'Intel i3-10100f',
        category: 'Procesory'
      },
      {
        name: 'AMD Ryzen R5-3600',
        category: 'Procesory'
      },
      {
        name: 'AMD Ryzen R7-3800',
        category: 'Procesory'
      },
      {
        name: 'Intel Xeon Gold',
        category: 'Procesory'
      },
      {
        name: 'Gigabyte GeForce RTX 3060 EAGLE OC LHR 12GB GDDR6',
        category: 'Karty graficzne',
        producent: 'gigabyte',
        memorySize: 12,
        graphicChip: 'geforce rtx 3060',
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
        ]
      },
      {
        name: 'Gigabyte GeForce RTX 3090 Ti GAMING OC 24GB GDDR6X',
        category: 'Karty graficzne',
        producent: 'gigabyte',
        memorySize: 24,
        graphicChip: 'geforce rtx 3090 ti',
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
        ]
      },
      {
        name: 'Gigabyte GeForce RTX 3060 GAMING OC LHR 12GB GDDR6',
        category: 'Karty graficzne',
        producent: 'gigabyte',
        memorySize: 12,
        graphicChip: 'geforce rtx 3060',
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
        ]
      },
      {
        name: 'Gainward GeForce RTX 4080 Phantom GS 16GB GDDR6X',
        category: 'Karty graficzne',
        producent: 'gainward',
        memorySize: 16,
        graphicChip: 'geforce rtx 4080',
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
        ]
      },
      {
        name: 'KFA2 GeForce GTX 1660 SUPER 1-Click OC 6GB GDDR6',
        category: 'Karty graficzne',
        producent: 'kfa2',
        memorySize: 6,
        graphicChip: 'geforce gtx 1660 super',
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
        ]
      },
      {
        name: 'Gigabyte GeForce RTX 3060 Ti GAMING OC LHR 8GB GDDR6',
        category: 'Karty graficzne',
        producent: 'gigabyte',
        memorySize: 8,
        graphicChip: 'geforce rtx 3060 ti',
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
        ]
      },
      {
        name: 'Zotac GeForce RTX 3060 Twin Edge 12GB GDDR6',
        category: 'Karty graficzne',
        producent: 'zotac',
        memorySize: 12,
        graphicChip: 'geforce rtx 3060',
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
        ]
      },
      {
        name: 'EVGA GeForce GTX 1660 SUPER GAMING SC ULTRA 6GB GDDR6',
        category: 'Karty graficzne',
        producent: 'evga',
        memorySize: 6,
        graphicChip: 'geforce gtx 1660 super',
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
        ]
      },
      {
        name: 'Gainward GeForce RTX 4090 Phantom 24GB GDDR6X',
        category: 'Karty graficzne',
        producent: 'gainward',
        memorySize: 24,
        graphicChip: 'geforce rtx 4090',
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
        ]
      },
      {
        name: 'Gigabyte GeForce RTX 3090 Ti GAMING OC 24GB GDDR6X',
        category: 'Karty graficzne',
        producent: 'gigabyte',
        memorySize: 24,
        graphicChip: 'geforce rtx 3090 ti',
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
        ]
      },
      {
        name: 'Gigabyte GeForce RTX 3090 Ti GAMING OC 24GB GDDR6X',
        category: 'Karty graficzne',
        producent: 'gigabyte',
        memorySize: 24,
        graphicChip: 'geforce rtx 3090 ti',
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
        ]
      },
      {
        name: 'Gigabyte GeForce RTX 3090 Ti GAMING OC 24GB GDDR6X',
        category: 'Karty graficzne',
        producent: 'gigabyte',
        memorySize: 24,
        graphicChip: 'geforce rtx 3090 ti',
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
        ]
      },
      {
        name: 'Gigabyte GeForce RTX 3090 Ti GAMING OC 24GB GDDR6X',
        category: 'Karty graficzne',
        producent: 'gigabyte',
        memorySize: 24,
        graphicChip: 'geforce rtx 3090 ti',
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
        ]
      },
      {
        name: 'Gigabyte GeForce RTX 3090 Ti GAMING OC 24GB GDDR6X',
        category: 'Karty graficzne',
        producent: 'gigabyte',
        memorySize: 24,
        graphicChip: 'geforce rtx 3090 ti',
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
        ]
      },
      {
        name: 'Gigabyte GeForce RTX 3090 Ti GAMING OC 24GB GDDR6X',
        category: 'Karty graficzne',
        producent: 'gigabyte',
        memorySize: 24,
        graphicChip: 'geforce rtx 3090 ti',
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
        ]
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

    for(let i = 0; i < items.length; i++) {
      let item = items[i]
      let foundCategory = await FinalCategory.findOne({
        where: {
          name: item.category,
        }
      })
      let createdItem = await foundCategory.createItem({
        name: item.name,
        price: iRandomRange(700, 3299),
        imagesUrl: item.imagesUrl || `https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_27_153_06.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_13_405_00.png https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png`,
        description: `
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
        `,
        specs: JSON.stringify([
          ['Pamięć', '8 GB GDDR6X'],
          ['Taktowanie rdzenia', '2375 Mhz'],
          ['Taktowanie pamięci', '6550 Mhz'],
          ['TDP', '240 W'],
          ['Kolor', 'Dojebany'],
          ['Szerokość', '128 mm'],
          ['Wysokość', '58 mm'],
          ['Długość', '294 mm'],
        ])
      })

      console.log(CategoriesGraphicsAttributesItem)
      if(item.category === 'Karty graficzne') {
        await CategoriesGraphicsAttributesItem.create({
          itemId: createdItem.id,
          producent: createdItem.producent || ['nvidia', 'amd'][i % 2],
          memorySize: createdItem.memorySize || [2, 4, 6, 8, 10, 16, 12][i % 7],
          graphicChip: createdItem.graphicChip || ['geforce rtx 3060', 'geforce rtx 3070', 'radeon 6700', 'radeon 6700xt'][i % 4]
        })
      }

      // await createdItem.createItemSpec({
      //   name: item.name,
      //   price: 2990,
      //   description: `
      //   <div className='specs-desc-image-wrapper'>
      //   <img src='https://allegro.stati.pl/AllegroIMG/PRODUCENCI/NVIDIA/RTX-30/rtx-platform.jpg'></img>
      //   </div>
      //   <section className='img-text'>
      //   <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quidem suscipit voluptatum quibusdam porro sit tempora quaerat, odio reprehenderit, eveniet corrupti! Sint nisi aperiam excepturi et nostrum illum officia animi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae doloribus praesentium ullam possimus accusamus iure sunt atque, fugit, aperiam cupiditate, numquam quasi ea reprehenderit laborum nesciunt dolor molestiae minima dolorum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, accusamus repellat! Voluptatum expedita quod, iusto natus illum nam ipsum laboriosam veniam cumque vitae fugiat, non magni incidunt aspernatur cum similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quaerat voluptatum neque, asperiores provident optio accusamus accusantium, nostrum vel, unde eligendi. Quis possimus odio, atque labore nemo eaque quaerat aperiam.</p>
      //   <div className='specs-desc-image-wrapper'>
      //   <img src='https://allegro.stati.pl/AllegroIMG/PRODUCENCI/GIGABYTE/GV-N3060EAGLE-OC-12GD-2.0/3-chlodzenie.jpg'></img>
      //   </div>
      //   </section>
      //   <section className='img-text'>
      //   <div className='specs-desc-image-wrapper'>
      //   <img src='https://allegro.stati.pl/AllegroIMG/PRODUCENCI/NVIDIA/RTX-30/nvidia-studio-05.jpg'></img>
      //   </div>
      //   <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quidem suscipit voluptatum quibusdam porro sit tempora quaerat, odio reprehenderit, eveniet corrupti! Sint nisi aperiam excepturi et nostrum illum officia animi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae doloribus praesentium ullam possimus accusamus iure sunt atque, fugit, aperiam cupiditate, numquam quasi ea reprehenderit laborum nesciunt dolor molestiae minima dolorum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, accusamus repellat! Voluptatum expedita quod, iusto natus illum nam ipsum laboriosam veniam cumque vitae fugiat, non magni incidunt aspernatur cum similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quaerat voluptatum neque, asperiores provident optio accusamus accusantium, nostrum vel, unde eligendi. Quis possimus odio, atque labore nemo eaque quaerat aperiam.</p>
      //   </section>
      //   <div className='specs-desc-image-wrapper'>
      //   <img src="https://allegro.stati.pl/AllegroIMG/PRODUCENCI/NVIDIA/RTX-30/frames-win-games-nvidia-reflex-03.jpg"/>
      //   </div>
      //   `,
      //   // imagesUrl: `https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_27_153_06.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_13_405_00.png https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png`,
      //   specs: JSON.stringify([
      //     ['Pamięć', '8 GB GDDR6X'],
      //     ['Taktowanie rdzenia', '2375 Mhz'],
      //     ['Taktowanie pamięci', '6550 Mhz'],
      //     ['TDP', '240 W'],
      //     ['Kolor', 'Dojebany'],
      //     ['Szerokość', '128 mm'],
      //     ['Wysokość', '58 mm'],
      //     ['Długość', '294 mm'],
      //   ])
      // })

    }
    // await queryInterface.bulkInsert('Items', [
    //   {
    //     name: 'Intel i5-11400f',
    //     categoryId: 1
    //   }
    // ])
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
