class Account {
  static bank = 'Prime Bank';
  static #count = 0;
  #balance = 0;
  history = [];

  constructor(owner) { this.owner = owner; Account.#count++; }
  deposit(amount) {
    if (amount <= 0) throw new RangeError('Deposit must be positive');
    this.#balance += amount; this.#log('deposit', amount); return this;
  }
  withdraw(amount) {
    if (amount > this.#balance) throw new Error('Insufficient funds', { cause: { balance: this.#balance, amount } });
    this.#balance -= amount; this.#log('withdraw', amount); return this;
  }
  #log(type, amount) { this.history.push(`${type}:${amount}`); }
  get balance() { return this.#balance; }
  static get count() { return Account.#count; }
  static isAccount(obj) { return #balance in obj; }
}

const a = new Account('Sara').deposit(5000).withdraw(1200);
console.log(Account.bank, '|', a.owner, 'balance', a.balance, '|', a.history.join(', '));
try { a.withdraw(99999); } catch (e) { console.log(e.message, e.cause); }
console.log('accounts created:', Account.count, '| isAccount:', Account.isAccount(a), Account.isAccount({}));
console.log('a.balance is read-only via getter; a["#balance"] =', a['#balance']);
