const inputHTML = document.getElementById('codeEncrypt')
const inputAHTML = document.getElementById('a')
const inputBHTML = document.getElementById('b')
const inputCHTML = document.getElementById('c')
const btnEncrypt = document.querySelector('.btnEncrypt')
const resultHTML = document.querySelector('.result')

var message, kValues, values, delta;
var aValue, bValue, cValue, funcType;
var wordDecrypt;

let ASCIIList = [];
// coleta caracteres imprímiveis da tabela ASCII
for (let i = 32; i <= 126; i++) {
  ASCIIList.push(String.fromCharCode(i));
}
for (let i = 130; i <= 140; i++) {
  ASCIIList.push(String.fromCharCode(i));
}
for (let i = 145; i <= 148; i++) {
  ASCIIList.push(String.fromCharCode(i));
}
for (let i = 150; i <= 156; i++) {
  ASCIIList.push(String.fromCharCode(i));
}
for (let i = 159; i <= 159; i++) {
  ASCIIList.push(String.fromCharCode(i));
}
for (let i = 161; i <= 255; i++) {
  ASCIIList.push(String.fromCharCode(i));
}

// cria json capaz de converter cada caractere para seu número correspondendete
let ASCII = {};
for (let i = 0; i < ASCIIList.length; i++) {
  let letter = ASCIIList[i];
  ASCII[letter] = i;
}

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

  if (parseFloat(inputAHTML.value) > 0) {
    funcType = "Quad Positiva";
  }
  else if (parseFloat(inputAHTML.value) < 0) {
    funcType = "Quad Negativa";
  }
  else {
    funcType = "Afim";
  }

  [aValue, bValue, cValue] = [parseFloat(inputAHTML.value), parseFloat(inputBHTML.value), parseFloat(inputCHTML.value)]; // obtem os valores inteiros de a, b e c

  delta = (bValue*bValue)-(4*aValue*cValue);
  
  if (inputAHTML.value === "0" && inputBHTML.value === "0") {
    alert("Os valores de 'a' e 'b' não podem ser simultaneamente 0.")
  }
  else if (inputHTML.value === "") {
    alert("A frase a criptografar não pode ser vazia.");
  }
  else {
    message = inputHTML.value.split('') // transforma palavra em array

    const result = encryptMessage(message);

    message = result[0];
    kValues = result[1];
    values = result[2];

    resultHTML.innerHTML = `<p>Sua mensagem criptografada: <strong>${message}</strong></p>`
  }
  return;
} 

const encryptMessage = (messageToEncryptInChar) => {
  const kValues = new Array(messageToEncryptInChar.length);
  const values = new Array(messageToEncryptInChar.length);
  let messageResult = "";

  // percorrendo a mensagem à criptografar
  for (let i = 0; i < messageToEncryptInChar.length; i++) {
    let xValue = ASCII[messageToEncryptInChar[i]]; // obtem o número associado ao caractere

    let yValue = (aValue*xValue*xValue)+(bValue*xValue)+(cValue); // encontra o valor de y da função do segundo grau

    kValues[i] = Math.floor(yValue/(Object.keys(ASCII).length)); // encontra o valor de k para cada elemento
    values[i] = yValue-(kValues[i]*(Object.keys(ASCII).length)); // obtem novos valores, que representarão as letras criptografadas
    messageResult += ASCIIList[values[i]]; // converte valor em letras criptografadas

  }
  return [messageResult, kValues, values];
}

const decrypt = () => {
  if (message != "") {
    wordDecrypt = decryptMessage();
    resultHTML.innerHTML = `<p>Sua mensagem descriptografada: <strong>${wordDecrypt}</strong></p>`;
    message = "";
    return;
  }
  else if (wordDecrypt != "") {
    resultHTML.innerHTML = `<p>Sua mensagem descriptografada: <strong>${wordDecrypt}</strong></p>`;
    return;
  }
  return;
}

const decryptMessage = () => {
  let messageResult = "";

  for (let i = 0; i < message.length; i++) {
    values[i] += kValues[i]*(Object.keys(ASCII).length);

    values[i] = inverseFunction(values[i]);

    messageResult += ASCIIList[values[i]];
  }

  return messageResult;
}

const inverseFunction = (xValue) => {
  delta = (bValue*bValue)-(4*aValue*(cValue-xValue));
  let raizDelta = Math.sqrt(delta);

  if (funcType === "Afim") {
    return (xValue-cValue)/bValue;
  }
  else if (((-bValue+raizDelta)/(2*aValue)) === 0) {
    return (-bValue+raizDelta)/(2*aValue);
  }
  else if (((-bValue-raizDelta)/(2*aValue)) === 0) {
    return (-bValue-raizDelta)/(2*aValue);
  }
  else if (funcType === "Quad Positiva") {
    return (-bValue+raizDelta)/(2*aValue);
  }
  else if (funcType === "Quad Negativa") {
    return (-bValue-raizDelta)/(2*aValue);
  }
}