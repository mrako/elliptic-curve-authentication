import bs58 from 'bs58';

import { eddsa as EdDSA } from 'elliptic';

export const verifySignature = (data: any, key: any, signature: any) => {
  const ec = new EdDSA('ed25519');

  const publicKey = ec.keyFromPublic(Buffer.from(bs58.decode(key)).toString('hex'));
  const message = Buffer.from(JSON.stringify(data)).toString('hex');

  return publicKey.verify(message, signature);
};

export const authMiddleware = async (ctx: any, next: any) => {
  const { key, signature } = ctx.request.headers;
  const { body } = ctx.request;

  if (!key || !signature || !body) {
    ctx.throw(404, JSON.stringify({ error: 'Params missing' }));
  }

  if (!verifySignature(body, key, signature)) {
    ctx.throw(401, JSON.stringify({ error: 'Unauthorized' }));
  }

  await next();
};

