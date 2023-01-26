/* eslint-disable no-console */

import fetch from 'cross-fetch';

import { eddsa as EdDSA } from 'elliptic';

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:9000';

const key = 'HJkJwUuw26peqMiPtut7FFdFXmoqoM7F7HF8E7PLUaDM';
const priv = 'D03A7C0204D92FB9AD83CEDF1B15D712570BDEBA1D0D5793814A2DC594F75D1D';

const format = (params: any) => {
  return Buffer.from(JSON.stringify(params)).toString('hex');
};

const sign = (params: any, privateKey: any) => {
  const ec = new EdDSA('ed25519');
  const key = ec.keyFromSecret(privateKey);

  return key.sign(format(params)).toHex();
};

(async () => {
  const params = { flash: 'thunder' };

  const signature = sign(params, priv);

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: { key, signature, 'Content-Type': 'application/json' },
  });

  console.log(await response.json());
})();
