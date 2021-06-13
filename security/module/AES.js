import crypto from "crypto";
const IV_LENGTH = 16
const ALGORITHM_AES = 'aes-256-cbc'
const ALGORITHM_MAC = 'sha256'
const defaultKey  = process.env.APP_KEY
export class AES {
  constructor(value, key, iv) {
    this.value = value;
    this.key = key;
    this.iv = iv;
  }
  setKey(key) {
    this.key = key;
    return this;
  }
  setIV(iv) {
    this.iv = iv;
    return this;
  }
  setValue(value) {
    this.value = value;
    return this;
  }
  encrypt() {
    if(!this.iv)this.iv = crypto.randomBytes(IV_LENGTH)
    let cipher = crypto.createCipheriv(ALGORITHM_AES, new Buffer(this.key||defaultKey), this.iv, 'Pkcs7');
    let encrypted = cipher.update(this.value);
    return Buffer.concat([encrypted, cipher.final()]);
  }
  decrypt() {
    let iv = arrayToBuffer(this.iv);
    let encryptedText = new Buffer(this.value, "utf-8");
    let decipher = crypto.createDecipheriv(ALGORITHM_AES, new Buffer(key||defaultKey), iv, 'Pkcs7');
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted;
  }
  creactMac(data,key){
    let d = data.toString()
    let hmac = crypto.createHmac(ALGORITHM_MAC,Buffer.from(key))
    let mac = hmac.update(d)
    return mac
  }
}
