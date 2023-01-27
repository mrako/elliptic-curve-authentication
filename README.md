# Elliptic Curve Authentication

This is an example repository for setting up a passwordless authentication using [Elliptic Curves](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

See explanation of how it works from [Caleb Curry's Youtube](https://youtu.be/f9eitAS1nsY?t=105).

The basic idea is to **sign** the parameters sent to server using the **private key** and verified at the backend using the **public key**. This way backend can verify the message is authenticated using the **private key** (using the **signature** and the **public key**), but the **private key** is never exposed.

## Prerequisites

* [Docker](https://www.docker.com/products/docker-desktop/)
* [Nodejs](https://nodejs.org/en/download/)

## Creating a new keypair

```bash
cd python-key-generator
./run.sh
```

## Starting server

```bash
npm install
npm start
```

## Starting server (Docker)

```bash
docker build -t passwordless .
docker run -it -v $(pwd)/src:/app/src -p 9000:9000 passwordless
```

## Sending a signed request

```bash
export PUBLIC_KEY=<your public key>
export PRIVATE_KEY=<your private key>

npm install
ts-node request.ts
```
