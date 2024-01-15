import axios from 'axios'

export const bankingApi = {
    authenticate,
    // signup
    getUser,
    logout,
    getTransactions,
    withdraw,
    deposit,
    transfer
}

function authenticate(username, password) {
    return instance.post('/api/v1/login', { username, password }, {
      headers: { 'Content-type': 'application/json' }
    })
  }

//   function signup(user) {
//     return instance.post('/auth/signup', user, {
//       headers: { 'Content-type': 'application/json' }
//     })
//   }

function getUser(user) {
  const url = "/api/v1/users/me";
  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  });
}

function logout() {
  return instance.post('/api/v1/logout', null , {
    withCredentials: true
  })
}

function getTransactions(bankAccountId) {
  const url = `/api/v1/bank-accounts/${bankAccountId}/history`;

  return instance.get(url, {
    withCredentials: true
  });
}

function withdraw(bankAccountId, amount) {
  return instance.post('api/v1/bank-accounts/withdraw', {
    'bankAccountId' : bankAccountId,
    'amount': amount
  }, {
    withCredentials: true
  })

}

function deposit(bankAccountId, amount) {
  return instance.post('api/v1/bank-accounts/deposit', {
    'bankAccountId' : bankAccountId,
    'amount': amount
  }, {
    withCredentials: true
  })
}

function transfer(fromAccountId, toAccountId, amount) {
  return instance.post('/api/v1/bank-accounts/transfer', {
    'fromBankAccountId' : fromAccountId,
    'toBankAccountId' : toAccountId,
    "amount": amount
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

