const inputHTML = document.getElementById('codeEncrypt')
const inputAHTML = document.getElementById('A')
const inputBHTML = document.getElementById('B')
const inputCHTML = document.getElementById('z')
const btnEncrypt = document.querySelector('.btnEncrypt')
const resultHTML = document.querySelector('.result')

// tabela de caracteres para criptografia
// divididos por positivos e negativos
const TABLECHARACTER = { 
  positive: {
    'A': '1', 'B': '2', 'C': '3', 'D': '4', 'E': '5', 'F': '6', 'G': '7', 'H': '8', 'I': '9', 'J': '10',
    'K': '11', 'L': '12', 'M': '13', 'N': '14', 'O': '15', 'P': '16', 'Q': '17', 'R': '18', 'S': '19', 'T': '20',
    'U': '21', 'V': '22', 'W': '23', 'X': '24', 'Y': '25', 'Z': '26', '.': '27', ',': '28', ' ': '29'
  },
  negative: {
    'A': '-28', 'B': '-27', 'C': '-26', 'D': '-25', 'E': '-24', 'F': '-23', 'G': '-22', 'H': '-21', 'I': '-20', 'J': '-19',
    'K': '-18', 'L': '-17', 'M': '-16', 'N': '-15', 'O': '-14', 'P': '-13', 'Q': '-12', 'R': '-11', 'S': '-10', 'T': '-9',
    'U': '-8', 'V': '-7', 'W': '-6', 'X': '-5', 'Y': '-4', 'Z': '-3', '.': '-2', ',': '-1', ' ': '0'
  }
}

let numberTorDecrypt = []

const encrypt = () => {
  if (inputAHTML.value === "") {
    inputAHTML.value = "0";
  }
  if (inputBHTML.value === "") {
    inputBHTML.value = "0";
  }
  if (inputCHTML.value === "") {
    inputCHTML.value = "0";
  }
  
  if (inputAHTML.value === "0" && inputCHTML.value === "0") {
    alert("Os valores de 'a' e 'b' não podem ser simultaneamente 0.")
    return;
  }
  else if (inputHTML.value === "") {
    alert("A frase a criptografar não pode ser vazia.");
    return;
  }

  // valor vindo do input principal
  // transformando em array com cada letra
  // Ex.: ['P', 'O', 'O']
  const messageToEncryptInChar = inputHTML.value.split('')
  
  const [wordEncrypt, arrayEncrypt] = encryptMessage(messageToEncryptInChar)
  numberTorDecrypt = arrayEncrypt
 
  //  adiciona na tela o resultado
  resultHTML.innerHTML = `<p>Sua mensagem criptografada: <strong>${wordEncrypt}</strong></p>`
}

const decrypt = () => {
  if (!inputAHTML.value || !inputBHTML.value || !inputHTML.value) return

  const wordDecrypt = decryptMessage(numberTorDecrypt)

  resultHTML.innerHTML = `<p>Sua mensagem criptografada: <strong>${wordDecrypt}</strong></p>`
} 


const encryptMessage = (messageToEncryptInChar) => {
  let numbersValidsToEncrypt = []
// pecorre os array com os caracetres
  messageToEncryptInChar.forEach((item) => {

    // cálculo para achar o número da criptografia
    const number = (Number(inputAHTML.value) * Number(TABLECHARACTER.positive[item])) + Number(inputBHTML.value)
    alert(item+" "+number);

    // verifica se está entre o range dos caracteres
    if (number >= 1 && number <= 29) {
      // salva, o char, o numero que está com char 
      numbersValidsToEncrypt.push({ char: item, number: number, oldNumber: number })
    } else {
      // cálculo um número que esteja entre o range de 1 e 29 (tamanho da tabela)
      const newNumber = findK(number) 

      // adiciona o número novo e guarda o antigo tbm
      // o char ainda não foi atualizado
      numbersValidsToEncrypt.push({ char: item, number: Number(newNumber), oldNumber: number })
    }
  })

  let str = ''

  let count = 0
  // pecorre a quantidade de elementos que seram encriptografado
  for (count; count < numbersValidsToEncrypt.length; count++) {
    // se maior que zero usamos a tabela para positivos
    if (numbersValidsToEncrypt[count].number > 0) {
      // como a tabela tem números de 1 a 29 
      // pecorremos pelo index
      // esse metodo retorn um array com os valores da tabelas (uns números no caso)
      Object.values(TABLECHARACTER.positive).forEach((item, index) => {
        // verificamos se o número salvo for igual ao da tabela
        if (Number(item) === numbersValidsToEncrypt[count].number) {
          // adicionamos na string a letra na posição onde o valor foi igual ao número do cálculo da congruenca
          str += Object.keys(TABLECHARACTER.positive)[index]
        }
      })
    } else {
      // mesma lógica para tabela dos negativo
      Object.values(TABLECHARACTER.negative).forEach((item, index) => {
        if (Number(item) === numbersValidsToEncrypt[count].number) {
          str += Object.keys(TABLECHARACTER.negative)[index]
        }
      })
    }
  }

  return [str, numbersValidsToEncrypt]
}

const decryptMessage = (numberTorDecrypt) => {
  let inverseArray = []
  let str = ''

  numberTorDecrypt.forEach((item) => {
    inverseArray.push(inverseFunction(inputAHTML.value, inputBHTML.value, item.oldNumber))     
  })

  inverseArray.forEach((item) => {
    if (Number(item) > 0) {
      Object.values(TABLECHARACTER.positive).forEach((tableNumber, index) => {
        if (Number(tableNumber) === Number(item))  {
          str += Object.keys(TABLECHARACTER.positive)[index];
        }
      })
    } else {
      Object.values(TABLECHARACTER.negative).forEach((tableNumber, index) => {
        if (Number(tableNumber) === Number(item))  {
          str += Object.keys(TABLECHARACTER.negative)[index];
        }
      })
    }
  })

  return str
}

// até achar um número enre -28 e 29
const findK = (number) => {
  let result

  do {
    // sorteia um número aleatório enrre -28 e 29
    const k = Math.floor(Math.random() * 29) - 28
    // cálculo da conguência
    result = Number(number) + Number(k * 29)
  } while (result < -28 || result > 29) 
  
  return Number(result)
}

// seria a função da inversa
const inverseFunction = (a, b, x) => {
  if (x > 0) {
    return (Number(x) - Number(b)) / Number(a)
  } else {
    return (Number(x) + Number(b)) / Number(a)
  }
}
