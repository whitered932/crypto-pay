# @dotred/crypto-pay
* **Crypto Pay** is a payment system based on [@CryptoBot](http://t.me/CryptoBot), which allows you to accept payments in cryptocurrency using the API.
* **@dotred/crypto-pay** - @is a wrapper over the Crypto Bot API, which makes it easier to interact with the API
## Documentation
### 1. Installation
To install the library, you need to run the following commands:
1. if you are use npm -
```bash
npm install @dotred/crypto-pay
```
2. if you are use yarn -
```bash
yarn add @dotred/crypto-pay
```
### 2. Creating token
First, you need to create your application and get an API token. Open [@CryptoBot](http://t.me/CryptoBot?start=pay) or [@CryptoTestnetBot](http://t.me/CryptoTestnetBot?start=pay) (for testnet), send a command `/pay` to create a new app and get API Token.
###  3. Creating pay-instance
To start interacting with the API, you need to create a pay-instance. To do this, import the standard method from the library and call it by passing the previously received token
```ts
import createPayInstance from '@dotred/crypto-pay';

const instance = createPayInstance('your_token');

// If you want to use Testnet, you must pass the network type as the second parameter
const instance = createPayInstance('your_token', 'test');
```
### 4. Using example
Let's create some invoices and get only BTC invoices
```ts
import createPayInstance, {Asset} from '@dotred/crypto-pay/lib';  
  
const instance = createPayInstance('3138:AAGcw73KFgcqcQ2Sl4sktL2WHuUgAvPpWKh', 'test');  
const workWithInvoices = async () => {  
    await instance.createInvoice({  
        asset: Asset.BTC,  
        amount: '0.00005',  
    });  
    await instance.createInvoice({  
        asset: Asset.BTC,  
        amount: '0.000045',  
    });  
    await instance.createInvoice({  
        asset: Asset.TON,  
        amount: '12',  
    });  
    const invoices = await instance.getInvoices({asset: Asset.BTC});  
    console.log(invoices);  
}  
  
workWithInvoices().then().catch();
```
