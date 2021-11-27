# @dotred/crypto-pay

* **Crypto Pay** is a payment system based on [@CryptoBot](http://t.me/CryptoBot), which allows you to accept
  payments    
  in cryptocurrency using the API.
* **@dotred/crypto-pay** - is a wrapper over the Crypto Pay API, which makes it easier to interact with the API

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

First, you need to create your application and get an API token. Open [@CryptoBot](http://t.me/CryptoBot?start=pay)    
or [@CryptoTestnetBot](http://t.me/CryptoTestnetBot?start=pay) (for testnet), send a command `/pay` to create a new
app    
and get API Token.

### 3. Creating pay-instance

To start interacting with the API, you need to create a pay-instance. To do this, import the standard method from
the    
library and call it by passing the previously received token

```ts import createPayInstance from '@dotred/crypto-pay';    
 const instance = createPayInstance('your_token');
// If you want to use Testnet, you must pass the network type as the second parameter 
const instance = createPayInstance('your_token', 'test');   
```   

### 4. Using example

Let's create some invoices and get only BTC invoices

```ts  
import createPayInstance, { Asset } from '@dotred/crypto-pay';

const instance = createPayInstance('3138:AAGcw73KFgcqcQ2Sl4sktL2WHuUgAvPpWKh', 'test');
const workWithInvoices = async () => {
  await instance.createInvoice({ asset: Asset.BTC, amount: '0.00005', });
  await instance.createInvoice({ asset: Asset.BTC, amount: '0.000045', });
  await instance.createInvoice({ asset: Asset.TON, amount: '12', });
  const invoices = await instance.getInvoices({ asset: Asset.BTC });
  console.log(invoices);
}

workWithInvoices().then().catch();   
```   

### 5. API Reference

All methods are asynchronous (exception: *createPayInstance*)

#### createPayInstance (Default export)

Use this method to create a new pay-instance. Returns an object containing all the methods listed below

- **token** (string)    
  Your application token
- **net** ("main" | "test")    
  Net type. "main" - Mainnet, "test" - "Testnet"

#### getMe

A simple method for testing your app's authentication token. Requires no parameters. Returns basic information about the
app.

#### createInvoice

Use this method to create a new invoice. Returns object of created invoice.

- **asset** (string)      
  Currency code. Supported assets: BTC, TON, ETH (only testnet), USDT, USDC, BUSD.
- **amount** (string)      
  Amount of the invoice in float. For example: `125.50`
- **description** (string)      
  _Optional._ Description of the invoice. Up to 1024 symbols.
- **paid_btn_name** (string) default - callback      
  _Optional._ Paid button name. This button will be shown when your invoice was paid. Supported names:        viewItem -
  View Item  
  openChannel - Open Channel  
  openBot - Open Bot  
  callback - Return

- **paid_btn_url** (string)      
  _Optional but requried when you use paid_btn_name._ Paid button URL. You can set any payment success link (for example
  link on your bot). Start with https or http.
- **payload** (string, up to 1kb)      
  _Optional._ Some data. User ID, payment id, or any data you want to attach to the invoice.

#### getInvoices

Use this method to get invoices of your app. On success, the returns array of invoices.

- asset (Asset)      
  _Optional._ Currency code. Supported assets: BTC, TON, ETH (only testnet), USDT, USDC, BUSD. Default: all assets.
- invoice_ids (Array<string | number>)      
  _Optional._ Array of strings, numbers, or numbers and strings together.
- status (Status)      
  _Optional._ Status of invoices. Available statusses: active or paid. Default: all statusses.
- offset (number)      
  _Optional._ Offset needed to return a specific subset of invoices. Default 0.
- count (number)      
  _Optional._ Number of invoices to return. Default 100, max 1000.

#### getPayments

Use this method to get paid and unconfirmed invoices of your app. On success, the returns array of paid and  
unconfirmed    
invoices.

- offset (number)      
  _Optional._ Offset needed to return a specific subset of invoices. Default 0.
- count (number)      
  _Optional._ Number of invoices to return. Default 100, max 1000.

#### confirmPayment

Use this method to confirm paid invoice of your app. On success, the return confirmed invoice.

- invoice_id (number)      
  Invoice ID you want to confirm.

#### getBalance

Use this method to get balance of your app. Returns array of assets.

#### getExchangeRates

Use this method to get exchange rates of supported currencies. Returns array of currencies.

#### getCurrencies

Use this method to supported currencies. Returns array of currencies.

### 6. Types

#### Asset

enum: BTC, TON, ETH, USDT, USDC, BUSD

#### Status

enum: ACTIVE, PAID
