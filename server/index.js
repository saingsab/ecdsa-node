const secp = require("ethereum-cryptography/secp256k1");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "027194955c0df985899e872babd50458b5c5171128200b4e2f5ceeb6f1aa687ff4": 100,
  "027137a47499b21b95814809fa9d84623ca904734b1c930b9fbd2bcb2e7042c966": 50,
  "03a57b4e532b51ba73fc12ecdba65ff94622566f273c5a42370892ee0c1f7ac2b4": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  
  const { signature, recipient, amount } = req.body;
  let balanceKeys = Object.keys(balances);
  // Verify sender
  for(let i = 0; i < balanceKeys.length; i++) {
    const verify = secp.secp256k1.verify(secp.secp256k1.Signature.fromCompact(signature), "", balanceKeys[i])
    if(verify){
      setInitialBalance(balanceKeys[i]);
      setInitialBalance(recipient);
      if (balances[balanceKeys[i].trim()] < amount) {
        res.status(400).send({ message: "Not enough funds!" });
      } else {
        balances[balanceKeys[i]] -= amount;
        balances[recipient] += amount;
        res.send({ balance: balances[balanceKeys[i]] });
      }
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
