const SHA256 = require('crypto-js/SHA256');

class Block{
    constructor(timestamp, data, previousHash = ''){
      this.index = 0;
      this.timestamp = timestamp;
      this.data = data;
      this.previousHash = previousHash;
      this.hash = this.calculateHash();
    }

    calculateHash(){
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

}

class Blockchain{
  constructor(){
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock(){
    return new Block( "2/12/2018","Genesis Block", "0");
  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock){
    newBlock.index = this.getLatestBlock().index + 1;
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid(){

    for(let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];


      if(currentBlock.hash !== currentBlock.calculateHash()){
          return false;
      }

      if(currentBlock.previousHash !== previousBlock.hash){
          return false;
      }
    }
    return true;
  }
}

let putinCoin = new Blockchain();
putinCoin.addBlock(new Block( new Date() , { amount: 5 }));
putinCoin.addBlock(new Block(  new Date() , { amount: 10 }));

putinCoin.chain[1].data.amount = 6;
console.log('Is blockchain valid?' + ' ' + putinCoin.isChainValid())
