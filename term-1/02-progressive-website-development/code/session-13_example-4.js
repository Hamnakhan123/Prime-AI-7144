class MemoryStorage {
  #data = new Map();
  setItem(k, v) { this.#data.set(String(k), String(v)); }
  getItem(k) { return this.#data.has(k) ? this.#data.get(k) : null; }
  removeItem(k) { this.#data.delete(k); }
  get length() { return this.#data.size; }
}
const store = new MemoryStorage();

store.setItem('visits', 3);
console.log('visits + 1 =', store.getItem('visits') + 1, '(string!) ->', Number(store.getItem('visits')) + 1);

store.setItem('cart', { id: 7, qty: 2 });
console.log('object without JSON ->', store.getItem('cart'));

store.setItem('cart', JSON.stringify([{ id: 7, qty: 2 }]));
const cart = JSON.parse(store.getItem('cart'));
console.log('object with JSON    ->', cart[0].qty, 'items of product', cart[0].id);
console.log('missing key ->', store.getItem('nope'), '| keys stored:', store.length);
