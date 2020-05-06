webpackJsonp([5],{ubXk:function(n,r){n.exports='# 时间复杂度和空间复杂度分析\r\n\r\n算法复杂度的分析能力应该是作为一个程序猿必备的技能，对于个人代码习惯的养成也是很有帮助的，具备一定底层功底在以后的工程开发中遇到问题才能更加得心应手，所以：\r\n  1. 在写程序的时候一定要对自己程序的时间和空间复杂度有所了解，写完之后能够下意识分析出代码的时间和空间复杂度。\r\n  2. 一段好的时间和空间复杂度的程序会为公司减少很大成本。能够用最简洁的时间和空间复杂度完成一段程序的话，基本上是一个顶尖职业选手的必备的素养。\r\n\r\n接下来将从以下几个方面来初步培养算法复杂度分析能力：\r\n- 时间复杂度\r\n- 主定理\r\n- 空间复杂度\r\n- 面试问题实战\r\n\r\n### 一、时间复杂度 (**Big O notation** --- 大O表示法)\r\n    O(1) --- Constant Complexity 常数时间复杂度\r\n    O(log n) --- Logarithmic Complexity 对数时间复杂度\r\n    O(n) --- Linear Complexity 线性时间复杂度\r\n    O(n^2) --- N square Complexity 平方\r\n    O(n^3) --- N cubic Complexity 立方\r\n    O(2^n) --- Exponential Growth 指数\r\n    O(n!) --- Factorial 阶乘\r\n\r\n有几点需要注意：\r\n   - 不考虑前面的系数，比如说线性时间复杂度O(n)可能是运行了n次，也可能是运行了2n次。\r\n   - 只看最高复杂度的运算\r\n   - 时间复杂度的严谨数学推导公式是非常麻烦的，但是作为前端开发我们没有必要纠结于数学公式的推导，掌握以上7种复杂度的分析就可以了。如果想要详细学习的话，看下[这篇](https://www.zhihu.com/question/21387264)。\r\n\r\n\r\n#### 1. 如何看时间复杂度？\r\n\r\n最常用的方式就是直接看这个函数或者是这段代码根据n的不同情况会运行多少次。\r\n例1：\r\n```javascript\r\nlet n = 1000;\r\nconsole.log("Hey - your input is:" + n);\r\n```\r\n很明显上述代码的时间复杂度是O(1)。在这段代码中不管n的值是多少，都会只执行一次`console.log`。\r\n```javascript\r\nlet n = 1000;\r\nconsole.log("Hey - your input is:" + n);\r\nconsole.log("Hmmm.. I\'m doing more stuff with:" + n);\r\nconsole.log("And more: " + n);\r\n```\r\n因为我们不关心前面的常数系数，那么这一段代码不管n是多少它都会执行3次，所以时间复杂度也是O(1)。\r\n\r\n例2：\r\n```javascript\r\nfor(int i=1; i<=n; i++) {\r\n  console.log("Hey - your input is:" + i);\r\n}\r\n```\r\n当n=1的时候，代码会执行1次，但是当n=100的时候，这段代码就会执行100次了，所以随着n的增大，代码的执行次数是线性增加的，所以时间复杂度是O(n)。\r\n\r\n例3：\r\n```javascript\r\nfor(int i=1; i<=n; i++) {\r\n   for(int j=1; j<=n; j++) {\r\n      console.log("Hey - your input is:" + i + "and" + j);\r\n   }\r\n}\r\n```\r\n如果n等于10，那么这段代码的执行次数就是10*10=100次，所以时间复杂度是O(n^2)。\r\n\r\n扩展思考： 如果这两个循环不是嵌套的而是相互并列的，时间复杂度是多少呢？\r\n也就是说需要先进行完n次循环，然后再进行n次循环，那么代码就是执行2n次，所以时间复杂度是O(n)。\r\n\r\n同理，如果是ijk的三层嵌套，时间复杂度就会变成O(n^3)了。\r\n\r\n例4：\r\n```javascript\r\nfor(let i=1; i<=n; i*2) {\r\n   console.log("Hey - your input is:" + i);\r\n}\r\n```\r\n假设n=4，那么这段代码只会执行2次，这个函数体的执行次数永远是log2(n)。所以时间复杂度就是O(log n)。\r\n\r\n例5：\r\n```javascript\r\nfunction fib(n) {\r\n   if (n < 2) return n;\r\n   return fib(n-1) + fib(n-2);\r\n}\r\n```\r\n上述代码是使用递归的形式来实现斐波那契数列的。递归程序在执行的时候怎么计算它的时间复杂度？ --- 这里先记住，它的执行是指数级的，后面详细分析。\r\n\r\n#### 2. 时间复杂度曲线\r\n<div align="center">\r\n  <img src="https://raw.githubusercontent.com/Rana1257/Front-end-Collections/master/static/img/complexity.png" width="600" height="400" alt="时间复杂度曲线">\r\n</div>\r\n上面的图中可以发现，在n比较小的时候可能差别不大，如果n比较大的话，指数级复杂度增长是非常快的。在写程序的时候如果能够优化时间复杂度比如从2^n降到n^2，从曲线来看，当n较大的时候，得到的收益是非常高的。\r\n\r\n从一个例题出发：求1 + 2 + 3 +... + n的和。\r\n\r\n有两种方法：\r\n第一种方法是：程序暴力求解，从1到n循环累加。\r\n```javascript\r\nvar y = 0\r\nfor(var i = 1; i <=n; i++) {\r\n   y += i;\r\n}\r\n```\r\n这就是一层循环，n是多少就循环多少次，它的时间复杂度就是O(n)。\r\n\r\n第二种方法：使用数学求和公式 `sum = n(n+1)/2`\r\n```javascript\r\ny = n * (n+1) / 2\r\n```\r\n这段代码就只有一行了，只执行一次就可以，所以它的时间复杂度是常数O(1)。注意：这里时间复杂度不是O(n^2)。\r\n\r\n所以，上面就可以看出，程序的不同方法最后得到的结果虽然是一样的，但是复杂度是不同的。\r\n\r\n在面试的时候，如果面试官问到一个算法的题目，我们需要做的是：\r\n- 第一是跟面试官把这个题目的意思全部都确认无误。\r\n- 第二的话就是想所有可能的解决方法，注意是所有的解决方法，同时比较这些方法的时间和空间复杂度。\r\n- 第三找出最优的解决方案，就是时间最快的，内存用的最少的。\r\n- 第四才是写代码测试结果。\r\n\r\n#### 3. 使用递归如何分析时间复杂度\r\n\r\n关键就是要知道递归执行了多少次，如果是循环的话很好理解，n是多少就循环多少次，如果是递归的话，它相当于是层层嵌套的，常规的做法就是将递归画出一个树形结构，称之为递归状态的递归树或者状态树。\r\n\r\n还是拿实际的例子来分析：求Fib的第n项。\r\n`Fib: 0, 1, 1, 2, 3, 5, 8, 13, 21, ... `\r\n它的递推公式是：`F(n) = F(n-1) + F(n-2)`\r\n在面试的时候，第一反应可能就是最简单的递归的方式去求解：\r\n```javascript\r\nfunction fib(n) {\r\n   if(n<2) return n;\r\n   return fib(n-1) + fib(n-2);\r\n}\r\n```\r\n前面已经说过它的时间复杂度是指数级的O(2^n)。假设取n=6, 要计算fib(6)，程序执行过程是这样的：\r\n<div align="center">\r\n  <img src="https://raw.githubusercontent.com/Rana1257/Front-end-Collections/master/static/img/f6.png" width="800" height="500" alt="递归状态树">\r\n</div>\r\n\r\n在这个执行过程中会发现：\r\n- 在这个状态树中每多展开一层，运行的节点树就是上面一层的2倍，所以**每一层的执行数是指数级递增**的，展开到最后一层的话就变成了2^n的数量级的节点，最后总的执行次数就是指数级的。\r\n- 在执行状态树中有**大量重复节点**的存在，比如`f(3)`就被计算了很多次，这么多大量冗余的计算就导致求第6个Fib数变成了2^6的一个繁复的时间复杂度方案。\r\n\r\n**上面的这段代码在面试中一定不能直接这么写，可以加一个缓存，把中间结果能够缓存下来或者直接用一个循环来写。**\r\n\r\n### 二、主定理(Master Theorem)\r\n\r\n[主定理](https://zh.wikipedia.org/wiki/%E4%B8%BB%E5%AE%9A%E7%90%86)是用来解决递归函数时间复杂度分析的。任何一个分治或者递归的函数都可以使用主定理算出它的时间复杂度。本身比较复杂的话怎么简化实际可用的办法呢？关键的有4种(递归的4种情形)：\r\n![主定理](https://raw.githubusercontent.com/Rana1257/Front-end-Collections/master/static/img/mt.png)\r\n\r\n- 二分查找 --- 一般发生在一个序列本身有序的时候要在这个有序的数列中找到想要的目标数，每次都是一分为二，所以时间复杂度是`O(log n)`\r\n- 二叉树的遍历 --- 每次一分为二，但是一分为二之后每一边都是相等的时间复杂度这么下去的，时间复杂度是O(N).一个简化的思考方式就是二叉树的遍历，会每一个节点都访问一次且仅访问一次，所以时间复杂度是O(N).\r\n- 排好序的二维矩阵中进行二分查找\r\n- 归并排序\r\n\r\n**常考面试题**：\r\n- 二叉树遍历中的前序、中序、后序的时间复杂度是多少？\r\n答案是：`O(n)`，里面的这个n是二叉树的节点总数。\r\n分析：一个最简单的理解就是不管是哪种遍历方式，在遍历这个二叉树的时候，每个节点会访问一次且仅访问一次，所以它的时间复杂度就是线性于二叉树的节点总数的，也就是`O(n)`的时间复杂度。\r\n\r\n- 图的遍历时间复杂度呢？ --- 图里面的每个节点也是会访问一次且仅访问一次，所以时间复杂度也是`O(n)`。\r\n- 搜索算法： DFS 、BFS时间复杂度是多少？ --- `O(n)`，n指的是搜索空间中的节点总数。\r\n- 二分查找时间复杂度？ --- `O(log n)`\r\n\r\n### 三、空间复杂度\r\n\r\n空间复杂度与时间复杂度的情况类似，但更简单。主要有两条原则：\r\n- 如果代码里面开了数组，**数组的长度基本上就是空间复杂度**。比如：开了一个一维的数组，它的长度是传入的元素的个数，一般来说空间复杂度就是O(n)，如果开的是2维数组，数组的长度是n^2，那么空间复杂度基本上就是n^2.\r\n- 如果是有递归的话**递归最深的深度就是空间复杂度的最大值**。当然，对于既使用递归又开了数组的情况，两者之间的最大值就是空间复杂度的值。\r\n\r\n### 四、实战： [爬楼梯问题](https://leetcode-cn.com/problems/climbing-stairs/)\r\n\r\n题目描述：假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？\r\n\r\n输入：台阶数；\r\n输出：方案数;\r\n\r\n简单分析寻找规律:\r\n输入 -> 输出\r\n  1 -> 1\r\n  2 -> 2\r\n  3 -> 3\r\n  4 -> 5\r\n  5 -> 8\r\n...\r\n会发现，它的通项公式就是Fib的公式：`F(n) = F(n-1) + F(n-2)`。\r\n\r\n方法1：直接使用斐波那契公式\r\n![斐波那契公式](https://raw.githubusercontent.com/Rana1257/Front-end-Collections/master/static/img/fib.png)\r\n```javascript\r\nconst sqrt5 = Math.sqrt(5)\r\nfunction climbingStairs (n) {\r\n   return (Math.pow((1 + sqrt5) / 2, n + 1) - Math.pow((1 - sqrt5) / 2, n + 1)) / sqrt5;\r\n}\r\n```\r\n时间复杂度：O(log(n))， `Math.pow()`使用了log(n)的时间\r\n空间复杂度：O(1)\r\n\r\n方法2：递归 --- 前面已经记录过，直接使用递归，这是一种繁复的方法，面试的时候不要写！\r\n\r\n方法3：带缓存的递归优化\r\n```javascript\r\nfunction climbingStairs (n) {\r\n   let cCache =  climbWithCache();\r\n   return cCache(n);\r\n}\r\n\r\n// 带缓存的递归\r\nfunction climbWithCache () {\r\n   let cache = new Map();\r\n   return function cCache(n) {\r\n      if (n in cache) {\r\n         return cache[n]\r\n      }else {\r\n         if (n <= 2) return n;\r\n         cache[n] = cCache(n-1) + cCache(n-2);\r\n         return cache[n];\r\n      }\r\n   }\r\n}\r\n```\r\n时间复杂度： O(n)\r\n空间复杂度: O(n)\r\n\r\n方法4：动态规划\r\n这个问题可以分解成多个子结构问题来求解，即它的最优解可以从其子问题的最优解来有效地构建。\r\n爬第n阶楼梯的方法数量包括两个部分：\r\n- 爬n-1阶楼梯的方法数\r\n- 爬n-2阶楼梯的方法数\r\n\r\n所以，如果用`dp[n]`来表示到达第n阶的方法总数，就会得到: `dp[n] = dp[n-1] + dp[n-2]`.\r\n具体实现过程如下：\r\n```javascript\r\nfunction climbingStairs (n) {\r\n   let dp = [1, 1];\r\n   for (let i = 2; i<=n; i++) {\r\n      dp[i] = dp[i-1] + dp[i-2];\r\n   }\r\n\r\n   return dp[n];\r\n}\r\n```\r\n时间复杂度：O(n)\r\n空间复杂度：O(n)，因为开辟了一个长度为n的数组dp\r\n\r\n方法5：优化动态规划\r\n方法4当中是开辟了一个长度为n的数组，其实我们并不需要全部存储，只需要拿中间变量存储第i-1和第i-2个数值就可以了，优化如下：\r\n```javascript\r\nfunction climbingStairs (n) {\r\n   if (n === 1) return 1;\r\n   let prevPrevNum = 1;\r\n   let prevNum = 2;\r\n   for (let i = 3; i<=n; i++) {\r\n      let num = prevPrevNum + prevNum;\r\n      prevPrevNum = prevNum;\r\n      prevNum = num;\r\n   }\r\n   return prevNum;\r\n}\r\n```\r\n时间复杂度：O(n)\r\n空间复杂度：O(1), 优化了空间复杂度，使用的是常量级的空间。\r\n\r\n'}});