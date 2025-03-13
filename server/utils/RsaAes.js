const NodeRSA = require("node-rsa");
const crypto = require("crypto");

const RsaAes = (privatePem, encryptedAesKey, encryptedData, iv) => {
  var decrypt = new NodeRSA(privatePem, "pkcs8-private-pem");
  decrypt.setOptions({ encryptionScheme: "pkcs1" });
  // 1. RSA解密AES密钥
  const aesKey = decrypt.decrypt(encryptedAesKey, "utf8");
  // 2. AES解密数据
  const decipher = crypto.createDecipheriv(
    "aes-128-cbc",
    Buffer.from(aesKey, "hex"),
    // Buffer.alloc(16, 0) // 需与前端IV一致
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  const { password } = JSON.parse(decrypted);
  return { password };
};

module.exports = { RsaAes };
