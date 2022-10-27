const mappedStr = {
    'ą': 'a',
    'ę': 'e',
    ' ': '-',
    'ś': 's',
    'ć': 'c',
    'ż': 'z',
    'ź': 'z',
    'ł': 'l'
}

export const categoriesMapped = {
    "Chłodzenia komputerowe": "chlodzenia-komputerowe",
    "chlodzenia-komputerowe": "Chłodzenia komputerowe",
    'Podzespoły komputerowe': 'podzespoly-komputerowe',
    'podzespoly-komputerowe': 'Podzespoły komputerowe',
    'Płyty główne': 'plyty-glowne',
    'plyty-glowne': 'Płyty główne',
    'Chłodzenia wodne': 'chlodzenia-wodne',
    'chlodzenia-wodne': 'Chłodzenia wodne',
    'Chłodzenia CPU': 'chlodzenia-cpu',
    'chlodzenia-cpu': 'Chłodzenia CPU',
    'Pasty termoprzewodzące': 'pasty-termoprzewodzace',
    'pasty-termoprzewodzace': 'Pasty termoprzewodzące',
    'Chłodzenia komputera': 'chlodzenia-komputera',
    'chlodzenia-komputera': 'Chłodzenia komputera',
    'Pamięci RAM': 'pamieci-ram',
    'pamieci-ram': 'Pamięci RAM',
    'Sprzęt AGD': 'sprzet-agd',
    'sprzet-agd': 'Sprzęt AGD',
    'Części komputerowe': 'czesci-komputerowe',
    'czesci-komputerowe': 'Części komputerowe',
    'Chłodzenia PC': 'chlodzenia-pc',
    'chlodzenia-pc': 'Chłodzenia PC'
}

export const urlToCategoryName = (string) => {
    let output = string.replace('-', ' ')
    output = categoriesMapped[string] === undefined ? output[0].toUpperCase() + output.slice(1) : categoriesMapped[string]
    // console.log('output', output)
    return output
}

export const toValidUrl = (string) => {
    let newString = string.toLowerCase()
    let output = ''

    for(let i = 0; i < newString.length; i++) {
        let char = newString[i]
        if(mappedStr[char] !== undefined) {
            output += mappedStr[char]
        }
        else {
            output += char
        }
    }

    return output
}
