const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.secp256k1.utils.randomPrivateKey();
console.log(`Private Key: `, toHex(privateKey));
const publicKey = secp.secp256k1.getPublicKey(privateKey);
console.log(`Public Key: `, toHex(publicKey));
// 20 of keccake256 of hash is use for eth public address
console.log(`Wallet: ${toHex(keccak256(privateKey.slice(1)).slice(-20))}`);

/****Use this Private Key [TESTING PURPOSE ONLY]****
 * Private Key:  a6efed452a89b0e77e2d04c676b2d2420e7e91647d7f8f0c7595b6572456e878
Public Key:  027194955c0df985899e872babd50458b5c5171128200b4e2f5ceeb6f1aa687ff4
Wallet: 2e2a0cae856bb87e4391a5b431a978716f87eae1

Private Key:  a19a2f96fd7fe97441354a394958f3096d1d4ae73e5547416cacd2291f2f9788
Public Key:  027137a47499b21b95814809fa9d84623ca904734b1c930b9fbd2bcb2e7042c966
Wallet: 760964ed364a41def6cdeae820cf8fca3649cd91

Private Key:  13c19dd3202c6c21cae97fea6f7e6e3f18bb0d4a8d1dbebf8015bbf2e5fa51b6
Public Key:  03a57b4e532b51ba73fc12ecdba65ff94622566f273c5a42370892ee0c1f7ac2b4
Wallet: a819eec5c8afcc2fc8c4354e15b5008efc120cfd
*/
