const express = require('express');
const router = express.Router();

const simpleJsonStore = require('simple-json-store');

const store = new simpleJsonStore('./data.json', { accounts: [] });
const store2 = new simpleJsonStore('./data2.json', { accountslog: [] });

router.get('/', function (req, res, next) {
    console.log('All accounts only.');
    next();
}, (req, res) => {
    res.json(store.get('accounts'));
});
  
router.post('/', (req, res) => {
    const accounts = store.get('accounts');

    var newAccount = {
        id: accounts.length > 0 ? (notes[notes.length - 1].id + 1) : 1,
        accountNumber: req.body.accountNumber,
        balance: req.body.balance
    };

    accounts.push(newAccount);
    store.set('accounts', accounts);

    res.json(store.get('accounts'));
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const accounts = store.get('accounts');
    const account = accounts.find(account => account.id == id);
    res.json(account);
});

//account withdraw
router.put('/withdraw/:id', (req, res) => {
    const id = req.params.id;
    const accounts = store.get('accounts');

    let account = {};
    
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].id == id) {
            accounts[i].balance = Number(accounts[i].balance) - Number(req.body.balance);
            account = accounts[i];
            break;
        }
    }

    store.set('accounts', accounts);

    res.json(account);
});

//account withdraw log
router.post('/withdraw/:id', (req, res) => {
  const accountslog = store2.get('accountslog');

  var newAccount = {
      id: req.body.id,
      accountNumber: req.body.accountNumber,
      name: req.body.name,
      amount: req.body.amount,
      status: 'withdraw',
      balance: req.body.balance
  };

  accountslog.push(newAccount);
  store2.set('accountslog', accountslog);

  res.json(store2.get('accountslog'));
});


//account deposit
router.put('/deposit/:id', (req, res) => {
    const id = req.params.id;
    const accounts = store.get('accounts');

    let account = {};
    
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].id == id) {
            accounts[i].balance = Number(accounts[i].balance) + Number(req.body.balance);
            account = accounts[i];
            break;
        }
    }
    store.set('accounts', accounts);

    res.json(account);
});

//account depositlog
router.post('/deposit/:id', (req, res) => {
  const accountslog = store2.get('accountslog');

  var newAccount = {
      id: req.body.id,
      accountNumber: req.body.accountNumber,
      name: req.body.name,
      amount: req.body.amount,
      status: 'deposit',
      balance: req.body.balance
  };

  accountslog.push(newAccount);
  store2.set('accountslog', accountslog);

  res.json(store2.get('accountslog'));
});

//transfer Account A
router.put('/transfer/:id', (req, res) => {
  const id = req.params.id;
  const accounts = store.get('accounts');

  let account = {};
  
  for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].id == id) {
          accounts[i].balance = Number(accounts[i].balance) - Number(req.body.balance);
          account = accounts[i];
          break;
      }
  }
  store.set('accounts', accounts);

  res.json(account);
});

//Account B
router.put('/transfer/:id', (req, res) => {
  const id = req.params.id;
  const accounts = store.get('accounts');

  let account = {};
  
  for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].id == id) {
          accounts[i].balance = Number(accounts[i].balance) + Number(req.body.balance);
          account = accounts[i];
          break;
      }
  }

  store.set('accounts', accounts);

  res.json(account);
});

//account transferlog
router.post('/transfer/:id', (req, res) => {
  const accountslog = store2.get('accountslog');

  var newAccount = {
      id: req.body.id,
      accountNumber: req.body.accountNumber,
      name: req.body.name,
      amount: req.body.amount,
      status: 'transfer',
      balance: req.body.balance
  };

  accountslog.push(newAccount);
  store2.set('accountslog', accountslog);

  res.json(store2.get('accountslog'));
});

module.exports = router;