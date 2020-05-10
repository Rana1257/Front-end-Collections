webpackJsonp([6],{o8i4:function(r,n){r.exports="## 树、二叉树、二叉搜索树（BST）\r\n\r\n通常，一维数据结构的操作是比较慢的，比如链表的查找操作，其时间复杂度为O(n)，如果想要加速，常见的思路就是升维，比如跳表结构，树和图是常见的二维数据结构。\r\n\r\n树形数据结构的出现只是为了加速吗？其实，我们人类本身生活在一个多维的世界里，因此很多的工程实践是在二维的基础上去解决的，而树本身就是人经常会碰到的一种情况。举个例子，斐波那契数列的递归实现应该是非常熟悉的一个操作了，将这个递归过程展开就是一个树状的结构。与生活更相近的下棋游戏，也是一种树的结构，因为你每走一步都会对应下面不同的状态，最后的叶子节点就是这个棋盘的终极形态，就得到最终的结果了（一方赢了或者输了或者是平局），而不同的棋盘游戏本身的状态树空间以及决策树空间的复杂度都是不同的，最终决定这个游戏的复杂度是不同的。所以像树这种二维的结构与我们的生活可以说是息息相关的，当然也是面试中必不可少的。\r\n\r\n接下来，我们就结合具体的代码案例来对树的相关操作做一个思考与总结，通过这篇文章你可以get：\r\n- 树与图的基本概念与区别\r\n- 递归思想遍历树的万能框架\r\n- 迭代思想实现树的遍历\r\n- BST的增删查改基本操作\r\n\r\n\r\n### 树与图\r\n1. 树结构\r\n\r\n![树结构](img/tree.png)\r\n\r\n- 树的结点定义：由n个结点组成的具有一定层次关系的集合。n=0称为空树。在任何一个非空树中有且仅有一个根结点。n>1时，其余结点可以分为m个互不相交的有限集，其中每个集合本身又是一棵树，称为根的子树。其代码模板如下所示：\r\n```javascript\r\nfunction TreeNode(val) {\r\n    this.val = val;\r\n    this.left = this.right = null;\r\n}\r\n```\r\n\r\n- 树的特点及基本术语：\r\n  - 每个结点有零个或多个子结点\r\n  - 每一个非根结点有且仅有一个父节点\r\n  - 结点的度：结点拥有的子树的数目\r\n  - 树的度： 树中结点的最大的度\r\n  - 分支结点：度不为0的节点\r\n  - 叶子结点：度为0的节点\r\n  - 树的层次：根结点层次为1\r\n  - 树的高度：树中节点的最大层次\r\n  - 森林：0个或者多个不相交的树组成。森林加上一个根就是树。\r\n\r\n2. 图结构\r\n   \r\n树和图最关键的一个差别是看有没有形成环。比如上图中的F节点有一个儿子的指针指向了E或者A或者C，那就会形成一个环，这样就变成了图，图结构如下所示：\r\n\r\n![图结构](img/graph.png)\r\n\r\n特殊情况下的简化理解： **链表就是特殊化的树，树就是特殊化的图。**\r\n\r\n### 二叉树\r\n\r\n![二叉树结构](img/Btree.png)\r\n\r\n\r\n对于一个无序的树，要想查找树中的某个节点，就需要对这颗树进行遍历，要查找根节点的值，同时还要访问左子树和右子树，总共需要三句语言，这三句语言的顺序就对应了这三种不同的遍历方式，即：\r\n\r\n  - 前序(Pre-order): 根-左-右\r\n  - 中序(In-order): 左-根-右\r\n  - 后序(Post-order): 左-右-根\r\n\r\n从具体实现方面来说，树的遍历操作都是有迹可循的，一般情况下，在面试中遇到这样的题目基本是可以使用**递归思想**来实现的，下面给出一个基本框架，套路在手，搞定所有！\r\n\r\n_这里对于递归思想的使用做一个小说明，在看一些题解的时候都说递归的复杂度高，不建议使用递归，其实这种说法不太准确，复杂度高其实本身并不是递归引起的，而是与你写的代码有很大的关系，比如在写Fib数列的时候，直接使用递归复杂度是比较高的，那是因为你没有使用缓存，导致进行了大量的重复计算，所以如何高效的使用递归思想的问题需要进一步总结(这里先占个坑，后面填)。_\r\n\r\n- 二叉树的前序遍历：\r\n```javascript\r\nfunction TreeNode(val) {\r\n    this.val = val\r\n    this.left = this.right = null\r\n}\r\n\r\nvar preorderTraversal = function(root, fn) {\r\n    if (root) {\r\n      // 当前节点的操作, 把你需要做的事情放在这里，其他的交给递归就可以了\r\n      fn(root)\r\n      // 左\r\n      preorderTraversal(root.left)\r\n      // 右\r\n      preorderTraversal(root.right)\r\n    }\r\n};\r\n```\r\n- 二叉树的中序遍历：\r\n```javascript\r\nvar preorderTraversal = function(root,fn) {\r\n    if (root) {\r\n      // 左\r\n      preorderTraversal(root.left)\r\n      // 当前节点的操作\r\n      fn(root)\r\n      // 右\r\n      preorderTraversal(root.right)\r\n    }\r\n};\r\n```\r\n- 二叉树的后序遍历：\r\n```javascript\r\nvar preorderTraversal = function(root, fn) {\r\n    if (root) {\r\n      // 左\r\n      preorderTraversal(root.left)\r\n      // 右\r\n      preorderTraversal(root.right)\r\n      // 当前节点的操作\r\n      fn(root)\r\n    }\r\n};\r\n```\r\n到这里，万能框架你已经get了，下面我们就来拿题目实战操作一番：\r\n[力扣144：二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)\r\n```javascript\r\nvar preorderTraversal = function(root) {\r\n    if (root) {\r\n        return [root.val, ...preorderTraversal(root.left), ...preorderTraversal(root.right)]\r\n    }else {\r\n        return [];\r\n    }\r\n};\r\n```\r\n[力扣94：二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)\r\n```javascript\r\nvar inorderTraversal = function(root) {\r\n    if(root) {\r\n        return [...inorderTraversal(root.left), root.val, ...inorderTraversal(root.right)];\r\n    }else {\r\n        return [];\r\n    }\r\n};\r\n```\r\n\r\n[力扣589：N叉树的前序遍历](https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/)\r\n```javascript\r\nvar preorder = function(root) {\r\n    if (!root) {return []};\r\n    let res = [];\r\n    // 调用\r\n    pre(root);\r\n\r\n    // 书写递归函数\r\n    function pre(root) {\r\n        if (!root) {return;}\r\n        res.push(root.val); // 先处理当前节点\r\n\r\n        // 子节点依次递归\r\n        for (let i=0; i<root.children.length; i++) {\r\n            pre(root.children[i]);\r\n        }\r\n    }\r\n    return res;\r\n};\r\n```\r\n[力扣590：N叉树的后序遍历](https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/)\r\n```javascript\r\nvar postorder = function(root) {\r\n    if (!root) { return [] };\r\n    let res = [];\r\n    // 调用\r\n    post(root);\r\n\r\n    function post (root) {\r\n        if (!root) { return; }\r\n        for (let i=0; i<root.children.length; i++) {\r\n            post(root.children[i]);\r\n        }\r\n\r\n        res.push(root.val); // 后处理当前节点\r\n    }\r\n    return res;\r\n};\r\n```\r\n\r\n关于树的遍历方法，以上我们都是使用递归的思想来实现的，套路还是比较简单的。但是呢，我们会发现在上面几个题目中LeetCode都会有一个进阶：**递归算法很简单，你可以通过迭代算法完成吗？** 回答：必须可以！\r\n首先，可以**使用栈**来实现，以前序遍历二叉树为例，基本思想是这样的:\r\n- 根节点入栈，\r\n- 根节点出栈，右子节点入栈，左子节点入栈\r\n- 左子节点出栈，左子节点的右子节点入栈，左子节点的左子节点入栈\r\n- ... 以此类推\r\n\r\n```javascript\r\nvar preorderTraversal = function(root) {\r\n    const printArr = []\r\n    if (!root) return []\r\n\r\n    const stack = []\r\n    stack.push(root)\r\n\r\n    while (stack.length > 0) {\r\n        const popValue = stack.pop()\r\n        printArr.push(popValue.val)\r\n        popValue.right && stack.push(popValue.right)\r\n        popValue.left && stack.push(popValue.left)\r\n    }\r\n    return printArr\r\n};\r\n```\r\n除此之外，还有一种迭代算法即**颜色标记法**，是模拟系统栈的一种方法，还是以前序遍历为例，其基本思想是这样的：\r\n- 将访问过的元素标记为灰色, 未访问过的元素标记为白色;\r\n- 从栈顶取出访问元素：\r\n  - 若为灰色元素就打印\r\n  - 若为白色元素, 按照右 -> 左 -> 根的顺序推入栈, 同时将白色元素标记为灰色元素;\r\n\r\n```javascript\r\nvar preorderTraversal = function(root) {\r\n  const printArr = []\r\n  if (!root) return printArr\r\n\r\n  const stack = []\r\n  stack.push({\r\n    color: 'white',\r\n    node: root\r\n  })\r\n\r\n  while (stack.length > 0) {\r\n    const popValue = stack.pop()\r\n    const { color, node } = popValue\r\n    if (color === 'gray') {\r\n      printArr.push(node.val)\r\n    } else {\r\n      node.right && stack.push({ color: 'white', node: node.right })\r\n      node.left && stack.push({ color: 'white', node: node.left })\r\n      stack.push({ color: 'gray', node })\r\n    }\r\n  }\r\n\r\n  return printArr\r\n}\r\n```\r\n是不是很简单呀，其实这种方式与上面是一样的，只不过多加了一个颜色的标记而已。\r\n\r\n通过上述案例分析可以发现，我们要查找一棵普通树中的节点就必须把树遍历一遍，它的时间复杂度是O(n)的，这样的话与一个链表就没有什么太大的区别了，没什么太大的意义。一般情况下会将树变得更加有序，这就是BST。\r\n\r\n### 二叉搜索树(BST)\r\n\r\n1. BST基本结构\r\n![二叉搜索树结构](img/bst.png)\r\n\r\n二叉搜索树(BST)，也称二叉排序树、有序二叉树(Ordered Binary Tree)、排序二叉树，是指一棵空树或者是具有以下性质的二叉树：\r\n- **左子树上所有节点**的值均小于它的根节点的值\r\n- **右子树上所有节点**的值均大于它的根节点的值\r\n- 以此类推：左右子树也分别都是BST （这就是重复性！递归就用在这里了！）\r\n\r\n一个小结论：BST的中序遍历是升序排列。\r\n\r\n2. BST常见操作\r\n\r\n- 查询\r\n\r\n- 插入新节点（创建）\r\n\r\n\r\n- 删除\r\n\r\n"}});