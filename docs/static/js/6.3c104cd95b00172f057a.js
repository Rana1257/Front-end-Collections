webpackJsonp([6],{"4qwW":function(n,r){n.exports="# JavaScript的运行机制\r\n\r\n你有好奇过一段JavaScript代码是怎样执行的吗？换句话说，JavaScript引擎在执行一段JavaScript代码的时候，究竟发生了什么？这看起来确实是有点偏向底层的东西，但是了解JS的运行机制，有助于你编写更好的代码和APP。对于老手而言，如果你的项目非常依赖JavaScript，那么作为开发人员，充分利用JavaScript这门语言的全部，并对其内部进行越来越深入的了解，才能构建出色的软件。\r\n\r\n对于新手而言，作用域链，this和闭包恐怕是每个刚学习前端的同学的梦魇。除此之外还有事件循环（Event loop），变量提升等等，而这些知识点都与JavaScript的运行机制密切相关。现在你明白了解JavaScript的运行机制有多么重要了吧？:thumbsup:\r\n\r\n通过阅读下面的内容，你将会了解到：\r\n* JS代码的执行机制\r\n* 执行上下文\r\n* 作用域与作用域链\r\n* this的指向\r\n* 闭包的本质\r\n\r\n## 预备知识\r\n\r\n### 进程与线程\r\n\r\n进程：[进程](https://zh.m.wikipedia.org/wiki/%E8%A1%8C%E7%A8%8B)是操作系统中的程序运行的一个实例。\r\n线程：[线程](https://zh.m.wikipedia.org/wiki/%E7%BA%BF%E7%A8%8B)是操作系统能够调度的最小单位。\r\n联系：线程是建立在进程的基础上的一次程序运行单位，一个进程中可以有多个线程。\r\n\r\n用人类能够听的懂得话来说：\r\n\r\n>进程是一个工厂，工厂有它的独立资源，工厂之间相互独立。\r\n>线程是工厂中的工人，多个工人协作完成任务\r\n>工厂内有一个或多个工人\r\n\r\n>工厂的资源 -> 系统分配的内存（独立的一块内存）\r\n>工厂之间的相互独立 -> 进程之间相互独立\r\n>多个工人协作完成任务 -> 多个线程在进程中协作完成任务\r\n>工厂内有一个或多个工人 -> 一个进程由一个或多个线程组成\r\n\r\n以上引用来自[从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理](https://juejin.im/post/5a6547d0f265da3e283a1df7#heading-2)。\r\n\r\n总的来说：进程就是一个程序实际运行的一个**实例**（单位），线程则是进程中的一个**控制流**。\r\n\r\n### 浏览器的进行和线程\r\n\r\n浏览器本身是多进程的，浏览器的主要进程包括\r\n\r\n* Browser进程：浏览器的主进程\r\n* **Renderer进程**：浏览器的渲染进程，或者叫浏览器内核，是前端领域一切事情发生的地方。它负责页面渲染，脚本执行，事件处理等等。默认情况下每个页面是一个进程，打开新的网页相当于新起了一个进程。\r\n* GPU进程：3D绘制。\r\n* 第三方插件进程：每个插件对应一个第三方插件进程。\r\n\r\n对于我们的主角Renderer进程来说，它本身又拥有多个线程，包括：\r\n\r\n* GUI线程：负责渲染，比如解析HTML，CSS等等，回流和重绘也是由它执行的。此外，GUI线程与JS线程**互斥**，也就是说它们之间同时只能有一个在执行，另一个会被暂时挂起。\r\n\r\n互斥是因为JS可以操作DOM，它可以修改HTML元素和CSS样式。如果GUI线程和JS线程可以同时进行，那么就导致JS线程一边在修改元素属性，同时GUI线程一边在渲染页面。只要JS线程没有停止对页面做修改，GUI线程就在白费功夫。\r\n\r\n所以GUI线程与JS线程是互斥的，当JS引擎执行的时候，GUI线程会被挂起，GUI线程的更新会被保存在一个队列中，等到JS引擎线程空闲时再被执行。这也是JS的执行会阻塞页面的渲染的本质原因。\r\n\r\n* **JS引擎线程**：负责处理JavaScript脚本，例如V8引擎。如果JS的执行时间过长，就会造成页面渲染被阻塞。本文所要阐述的JS运行就发生在这。\r\n\r\n* 事件触发线程\r\n* 定时触发器线程\r\n* 异步http请求线程\r\n\r\n总结：\r\n* 浏览器本身是多进程的，其中一个进程叫渲染进程。渲染进程是多线程的，其中一个叫JS线程（JS引擎）。\r\n\r\n* JS引擎本身是**单线程**的。这是因为多线程会导致并发性的错误（设想线程A在添加DOM节点，线程B同时在删除同一个DOM节点？:fearful:）。而异步操作本质上并没有改变JS的单线程特性，异步只是通过事件队列（Event queue）假装自己是多线程。\r\n\r\n* HTML5中的[Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)也没有破坏JS引擎单线程的特性。Worker线程独立于JS线程（主线程），当Worker线程完成计算后，再将结果通知给JS线程（主线程）。详见[这里](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)。\r\n\r\n### JS引擎\r\n\r\n一个JavaScript引擎由两部分组成，以著名的V8引擎为例，它包括：\r\n* 内存堆：分配内存的地方\r\n* [调用栈](https://developer.mozilla.org/zh-CN/docs/Glossary/Call_stack)：执行函数的地方\r\n\r\n![img](https://raw.githubusercontent.com/Rana1257/Front-end-Collections/master/static/img/JavaScript%E7%9A%84%E6%89%A7%E8%A1%8C%E6%9C%BA%E5%88%B6-%E5%9B%BE1.jpg)\r\n\r\n调用栈，也称执行上下文栈，是一个用来管理执行上下文的栈结构。当然现在你只需要知道JS引擎使用一个叫执行上下文栈的结构来管理函数的执行就行了。\r\n\r\n## JavaScript代码的执行过程\r\n\r\nJS引擎执行JavaScript代码并不是一行行执行的。JS的执行分为两个过程：\r\n\r\n* 预解析（Parser）阶段：JS引擎需要预先对代码进行处理。\r\n* 执行阶段：这时候才真正执行。\r\n\r\n举例来说，对于 `var name = 'Rana'`来说，JS引擎会先进行解析，创建一个名为`name`的变量。在之后的执行阶段再把`name`变量赋值为`'Rana'`。\r\n\r\n在预解析阶段，JS首先创建了执行上下文。\r\n\r\n## 执行上下文\r\n\r\n执行上下文（Execution context）的定义可能有点难以给出。简而言之，执行上下文是代码执行之前的准备工作。在JavaScript中有三种类型的执行上下文：\r\n\r\n* 全局执行上下文（Global context）：这是默认的执行上下文。\r\n* 函数执行上下文：每个函数都有自己的执行上下文。当一个函数被调用的时候, 都会创建一个新的上下文。\r\n* Eval函数执行上下文（正常情况下都不会用到邪道方法Eval :laughing:）\r\n\r\n前面已经提到了，执行上下文栈是一个用来管理执行上下文的栈结构。当 JavaScript 预解释的时候，最先遇到的就是全局代码，因此第一个push进执行上下文栈（Execution context stark）的就是全局执行上下文（Global context）。遇到其他函数代码的时候，对应的函数执行上下文再被push进执行上下文栈。\r\n我们知道栈可以用数组的形式模拟，因此执行上下文栈可以表示为：\r\n\r\n```javascript\r\n    const executionContextStack = [\r\n        ...\r\n        executionContextOfInnerFunction,\r\n        executionContextOfOuterFunction,\r\n        globalContext   // <-------------栈底 \r\n    ]\r\n```\r\n\r\n总结一下：\r\nJS引擎使用执行上下文栈来管理所有的执行上下文。第一个入栈的是全局执行上下文（Global context），然后各个函数上下文依次入栈。当函数结束运行之后，再依次pop出栈。执行上下文栈保证了所有函数的有序执行。\r\n\r\n现在我们继续深入一下执行上下文。一个执行上下文包括三个属性：\r\n* 变量对象（Variable object）：用来存储执行上下文中定义的变量声明和函数声明。全局上下文中的变量对象一般叫全局对象（Global object），函数上下文中的变量对象一般叫活动对象（Active object）（只是叫法上的区别，反正都叫变量对象就对了。）\r\n* 作用域链（Scope chain）：各级执行上下文的变量对象所组成的链表。\r\n* this：决定this的指向\r\n\r\n因此，上面的`executionContextOfFunction`可以继续表示为：\r\n\r\n```javascript\r\n    executionContextOfFunction = {\r\n        'variableObject': 变量对象,\r\n        'scopeChain': 作用域链,\r\n        'this': 设置this\r\n    }\r\n```\r\n\r\n注意：在ES5的标准中，变量对象这个说法被改成了词法环境（LexicalEnvironment）加变量环境（VariableEnvironment）。简而言之，**词法环境**是一种变量/函数名称--\x3e实际的数据/函数对象的映射结构，而**变量环境**是词法环境的一种，你可以在[这里](https://github.com/tc39/ecma262/issues/736)找到官方的解释（反正我是晕了:dizzy_face:）。但是从作用上来讲，无论是变量对象还是XX环境都是用来保存执行上下文中的变量和函数声明的。\r\n\r\n### 变量对象\r\n\r\n在JS引擎的预解析阶段，创建了执行上下文之后，此时的变量对象包括三个部分：\r\n\r\n* 根据函数的参数初始化Arguments对象\r\n* 寻找内部是否有函数声明，若有，则将函数名和函数引用存入变量对象\r\n* 寻找内部是否有变量声明（通过var声明，当然也可以是let或者const），若有，则将变量名存入变量对象中，并初始化为`undefined`\r\n\r\n**重点**：同名的函数声明会覆盖变量声明。\r\n\r\n举个例子：\r\n```javascript\r\n    function outerFunc(){\r\n        var a = 1\r\n        function innerFunc(){}\r\n        var c = function(){}\r\n    }\r\n```\r\n此时（预解析阶段）的变量对象为：\r\n\r\n```javascript\r\n    executionContextOfOuterFunc = {\r\n        'variableObject': {\r\n            arguments:{\r\n                length: 0\r\n            },\r\n            a: undefined,\r\n            innerFunc: reference to function innerFunc(){},\r\n            c: undefined\r\n        },\r\n        'scopeChain': 作用域链,\r\n        'this': 设置this\r\n    }\r\n```\r\n\r\n现在你应该明白什么叫**变量提升**了吧？正是因为JS引擎会在预解析阶段，创建执行上下文的变量对象，并对所有变量的声明赋值为 undefined，所以才可以在变量初始化之前使用它（值为 undefined），并且不会抛出错误。再来看看MDN对[变量提升](https://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting)的解释：\r\n>变量提升（Hoisting）被认为是， Javascript中执行上下文 （特别是创建和执行阶段）工作方式的一种认识。从概念的字面意义上说，“变量提升”意味着变量和函数的声明会在物理层面移动到代码的最前面，但这么说并不准确。实际上变量和函数声明在代码里的位置是不会动的，而是在编译阶段被放入内存中。\r\n\r\n是不是豁然开朗？\r\n\r\n之后在JS引擎执行阶段，会顺序执行代码。根据代码，修改变量对象的值：\r\n```javascript\r\n    executionContextOfOuterFunc = {\r\n        'variableObject': {\r\n            arguments:{\r\n                length: 0\r\n            },\r\n            a: 1,\r\n            innerFunc: reference to function innerFunc(){},\r\n            c: reference to FunctionExpression \"c\"\r\n        },\r\n        'scopeChain': 作用域链,\r\n        'this': 设置this\r\n    }\r\n```\r\n总结一下：\r\n执行上下文中的变量对象在预解释阶段会先进行解析，等到执行阶段再修改成真正的值。变量提升的意义是教育我们应该先声明一个变量，再使用它，而不是先使用后声明。此外，ES6中的let和const则完全纠正了这种“先使用后声明”的行为。因此我个人觉得能不用var就不用，let和const是更好的选择 :thumbsup:。\r\n\r\n### 作用域链\r\n\r\n作用域链的完美解释：\r\n>当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。\r\n\r\n看不懂？没关系，举个例子：\r\n```javascript\r\n    Global object\r\n\r\n    function outerFunc(){\r\n        outerFunc Active object\r\n\r\n        function innerFunc(){\r\n            innerFunc Active object\r\n        }\r\n    }\r\n```\r\n\r\n我们创建了内外两个函数（innerFunc和outerFunc），全局上下文中有变量对象（Global object），两个函数的执行上下文也有各自的变量对象（Active object）。每个函数都有各自的作用域（花括号{}包裹起来的区域）。函数通过一个叫`[[scope]]`的属性表示自己的作用域，函数的作用域总是包含其**父级**作用域中的变量对象。当JS引擎遇到函数代码的时候，首先会创建函数，此时函数的`[[scope]]`为：\r\n\r\n```javascript\r\n    outerFunc.[[scope]] = {\r\n        globalContext.VO                 // 全局变量对象\r\n    }\r\n\r\n    innerFunc.[[scope]] = {\r\n        executionContextOfOuterFunc.AO,  // 即外部函数的变量对象\r\n        globalContext.VO                 // 全局变量对象\r\n    }\r\n```\r\n\r\n当函数创建完毕（执行上下文和变量对象都弄好了之后），会将当前执行上下文的**变量对象**添加到`[[scope]]`的前端。即现在的`[[scope]]`表示为：\r\n\r\n```javascript\r\n    innerFunc.[[scope]] = {\r\n        executionContextOfInnerFunc.AO,  // 自己的变量对象\r\n        executionContextOfOuterFunc.AO,  // 外部函数的变量对象\r\n        globalContext.VO                 // 全局变量对象\r\n    }\r\n```\r\n\r\n因此，作用域链的本质就是多个执行上下文的变量对象组成的链表。作用域链保证了对执行上下文可以访问的所有变量的有序访问。\r\n\r\n对应上面执行上下文的例子，修改一下：\r\n```javascript\r\n    executionContextOfOuterFunc = {\r\n        'variableObject': {\r\n            arguments:{\r\n                length: 0\r\n            },\r\n            a: 1,\r\n            innerFunc: reference to function innerFunc(){},\r\n            c: reference to FunctionExpression \"c\"\r\n        },\r\n        'scopeChain': [\r\n            executionContextOfOuterFunc.AO,    // 自己的变量对象\r\n            globalContext.VO                   // 全局变量对象\r\n        ],\r\n        'this': 设置this\r\n    }\r\n```\r\n\r\n### This\r\n\r\nThis的指向是在JS引擎预解析阶段，创建执行上下文的时候确定的。在绝大多数情况下，this 永远指向最后调用它的那个对象。\r\n```javascript\r\n    var name = 'Global Name'\r\n    var person = {\r\n        name: 'Rana',\r\n        getName: function(){\r\n            console.log(this.name)\r\n        }\r\n    }\r\n```\r\n\r\n* 直接调用：`var p = person.getName; p();`，this指向`window`，因为`p()`是在window下调用的。\r\n* 方法调用：`person.getName()`，this指向`person`对象。\r\n* call，apply，bind：可以指定this的指向。\r\n* new：构造函数会新建一个对象，并将函数的this指向这个新建的对象。\r\n\r\n特殊情况发生在[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)中。箭头函数：\r\n>没有自己的this，arguments，super或new.target，并且它不能用作构造函数。箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this。也不能用作构造器，和 new一起用会抛出错误。\r\n\r\n```javascript\r\n    var name = 'Global Name'\r\n    var person = {\r\n        name: 'Rana',\r\n        getName: () => {\r\n            console.log(this.name)\r\n        }\r\n    }\r\n```\r\n由于箭头函数没有this，它只会从自己的作用域链的上一层继承this，因此这里的this指向`window`，输出`Global Name`。\r\n\r\n\r\n**总结**：\r\n现在我们回过头看一下最开始的例子，把前面所有的内容总结一下：\r\n```javascript\r\n    function outerFunc(){\r\n        var a = 1\r\n        function innerFunc(){}\r\n    }\r\n```\r\n1. 进入全局执行上下文，全局执行上下文被压入执行上下文栈，`executionContextStack = [globalContext]`。\r\n2. 全局执行上下文初始化：\r\n    ```javascript\r\n        globalContext = {\r\n            'variableObject': Global object,  // 变量对象是全局对象\r\n            'scopeChain': globalContext.VO,   // 作用域链只包括全局对象\r\n            'this': undefined\r\n        }\r\n    ```\r\n3. JS引擎遇到第一个函数`outerFunc`，创建`outerFunc`函数，此时该函数内部的`[[scope]]`属性为：`outerFunc.[[scope]] = [globalContext.VO]`\r\n4. 创建`outerFunc`的执行上下文`executionContextOfOuterFunc`，push进执行上下文栈：\r\n    ```javascript\r\n        executionContextStack = [\r\n            executionContextOfOuterFunc,\r\n            globalContext\r\n        ]\r\n    ```\r\n5. `outerFunc`的执行上下文初始化，创建变量对象，作用域链和this：\r\n    ```javascript\r\n        executionContextOfOuterFunc = {\r\n            'ActiveObject': {\r\n                arguments: {\r\n                    length: 0                                   // 创建Arguments\r\n                },\r\n                a: undefined,                                   // 创建变量声明\r\n                innerFunc: reference to function innerFunc(){}  // 创建函数声明\r\n            },\r\n            'scopeChain': [ActiveObject, globalContext.VO],     // 作用域链包括自己的变量对象，全局对象\r\n            'this': undefined\r\n        }\r\n    ```\r\n    同时遇到第二个函数`innerFunc`，创建`innerFunc`函数，此时该函数内部的`[[scope]]`属性为：`innerFunc.[[scope]] = [executionContextOfOuterFunc.AO, globalContext.VO]`。创建`innerFunc`的执行上下文`executionContextOfInnerFunc`push进栈：\r\n    ```javascript\r\n        executionContextStack = [\r\n            executionContextOfInnerFunc,\r\n            executionContextOfOuterFunc,\r\n            globalContext\r\n        ]\r\n    ```\r\n\r\n6. `innerFunc`的执行上下文初始化，创建变量对象，作用域链和this：\r\n    ```javascript\r\n        executionContextOfInnerFunc = {\r\n            'ActiveObject': {\r\n                arguments: {\r\n                    length: 0                                   // 创建Arguments\r\n                }\r\n            },\r\n            'scopeChain': [ActiveObject, executionContextOfOuterFunc.AO, globalContext.VO],     // 作用域链包括自己的变量对象，全局对象\r\n            'this': undefined\r\n        }\r\n    ```\r\n\r\n7. 执行`innerFunc`，根据执行的代码，修改变量对象的值。这里我们省略了执行过程，当`innerFunc`执行完毕之后，从执行上下文栈中弹栈：\r\n    ```javascript\r\n        executionContextStack = [\r\n            executionContextOfOuterFunc,\r\n            globalContext\r\n        ]\r\n    ```\r\n    `outerFunc`也是如此。\r\n\r\n\r\n### 闭包\r\n\r\n只有懂了变量对象，作用域链之后，才能真正理解闭包。MDN对[闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)的定义为：\r\n>函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起构成闭包（closure）。也就是说，闭包可以让你从内部函数访问外部函数作用域。在 JavaScript 中，每当函数被创建，就会在函数生成时生成闭包。\r\n\r\n翻译一下：闭包就是**函数**和函数能够访问的**变量对象**的总和。:smile:\r\n\r\n因此从理论上来说，JavaScript中所有的函数都是闭包。因为函数都能访问其外部作用域中的变量对象（比如说全局对象），这些**函数**和**全局对象**就形成了闭包。\r\n实际应用中，我们通常在一个函数内部再创建一个函数，那么这个新创建的内部函数就能访问到外部函数作用域中的变量对象，**内部函数**和外部函数的**变量对象**也形成了闭包。例如：\r\n\r\n```javascript\r\n    function outerFunc(){\r\n        var a = 1\r\n        function innerFunc(){\r\n            console.log(a)\r\n        }\r\n    }\r\n```\r\n这里的a和`innerFunc`就组成了闭包。\r\n\r\n你可能发现了，函数外部是无法访问函数内部的变量对象的（在全局上下文中无法访问到`outerFunc`中的变量a），因为作用域链是从内到外的。而通过使用闭包函数`innerFunc`，我们是可以访问到a的，原因同样是作用域链。因此，闭包的本质就是作用域链的一个特殊应用。\r\n\r\n此外，闭包函数还可以使得已经结束运行的函数中的变量保留下来不被垃圾回收机制回收，因为闭包函数的作用域链包含了外部函数的变量对象。看到了吧？这还是因为作用域链。**闭包的本质就是作用域链**"}});