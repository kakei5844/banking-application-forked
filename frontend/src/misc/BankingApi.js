import axios from 'axios'

export const bankingApi = {
  authenticate,
  register,
  logout,
  getUser,
  getTransactions,
  withdraw,
  deposit,
  transfer,
  getCreditCardTransactions,
  applyCreditCard,
  getBill,
  getLatestBill,
  getAllBill,
  payBill
}

// -- User Management
function authenticate(username, password) {
  return instance.post('/api/v1/login', { username, password }, {
    withCredentials: true,
    headers: { 'Content-type': 'application/json' }
  })
}

function register(user) {
  return instance.post('/api/v1/register', user, {
    headers: { 'Content-type': 'application/json' }
  })
}

function logout() {
  return instance.post('/api/v1/logout', null, {
    withCredentials: true
  })
}

// -- Get User Details (Bank Account and Credit Card Details as well)
function getUser() {
  const url = "/api/v1/users/me";
  return instance.get(url, {
    withCredentials: true
  });
}

// -- Bank Account Features
function getTransactions(bankAccountId, user) {
  const url = `/api/v1/bank-accounts/${bankAccountId}/history`;

  return instance.get(url, {
    withCredentials: true
  });
}

function withdraw(bankAccountNumber, amount) {
  return instance.post('api/v1/bank-accounts/withdraw', {
    'bankAccountNumber': bankAccountNumber,
    'amount': amount
  }, {
    withCredentials: true
  })

}

function deposit(bankAccountNumber, amount) {
  return instance.post('api/v1/bank-accounts/deposit', {
    'bankAccountNumber': bankAccountNumber,
    'amount': amount
  }, {
    withCredentials: true
  })
}

function transfer(fromBankAccountNumber, toBankAccountNumber, amount) {
  return instance.post('/api/v1/bank-accounts/transfer', {
    'fromBankAccountNumber': fromBankAccountNumber,
    'toBankAccountNumber': toBankAccountNumber,
    "amount": amount
  }, {
    withCredentials: true
  })
}

// -- Credit Card Features
function getCreditCardTransactions(creditCardId, user) {
  const url = `/api/v1/credit-cards/${creditCardId}/history`;

  return instance.get(url, {
    withCredentials: true
  });
}

function applyCreditCard(annualSalary, cardType, user) {
  return instance.post('/api/v1/credit-cards/apply', {
    'annualSalary': annualSalary,
    'cardType': cardType
  }, {
    withCredentials: true
  })
}

// -- Bill Management
function getBill(creditCardId, user) {
  const url = `/api/v1/bills/credit-card/${creditCardId}`;

  return instance.get(url, {
    withCredentials: true
  });
}

function getLatestBill(creditCardId, user) {
  const url = `/api/v1/bills/credit-card/${creditCardId}`;

  return instance.get(url, {
    withCredentials: true
  });
}

function getAllBill(creditCardId, user) {
  const url = `/api/v1/bills/credit-card/${creditCardId}/latest`;

  return instance.get(url, {
    withCredentials: true
  });
}

function payBill(creditCardId, bankAccountNumber, amount, user) {
  return instance.post('/api/v1/bills/payment', {
    'creditCardId': creditCardId,
    'bankAccountNumber': bankAccountNumber,
    'amount': amount
  }, {
    withCredentials: true
  })
}

// -- Axios
const instance = axios.create({
  baseURL: "http://localhost:8080"
})

// -- Helper functions

function basicAuth(user) {
  return `Basic ${user.authdata}`
}

