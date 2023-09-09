class PriorityQueue {
    constructor(comparator) {
      this.elements = [];
      this.comparator = comparator;
    }
  
    enqueue(element) {
      this.elements.push(element);
      this.elements.sort(this.comparator);
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return null;
      }
      return this.elements.shift();
    }
  
    isEmpty() {
      return this.elements.length === 0;
    }
  }