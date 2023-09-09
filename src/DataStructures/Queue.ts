interface Node {
    row: number
    col: number
}

interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    size(): number;
    includes(item: Node): boolean
  }
  
  export class Queue<T extends Node> implements IQueue<T> {
    private storage: T[] = [];
  
    constructor(private capacity: number = Infinity) {}
  
    enqueue(item: T): void {
      if (this.size() === this.capacity) {
        throw Error("Queue has reached max capacity, you cannot add more items");
      }
      this.storage.push(item);
    }
    dequeue(): T | undefined {
      return this.storage.shift();
    }
    size(): number {
      return this.storage.length;
    }
    isEmpty() : boolean {
      return this.size() == 0
    }
    private isEqual (node1: Node, node2: Node): boolean {
      return node1.row === node2.row && node1.col === node2.col
    }

    includes(item: Node): boolean{
     for (const queueItem of this.storage) {
      if(this.isEqual(queueItem, item)) {
        return true
      }
     }
     return false
      }



    }
  
