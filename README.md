# Blockchain_Marketplace

## Installation

```sh
# Install Truffle globally`
$ npm install -g truffle
```
Start the react dev server.

```sh
open terminal and run Ganache-cli
open another terminal and run below commands:
$ cd client
$ npm install
$ npm start
  Starting the development server...
  Ensure that Metamask extension is enabled in browser
  Add new network in Metamask with RPC URL as dev server details http://127.0.0.1:8545 specified in truffle-config.js
  Import account (use first private key from addresses returned by Ganache-cli command) in Metamask newly added network
```
App shows two links..One for listing the available store items and buy option along with the shown item and
second for selling an item if any.For buying/selling item, payable addresses are used for supporting ownership transfer.
