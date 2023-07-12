const validCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~áéíóúñ';

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

// Add a click event listener to the document to close the copy button popup when clicked outside
document.addEventListener('click', function (event) {
  if (!event.target.closest('.copy-button') && !event.target.closest('.copy-popup-content')) {
    hideCopyOptions();
  }
});

// Function to show the copy button popup
function showCopyOptions() {
  document.getElementById('copyPopupOverlay').style.display = 'flex';
}

// Function to hide the copy button popup
function hideCopyOptions() {
  document.getElementById('copyPopupOverlay').style.display = 'none';
}

// Function to toggle the selected options
function toggleOption(option) {
  const checkbox = document.getElementById(`option-${option}`);
  checkbox.checked = !checkbox.checked;
}

// Function to copy the selected options
function copySelectedOptions() {
  const link = 'goofer.xyz/';
  const key = document.getElementById('key-input').value;
  const output = document.getElementById('output').value;

  const selectedOptions = [];
  const options = document.querySelectorAll('.copy-popup-content .option input[type="checkbox"]');
  options.forEach((option) => {
    if (option.checked) {
      selectedOptions.push(option.id.split('-')[1]);
    }
  });

  let textToCopy = '';
  selectedOptions.forEach((option) => {
    if (option === 'link') {
      textToCopy += link + '\n';
    } else if (option === 'key') {
      textToCopy += key + '\n';
    } else if (option === 'output') {
      textToCopy += output + '\n';
    }
  });

  navigator.clipboard.writeText(textToCopy.trim())
    .then(() => {
      alert('Copied:\n' + textToCopy);
      hideCopyOptions();
    })
    .catch((error) => {
      console.error('Error copying text:', error);
    });
}
