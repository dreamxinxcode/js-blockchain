const SHA256 = require("crypto-js/sha256");

class Block {
  constructor (index, timestamp, data, previousHash='') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.index + this.timestamp + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  constructor () {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, '11/21/2020', 'Genisis Block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

const coin = new Blockchain();

coin.addBlock(new Block(1, '11/22/2020', { amount: 2 }));
coin.addBlock(new Block(2, '11/23/2020', { amount: 32 }));
coin.addBlock(new Block(3, '11/24/2020', { amount: 4 }));
coin.addBlock(new Block(4, '11/25/2020', { amount: 51 }));

console.log(coin);
