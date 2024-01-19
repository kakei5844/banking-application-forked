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
function getUser(user) {
  const url = "/api/v1/users/me";
  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  });
}

// -- Bank Account Features
function getTransactions(bankAccountId, user) {
  const url = `/api/v1/bank-accounts/${bankAccountId}/history`;

  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  });
}

function withdraw(bankAccountNumber, amount, user) {
  return instance.post('api/v1/bank-accounts/withdraw', {
    'bankAccountNumber': bankAccountNumber,
    'amount': amount
  }, {
    headers: { 'Authorization': basicAuth(user) }
  })

}

function deposit(bankAccountNumber, amount, user) {
  return instance.post('api/v1/bank-accounts/deposit', {
    'bankAccountNumber': bankAccountNumber,
    'amount': amount
  }, {
    headers: { 'Authorization': basicAuth(user) }
  })
}

function transfer(fromBankAccountNumber, toBankAccountNumber, amount, user) {
  return instance.post('/api/v1/bank-accounts/transfer', {
    'fromBankAccountNumber': fromBankAccountNumber,
    'toBankAccountNumber': toBankAccountNumber,
    "amount": amount
  }, {
    headers: { 'Authorization': basicAuth(user) }
  })
}

// -- Credit Card Features
function getCreditCardTransactions(creditCardId, user) {
  const url = `/api/v1/credit-cards/${creditCardId}/history`;

  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  });
}

function applyCreditCard(annualSalary, cardType, user) {
  return instance.post('/api/v1/credit-cards/apply', {
    'annualSalary': annualSalary,
    'cardType': cardType
  }, {
    headers: { 'Authorization': basicAuth(user) }
  })
}

// -- Bill Management
function getBill(creditCardId, user) {
  const url = `/api/v1/bills/credit-card/${creditCardId}`;

  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  });
}

function getLatestBill(creditCardId, user) {
  const url = `/api/v1/bills/credit-card/${creditCardId}`;

  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  });
}

function getAllBill(creditCardId, user) {
  const url = `/api/v1/bills/credit-card/${creditCardId}/latest`;

  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  });
}

function payBill(creditCardId, bankAccountNumber, amount, user) {
  return instance.post('/api/v1/bills/payment', {
    'creditCardId': creditCardId,
    'bankAccountNumber': bankAccountNumber,
    'amount': amount
  }, {
    headers: { 'Authorization': basicAuth(user) }
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

