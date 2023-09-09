interface Node {
    x: number
    y: number
}

export interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
    isEmpty(): T | boolean
    includes(item: T): boolean
}

export class Stack<T extends Node> implements IStack<T> {
    
     storage: T[] = [];

    constructor(private capacity: number = Infinity) {}

    push(item: T): void {
        if (this.size() === this.capacity) {
            throw Error("Stack has reached max cap.")
        }
        this.storage.push(item)
    }

    pop(): T | undefined {
        return this.storage.pop()
    }

    peek(): T | undefined {
        return this.storage[this.size() -1]
    }

    size(): number {
        return this.storage.length
    }

    isEmpty(): boolean | T {
        return this.size() == 0
    }
    
    includes(item: T): boolean {
        return this.storage.some((existingItem) => {
            return (
                existingItem.x === item.x && 
                existingItem.y === item.y
            )
        })
    }
}