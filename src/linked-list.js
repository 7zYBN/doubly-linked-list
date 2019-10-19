const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        const node = new Node(data);
        if (!this.length) {
            this._head = node;
        } else {
            this._tail.next = node;
            node.prev = this._tail;
        }
        this._tail = node;
        this.length ++;

        return this;
    }

    head() {
        return (this._head) ? this._head.data : null;
    }

    tail() {
        return (this._tail) ? this._tail.data : null;
    }

    at(index) {
        if (this._indexIsValid(index)) {
            let result = this._head;

            for (let i = 0; i < index; i++) {
                result = result.next;
            }

            return result.data;
        }
    }

    insertAt(index, data) {
        if (this._indexIsValid(index)) {
            let node = this._head;

            for (let i = 0; i < index; i++) {
                node = node.next;
            }

            if (node) {
                let newNode = new Node(data, node.prev, node);
                (node.prev) ? (node.prev.next = newNode) : (this._head = newNode);
                node.prev = newNode;
            } else {
                let newNode = new Node(data);
                this._head = newNode;
                this._tail = newNode;
            }

            this.length ++;

            return this;
        }
    }

    isEmpty() {
        return (!this._head);
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;

        return this;
    }

    deleteAt(index) {
        if (this._indexIsValid(index)) {
            let node = this._head;

            for (let i = 0; i < index; i++) {
                node = node.next;
            }

            (node.next) ? (node.next.prev = node.prev) : (this._tail = node.prev);
            (node.prev) ? (node.prev.next = node.next) : (this._head = node.next);
            this.length --;

            return this;
        }
    }

    reverse() {
        let node = this._head;

        for (let i = 0; i < this.length; i++) {
            let buffNext = node.next;
            node.next = node.prev;
            node.prev = buffNext;

            if (!node.next) {
                this._tail = node;
            }

            if (!node.prev) {
                this._head = node;
            }

            node = buffNext;
        }

        return this;
    }

    indexOf(data) {
        let node = this._head;

        for (let index = 0; index < this.length; index++) {

            if (node.data === data) {
                return index;
            }

            node = node.next;
        }

        return -1;
    }

    _indexIsValid(index) {
        const error = 'Incorrect index';

        if (index > this.length || index < 0) {
            throw error;
        }
        
        return true;
    }
}

module.exports = LinkedList;
