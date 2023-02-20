import Node from './node.js';

class Tree {
    constructor(array) {
        this.array = array;
        this.root = buildTree(this.array);
    }

    buildTree(array) {
        if (array.length === 0) return null;
        let midIndex = Math.floor(array.length / 2);
        const newNode = new Node(array[midIndex]);
        
        const firstHalf = array.slice(0, midIndex);
        const secondHalf = array.slice(midIndex + 1);
        newNode.left = this.buildTree(firstHalf);
        newNode.right = this.buildTree(secondHalf);

        return newNode;
    }

    //inserts data into tree
    insert(data) {
        if(this.root) {     //check to see if we have root node
            this.root.insert(data);
        }
        else {
            this.root = new Node(data);
        }
    }

    //deletes data from tree
    delete(data) {
        if(this.root) {
            this.root = this.root.delete(data);
        }
    }

    //find data from tree
    find(data) {
        if(this.root) {
            return this.root.find(data);
        }
        return false;
    }

    //traverse tree in breadth-first level order returning an array of BST values
    levelOrder() {
        if(this.root) {
            return this.root.levelOrderNode(this.root.displayNodeData);
        }
    }

    inorder() {
        if(this.root) {
            this.root.inorder(this.root);
        }
    }

    preorder() {
        if(this.root) {
            this.root.preorder(this.root);
        }
    }

    postorder() {
        if(this.root) {
            this.root.postorder(this.root);
        }
    }

    findHeight() {
        if(this.root) {
            return this.root.findHeight(this.root);
        }
        return -1;
    }

    findDepth(nodeData) {
        if(!this.root) {
            return -1;
        } else return this.root.findDepthNode(nodeData);
    }

    isBalanced() {
        if(this.root) {
            return this.root.isBalancedNode(this, this.root);
        }
    }

    rebalance() {
        if(!this.root) {
            console.log("This tree is empty");
            return this;
        } else if (!this.isBalanced()) {
            const treeNodes = this.preorder();
            let balancedTree = new Tree(treeNodes);
            console.log(balancedTree);
            return balancedTree;
        } else {
            console.log("This tree is already balanced");
            return this;
        }
    }
}