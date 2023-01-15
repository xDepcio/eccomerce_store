const categories = [
    {
      name: 'Podzespoły komputerowe',
      subCategories: [
        {
          name: 'Części komputerowe',
          finalCategories: [
            {
              name: 'Karty graficzne'
            },
            {
              name: 'Procesory'
            },
            {
              name: 'Dyski'
            },
            {
              name: 'Płyty główne'
            },
            {
              name: 'Pamięci RAM'
            },
          ]
        },
        {
          name: 'Chłodzenia komputerowe',
          finalCategories: [
            {
              name: 'Chłodzenia CPU'
            },
            {
              name: 'Chłodzenia PC'
            },
            {
              name: 'Chłodzenia wodne'
            },
            {
              name: 'Pasty termoprzewodzące'
            }
          ]
        }
      ]
    },
    {
      name: 'Peryferia',
      subCategories: [
        {
          name: 'Klawiatury',
          finalCategories: [
            {
              name: 'Klawiatury bezprzewodowe'
            },
            {
              name: 'Klawiatury przewodowe'
            }
          ]
        },
        {
          name: 'Myszki',
          finalCategories: [
            {
              name: 'Myszki biurowe'
            },
            {
              name: 'Myszki gamingowe'
            }
          ]
        },
      ]
    }
  ]

  export default categories
