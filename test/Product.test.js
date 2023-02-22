const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledProduct = require("../ethereum/build/Product.json");

let accounts;
let product;


beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  product = await new web3.eth.Contract(compiledProduct.abi)
    .deploy({ data: compiledProduct.evm.bytecode.object })
    .send({ from: accounts[0], gas: "1000000" })
});


describe("Product", () => {
  it('deploys a contract', () => {
    assert.ok(product.options.address);
  });

  it("marks caller as the product manager", async () => {
    const manager = await product.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("Add a product", async () => {
    const addProduct = await product.methods.createProduct("valami", "valami cucc", 2).send({
      from: accounts[0],
      gas: 1000000
    });
    const ownedProduct = await product.methods.ownedProduct(accounts[0], 0).call({
      from: accounts[0],
      gas: 1000000
    });

    assert.equal(ownedProduct.name, 'valami');
    assert.equal(ownedProduct.id, 0);
    assert.equal(ownedProduct.description, 'valami cucc');
    assert.equal(ownedProduct.unitprice, 2);
  });

  it("Count product number", async () => {
    const addProduct = await product.methods.createProduct("valami", "valami cucc", 2).send({
      from: accounts[0],
      gas: 1000000
    });
    const productCount = await product.methods.getProductCount().call({
      from: accounts[0],
      gas: 1000000
    });

    assert.equal(productCount, 1);
  });

});
