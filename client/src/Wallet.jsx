import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey, signature, setSignature}) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address = toHex(secp.secp256k1.getPublicKey(privateKey));
    setAddress(address);
    signature = secp.secp256k1.sign("", privateKey).toCompactHex();
    setSignature(signature);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type an Private Key" value={privateKey} onChange={onChange}></input>
      </label>

      <div className="wallet">wallet: {address}</div>
      <div className="Signature">signature: {signature}</div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;