import CryptoJS from "crypto-js";
import JSEncrypt from "jsencrypt";

// RSA加密AES密钥
export const rsaEncrypt = (data, publicKey) => {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);
  return encryptor.encrypt(data);
};

// AES加密数据
export const aesEncrypt = (data, aesKey) => {
  const iv = CryptoJS.enc.Hex.parse(
    CryptoJS.lib.WordArray.random(16).toString()
  );
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    CryptoJS.enc.Hex.parse(aesKey),
    { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );
  return {
    iv: iv.toString(),
    ciphertext: encrypted.ciphertext.toString()
  };
};

// 生成随机AES密钥
export const generateAesKey = () => {
  return CryptoJS.lib.WordArray.random(16).toString();
};

export const RasAes = (data, pubKey) => {
  // 1. 生成AES密钥
  const aesKey = generateAesKey();

  // 2. RSA加密AES密钥
  const encryptedAesKey = rsaEncrypt(aesKey, pubKey);

  // 3. AES加密数据
  const { iv, ciphertext } = aesEncrypt(data, aesKey);

  return { encryptedAesKey, iv, ciphertext };
};
