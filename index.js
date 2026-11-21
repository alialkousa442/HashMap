class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.capacity).fill(null);
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.capacity;
    }
    return hashCode;
  }
  set(key, value) {
    let index = this.hash(key);
    if (index < 0 || index >= this.buckets.length)
      throw new Error("Trying to access index out of bounds");
    if (this.buckets[index] == null) this.buckets[index] = new Node(key, value);
    else {
      let current = this.buckets[index];
      while (current) {
        if (current.key === key) {
          current.value = value;
          return;
        }
        if (current.next == null) {
          current.next = new Node(key, value);
          return null;
        }
        current = current.next;
      }
    }
  }
  get(key) {
    let index = this.hash(key);
    if (index < 0 || index >= this.buckets.length)
      throw new Error("Trying to access index out of bounds");
    let current = this.buckets[index];
    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    return null;
  }
  has(key) {
    return this.get(key) !== null;
  }
  remove(key) {
    let index = this.hash(key);
    if (index < 0 || index >= this.buckets.length)
      throw new Error("Trying to access index out of bounds");
    if (this.buckets[index] === null) return false;
    if (this.buckets[index].key === key) {
      this.buckets[index] = this.buckets[index].next;
      return true;
    }
    let previous = this.buckets[index];
    let current = previous.next;
    while (current) {
      if (current.key === key) {
        previous.next = current.next;
        return true;
      }
      previous = current;
      current = current.next;
    }
    return false
  }
}
class Node {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}
