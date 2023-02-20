class Node {
    constructor(data, left = null, right = null) {
        this.data = data; 
        this.left = left;
        this.right = right;
    }

    //insert data into tree
    insert(data) {
        if(this.data == data) {     //check for duplicates
            throw new Error("Data already exists within tree");
        }
        else if (this.data > data) {
            if (this.left) {
                this.left.insert(data);
            }
            else {
                this.left = new Node(data);
            }
        }
        else {
            if(this.right) {
                this.right.insert(data);
            } 
            else {
                this.right = new Node(data);
            }
        }
    }
    
    //deletes data from tree
    delete(data) {
        if(data < this.data && this.left) {
            this.left = this.left.delete(data);
        }
        else if(data > this.data && this.right) {
            this.right = this.right.delete(data);
        }
        else {
            if(this.data == data) {
                if(this.right && this.left) {
                    let minVal = this.right.findMin();
                    this.data = minVal;
                    this.right = this.right.delete(minVal);
                }
            }
            else if(this.left) {
                return this.left;
            }
            else if(this.right) {
                return this.right;
            } 
            else {
                return null;
            }
        }
        return this;
    }

    //find minVal for delete(data)
    findMin() {
        if(this.left) {
            return this.left.findMin();
        }
        else {
            return this.data;
        }
    }

    //find
    find(data) {
        if(this.data == data) {
            return true;
        }
        else if(data < this.data && this.left != null) {
            return this.left.find(data);
        }
        else if(data > this.data && this.right != null) {
            return this.right.find(data);
        }
        return false;
    }

    //levelOrder
    levelOrderNode(callback) {
        let current = this;
        const queue = [current];
        const result = [];
        while (queue.length > 0) {
            result.push(current);
            queue.splice(0, 1);
            if(current.left) queue.push(current.left);
            if(current.right) queue.push(current.right);
            current = queue[0];
        }
        if(callback) return callback(result);
        return result;
    }

    displayNodeData(array) {
        let nodeData = array.map((node) => node.data);
        return nodeData;
    }

    inorder(currentNode) {
        if(currentNode) {
            this.inorder(currentNode.left);
            console.log(currentNode.data);
            this.inorder(currentNode.right);
        }
    }

    preorder(currentNode) {
        if(currentNode) {
            console.log(currentNode.data);
            this.preorder(currentNode.left);
            this.preorder(currentNode.right);
        }
    }

    postorder(currentNode) {
        if(currentNode) {
            this.postorder(currentNode.left);
            this.postorder(currentNode.right);
            console.log(currentNode.data);
        }
    }

    //returns height of tree
    findHeight(currentNode) {
        if(currentNode == null) {
            return -1;
        }
        let leftHeight = this.findHeight(currentNode.left);
        let rightHeight = this.findHeight(currentNode.right);
        return Math.max(leftHeight, rightHeight) + 1;

    }

    //depth 
    findDepthNode(data, height = -1) {
        height++;
        if(data === this.data) return height;
        else if (data < this.data && this.left) return this.left.findDepthNode(data, height);
        else if (data > this.data && this.right) return this.right.findDepthNode(data, height);
        return "Data not found in this tree";
    }

    //isBalanced
    isBalancedNode(tree, root) {
        if (root == null) return true;
        let leftNode = tree.findHeight(root.left);
        let rightNode = tree.findHeight(root.right);
        if (
            Math.abs(leftNode - rightNode) <= 1 &&
            this.isBalancedNode(root.left) == true && 
            this.isBalancedNode(root.right) == true
        )
        return true;
        return false;
    }

    //rebalance
}

export default Node;