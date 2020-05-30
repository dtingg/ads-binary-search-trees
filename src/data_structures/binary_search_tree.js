class BSTNode {
  constructor({ key, value, parent, left = null, right = null }) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(Node = BSTNode) {
    this.Node = Node;
    this._count = 0;
    this._root = undefined;
  }

  search(key) {
    let node = this._root;

    while (node) {
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else if (key == node.key) {
        return node;
      } else {
        return undefined;
      }
    }
  }

  insert(key, value = true) {
    let current_node = this._root;

    if (current_node === undefined) {
      const new_node = new this.Node({ key: key, value: value, parent: null });
      this._count += 1;
      this._root = new_node;
    }

    while (current_node) {
      if (key < current_node.key) {
        if (current_node.left) {
          current_node = current_node.left;
        } else {
          const new_node = new this.Node({ key: key, value: value, parent: current_node});
          current_node.left = new_node;
          this._count += 1;
          return;
        }
      } else if (key > current_node.key) {
        if (current_node.right) {
          current_node = current_node.right;
        } else {
          const new_node = new this.Node({ key: key, value: value, parent: current_node });
          current_node.right = new_node;
          this._count += 1;
          return;
        }
      } else {
        current_node.value = value;
        return;
      }
    }
  }

  lookup(key) {
    let node = this.search(key)

    if (node) {
      return node.value
    } else {
      return node;
    }
  }

  delete(key) {
    let target_node = this.search(key);

    if (target_node) {
      this._count -= 1;
    }

    return target_node.value;
  }

  count() {
    return this._count;
  }

  forEach(callback) {
    // This is a little different from the version presented in the video.
    // The form is similar, but it invokes the callback with more arguments
    // to match the interface for Array.forEach:
    //   callback({ key, value }, i, this)
    const visitSubtree = (node, callback, i = 0) => {
      if (node) {
        i = visitSubtree(node.left, callback, i);
        callback({ key: node.key, value: node.value }, i, this);
        i = visitSubtree(node.right, callback, i + 1);
      }
      return i;
    }
    visitSubtree(this._root, callback)
  }
}

export default BinarySearchTree;