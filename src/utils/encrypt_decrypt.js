const CryptoJS = require("crypto-js");

const key = CryptoJS.enc.Utf8.parse("8y/B?E(H+MbQeThWmZq4t6w9z$C&F)J@");

const algorithm = {
  name: "AES",
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7,
};

function encryptString(text) {
  const encryptedBytes = CryptoJS.AES.encrypt(text, key, algorithm);
  return encryptedBytes.toString();
}
function decryptString(encryptedText) {
  const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedText);
  const decryptedBytes = CryptoJS.AES.decrypt(
    { ciphertext: encryptedBytes },
    key,
    algorithm
  );
  return decryptedBytes.toString(CryptoJS.enc.Utf8);
}

export { encryptString, decryptString };
