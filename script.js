const validCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

function scramble() {
  const textInput = document.getElementById('text-input').value;
  const keyInput = document.getElementById('key-input').value;
  const resultTextarea = document.getElementById('output');

  const scrambledText = encryptText(textInput, keyInput);
  resultTextarea.value = scrambledText;
}

function decrypt() {
  const textInput = document.getElementById('text-input').value;
  const keyInput = document.getElementById('key-input').value;
  const resultTextarea = document.getElementById('output');

  const decryptedText = decryptText(textInput, keyInput);
  resultTextarea.value = decryptedText;
}

function encryptText(text, key) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    // Skip characters that are not in the validCharacters string
    if (!validCharacters.includes(char)) {
      result += char;
      continue;
    }

    const keyChar = key[i % key.length];
    const keyIndex = validCharacters.indexOf(keyChar);

    const encryptedIndex = (validCharacters.indexOf(char) + keyIndex) % validCharacters.length;
    result += validCharacters[encryptedIndex];
  }
  return result;
}

function decryptText(encryptedText, key) {
  let result = '';
  for (let i = 0; i < encryptedText.length; i++) {
    const char = encryptedText[i];

    // Skip characters that are not in the validCharacters string
    if (!validCharacters.includes(char)) {
      result += char;
      continue;
    }

    const keyChar = key[i % key.length];
    const keyIndex = validCharacters.indexOf(keyChar);

    const decryptedIndex = (validCharacters.indexOf(char) - keyIndex + validCharacters.length) % validCharacters.length;
    result += validCharacters[decryptedIndex];
  }
  return result;
}
