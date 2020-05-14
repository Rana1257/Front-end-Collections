webpackJsonp([4],{gpqS:function(n,r){n.exports='## 递归的实现、特性以及思维要点\r\n\r\n递归最简单最典型的实现：\r\n计算阶乘：\r\n```javascript\r\nfunction f(n) {\r\n    if (n <= 1) { return 1 }\r\n    return n * f(n-1)\r\n}\r\n```\r\n但是对于复杂的形式我们怎么使用递归来做呢？废话不多说，直接上模板！\r\n\r\n递归模板：\r\n```javascript\r\nvar recursion = function (level, param1, param2, ...) {\r\n    // 1. recursion terminator  递归结束条件\r\n    if (level > maxLevel) {\r\n        // process_result\r\n        return\r\n    }\r\n\r\n    // 2. process logic in current level 处理当前层的业务逻辑\r\n    process(level, data...)\r\n\r\n    // 3. drill down 下调到下一层\r\n    recursion(level + 1, p1, ...)\r\n\r\n    // 4. reverse the current level status if needed 如果需要的话，需要清理当前层的某些状态\r\n}\r\n```\r\n\r\n\r\n关于递归的3个思维要点：\r\n1. 不要人肉进行递归（这是使用递归的最大误区）\r\n2. 找到最近最简的方法，将其拆解成可重复解决的问题（重复子问题）\r\n3. 数学归纳法思维\r\n\r\n实战问题分析：\r\n\r\n[力扣70：爬楼梯问题](https://leetcode-cn.com/problems/climbing-stairs/)\r\n\r\n**需要注意的一个关键点**：\r\n    去解这种一看上去比较复杂步骤比较多的题目的时候，首先需要思考这个题目的**重复性**。假设一个问题它不存在重复性的话，就说明它的复杂度是客观存在的，这样的情况下，有多少复杂的逻辑就要写多少复杂的代码，对于这个题目来说，如果没有任何的重复性，你的代码就需要应对不同的n一直写下去，那最后你的代码会是几千行或者几万行都有可能，但是对于我们会遇到的面试题，基本上在5行10行最多20行之内是能够解决的，这就说明这个问题不论看上去多么复杂，他一定会存在重复性。\r\n\r\n问题分析：\r\n对于有很多种情况的问题，要想抽象出它的重复性，首先想到的就是使用数学解题中常用的**数学归纳法**：\r\nn=1时， 迈一步就可以走到顶了 --- 1种\r\nn=2时， 2次1步或者1次2步    --- 2种\r\n\r\nn为1和2的这两种情况比较好理解，关键是n=3的时候应该要怎么思考，这里就不应该是穷举了（这里的穷举其实是一种人肉递归），如果穷举的话，n=4的时候可能就已经列举不出来了，所以在这一步开始就要去找重复性，n=3的时候有2种可能：一种是你先跨一步台阶然后走到第3阶，一种是你先跨两步台阶然后再走到第3阶。所以就会发现，上第3级台阶的总步数=上第1级台阶的总步数+上第2级台阶的总步数，即：\r\n\r\n1: 1\r\n2: 2\r\n3: f(1) + f(2)  // 这两种情况是互斥的，不会有重复的情况，因为只可能有2种情况的走法，要么是从第1级走上来，要么是从第2级走上来。\r\n4: f(2) + f(3)\r\n...\r\nn: f(n-2) + f(n-1)\r\n\r\n分析到这里就已经转化成斐波那契数列的求解问题了，这里主要指出分析的思路，具体各种方法的实现以及复杂度的分析可以自己总结一下或者可以查看[时间与空间复杂度的分析](https://rana1257.github.io/Front-end-Collections/#/main/%E6%97%B6%E9%97%B4%E4%B8%8E%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E5%88%86%E6%9E%90)。\r\n\r\n[力扣22：括号生成](https://leetcode-cn.com/problems/generate-parentheses/)\r\n这个问题从分析思路到实现会写的比较详细，主要的目的是为了从0开始培养自己从理论到实践的能力，递归的模板到底应该怎么使用。\r\n\r\n问题思考：\r\n如果想要使用递归的话，递归会有几个参数，可以看到我们之前总结的递归的模板中的几个参数：一个是当前的level，还有就是需要随着level传递进去的对应不同层级上的参数。然后我们可以将这个题目抽象成有2n个盒子，每个盒子里面可以放左括号也可以放右括号，现在我们可以先抛开括号的合法性不看，就看总共有多少种可能性：\r\n\r\n```javascript\r\nvar generateParenthesis = function (n) {\r\n\r\n    //调用递归函数\r\n    // 参数1：当前的层级\r\n    // 参数2：盒子的个数，或者是递归的层级数\r\n    // 参数3：每一层中可以放的括号字符串\r\n    generate(0, 2 * n, "")\r\n    return null;\r\n\r\n};\r\n```\r\n以上代码只是根据我们需要的参数写出的需要调用的递归函数，这是一种自顶向下的编程方式，我们在写的时候可以只关注当前的逻辑就可以了，接下来来写具体的递归函数：\r\n```javascript\r\nvar generateParenthesis = function (n) {\r\n\r\n    //调用递归函数\r\n    generate(0, 2 * n, "")\r\n    return null\r\n\r\n    function generate(level, max, s) {\r\n        // terminator\r\n        if (level >= max) {\r\n            console.log(s)\r\n            return;\r\n        }\r\n\r\n        // process: 当前的操作就2个：要么加左括号要么加右括号\r\n        let s1 = s + "("\r\n        let s2 = s + ")"\r\n\r\n        // drill down\r\n        generate(level + 1, max, s1)\r\n        generate(level + 1, max, s2)\r\n\r\n        // reverse states\r\n    }\r\n\r\n};\r\n```\r\n到这里，已经把所有的可能性都产生出来了。接下来，如何验证括号的合法性？我们可以在generate的if里面写一个函数，去过滤掉不合法的情况，将合法的组合放在结果中。\r\n\r\n判断合法性，可以使用典型的栈的形式，这里只有小括号也可以简单判断，在递归生成中间结果的时候是可以判断的，如何判断呢？\r\n- 左边的括号随时可以添加，只要别超标就可以，理解超标的含义就要理解题目中n的含义，n表示左括号和右括号分别有n个，也就是说不超标的含义是，添加的左括号的个数不能超过n个\r\n- 在添加右括号的时候要满足：前面已经添加过左括号了，并且左括号的个数>添加之后右括号的个数\r\n\r\n添加括号合法性判断之后代码就是这样的：\r\n```javascript\r\nvar generateParenthesis = function (n) {\r\n\r\n    //调用递归函数\r\n    // 参数1：左括号的个数\r\n    // 参数2：右括号的个数\r\n    // 参数3：左括号和右括号的最大个数\r\n    // 参数4： 括号字符串\r\n    generate(0, 0, n, "")\r\n    return null\r\n\r\n    function generate(left, right, n, s) {\r\n        // terminator\r\n        if (left === n && right === n) {\r\n            console.log(s)\r\n            return;\r\n        }\r\n\r\n        // process: 当前的操作就2个：要么加左括号要么加右括号\r\n\r\n        // drill down\r\n        if (left < n) { generate(left + 1, right, n, s + "(") }\r\n        if (left > right) { generate(left, right + 1, n, s + ")") }\r\n\r\n\r\n        // reverse states\r\n    }\r\n\r\n};\r\n```\r\n上面这个程序的复杂度还是指数级的，但是相比于考虑合法性之前就少做了很多的无用功，因为我们在生成中间结果的时候就剪掉了一些不合法的分支，这就是**剪枝**。\r\n\r\n最终整理一下代码：\r\n```javascript\r\nvar generateParenthesis = function (n) {\r\n    var res = []\r\n    generate(0, 0, n, "")\r\n    return res\r\n\r\n    function generate(left, right, n, s) {\r\n        // terminator\r\n        if (left === n && right === n) {\r\n            res.push(s)\r\n            return;\r\n        }\r\n\r\n        // drill down\r\n        if (left < n) { generate(left + 1, right, n, s + "(") }\r\n        if (left > right) { generate(left, right + 1, n, s + ")") }\r\n    }\r\n\r\n};\r\n\r\nconsole.log(generateParenthesis(3))\r\n```\r\n\r\n以上，从题目思路分析到递归模型的应用过程就结束了，最关键的还是要多练习：\r\n[力扣104：二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)\r\n[力扣111：二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)\r\n[力扣98：验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)\r\n[力扣226：翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)\r\n[力扣297：二叉树的序列化与反序列化](https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/)\r\n[力扣236: 二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)\r\n[力扣105: 从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)\r\n[力扣77: 组合](https://leetcode-cn.com/problems/combinations/)\r\n[力扣46：全排列](https://leetcode-cn.com/problems/permutations/)\r\n[力扣47：全排列II](https://leetcode-cn.com/problems/permutations-ii/)\r\n'}});