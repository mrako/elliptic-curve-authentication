from nacl.signing import SigningKey
from nacl.encoding import Base64Encoder, HexEncoder, RawEncoder

import base58
from os import urandom

key_seed = urandom(32)
private_key = SigningKey(key_seed)
public_key = private_key.verify_key



# privKey, pubKey = ed25519.create_keypair()
print("Private key (32 bytes):", private_key.encode(encoder=HexEncoder))
print("Public key (32 bytes): ", public_key.encode(encoder=HexEncoder))

pubB58 = base58.b58encode(public_key.encode(encoder=RawEncoder))
print("Base58 encoded public key:", pubB58)

msg = b'Message for Ed25519 signing'
signature = private_key.sign(msg, encoder=Base64Encoder)

print("Signature (64 bytes):", signature)

try:
    public_key.verify(msg, Base64Encoder.decode(signature.signature))
    print("The signature is valid.")
except:
    print("Invalid signature!")
