'use strict';
const {FinalCategory} = require('../models')

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
        name: 'RTX 3060 ti',
        category: 'Karty graficzne'
      },
      {
        name: 'RTX 3070',
        category: 'Karty graficzne'
      },
      {
        name: 'RTX 3080',
        category: 'Karty graficzne'
      },
      {
        name: 'RX 6700 XT',
        category: 'Karty graficzne'
      },
      {
        name: 'Nvidia Titan',
        category: 'Karty graficzne'
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
          name: item.category
        }
      })
      let createdItem = await foundCategory.createItem({
        name: item.name
      })
      
      await createdItem.createItemSpec({
        name: item.name,
        price: 2990,
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
        imagesUrl: `https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_27_153_06.jpg https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_13_405_00.png https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_20_794_03.png`,
        specs: JSON.stringify({
          'Pamięć': '8 GB GDDR6X',
          'Taktowanie rdzenia': '2375 Mhz',
          'Taktowanie pamięci': '6550 Mhz',
          'TDP': '240 W',
          'Kolor': 'Dojebany',
          'Szerokość': '128 mm',
          'Wysokość': '58 mm',
          'Długość': '294 mm',
        })
      })

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
