const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.secp256k1.utils.randomPrivateKey();
console.log(`Private Key: `, toHex(privateKey));
const publicKey = secp.secp256k1.getPublicKey(privateKey);
console.log(`Public Key: `, toHex(publicKey));
// 20 of keccake256 of hash is use for eth public address
console.log(`Wallet: ${toHex(keccak256(privateKey.slice(1)).slice(-20))}`);