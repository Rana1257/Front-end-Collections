# JavaScript的运行机制

你是否好奇一段JavaScript代码是如何执行的？换句话说，JavaScript引擎在执行一段JS代码的时候，究竟发生了什么？虽然这看起来的确是偏向底层的东西，但是通过了解JS的运行机制，有助于你充分利用JavaScript这门语言的全部，编写更好的代码，从而构建更加出色的网页或者软件。

对于新手而言，作用域链，this的指向和闭包恐怕是每个刚接触前端的同学的梦魇。除此之外还有事件循环（Event loop），变量提升等等令人摸不着头脑的知识点。而这它们都与JavaScript的运行机制密切相关。现在你明白了解JavaScript的运行机制有多么重要了吧？:thumbsup:

通过阅读下面的内容，你将会了解到：
* 事件循环
* JS代码的执行机制
* 执行上下文
* 作用域与作用域链
* this的指向
* 闭包的本质

&nbsp;

## 预备知识

### 进程与线程

进程：[进程](https://zh.m.wikipedia.org/wiki/%E8%A1%8C%E7%A8%8B)是操作系统中的程序运行的一个实例。
线程：[线程](https://zh.m.wikipedia.org/wiki/%E7%BA%BF%E7%A8%8B)是操作系统能够调度的最小单位。
所以进程和线程的关系是：线程是建立在进程的基础上的一次程序运行单位，一个进程中可以有多个线程。

用人类能够听的懂得话来说：

>进程是一个工厂，工厂有它的独立资源，工厂之间相互独立。
>线程是工厂中的工人，多个工人协作完成任务
>工厂内有一个或多个工人

>工厂的资源  ->  系统分配的内存（独立的一块内存）
>工厂之间的相互独立  ->  进程之间相互独立
>多个工人协作完成任务  ->  多个线程在进程中协作完成任务
>工厂内有一个或多个工人  ->  一个进程由一个或多个线程组成

以上引用来自[从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理](https://juejin.im/post/5a6547d0f265da3e283a1df7#heading-2)。

**总结**：进程就是一个程序实际运行的一个**实例**，线程则是进程中的一个**控制单位**。

### 浏览器的进行和线程

浏览器本身是多进程的，浏览器的主要进程包括

* Browser进程：浏览器的主进程
* **Renderer进程**：浏览器的渲染进程，或者叫浏览器内核，是前端领域一切事情发生的地方。它负责页面渲染，脚本执行，事件处理等等。默认情况下每个页面是一个进程，打开新的网页相当于新起了一个进程。
* GPU进程：3D绘制。
* 第三方插件进程：每个插件对应一个第三方插件进程。

对于我们的主角Renderer进程来说，它本身又拥有多个线程，包括：

* GUI线程：负责渲染，比如解析HTML，CSS等等，回流和重绘也是由它执行的。

  GUI线程与JS线程**互斥**，也就是说它们之间同时只能有一个在执行，另一个会被暂时挂起。

  互斥是因为JS可以操作DOM，它可以修改HTML元素和CSS样式。如果GUI线程和JS线程可以同时进行，那么就导致JS线程一边在修改元素属性，同时GUI线程一边在渲染页面。只要JS线程没有停止对页面做修改，GUI线程就在白费功夫。

  所以GUI线程与JS线程是互斥的，当JS引擎执行的时候，GUI线程会被挂起，GUI线程的更新会被保存在一个队列中，等到JS引擎线程空闲时再被执行。这也是JS的执行会阻塞页面的渲染的本质原因。

* **JS引擎线程**：负责处理JavaScript脚本，例如Chrome的V8引擎。由于GUI线程与JS线程互斥，所以如果JS的执行时间过长，就会造成页面渲染被阻塞。

* 事件触发线程：`onClick` `onKeyUp` `onMouseOver` 等。
* 定时触发器线程：`setTimeout` `setInterval` 等。
* 异步http请求线程：`Ajax` `Axios` `Fetch` 等。

这些线程相互协作，共同完成任务。

**总结**：
* 浏览器本身是多进程的，其中一个进程叫Renderer（渲染）进程。Renderer进程是多线程的，其中一个叫JS引擎线程，也就是我们常说的JS引擎。

* JS引擎线程、GUI线程和其他线程相互协作，共同完成任务。

* JS引擎本身是**单线程**的。这是因为多线程会导致并发性的错误（设想线程A在添加DOM节点，线程B同时在删除同一个DOM节点？:fearful:）。而异步操作本质上并没有改变JS的单线程特性，异步只是通过事件队列（Event queue）假装自己是多线程。

* HTML5中的[Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)也没有破坏JS引擎单线程的特性。Worker线程独立于JS线程（主线程），当Worker线程完成计算后，再将结果通知给JS线程（主线程）。详见[这里](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)。

### JS引擎

一个JavaScript引擎由两部分组成，以著名的V8引擎为例，它包括：
* 内存堆：分配内存的地方
* [调用栈](https://developer.mozilla.org/zh-CN/docs/Glossary/Call_stack)：执行任务的地方

![img](https://raw.githubusercontent.com/Rana1257/Front-end-Collections/master/static/img/JavaScript%E7%9A%84%E6%89%A7%E8%A1%8C%E6%9C%BA%E5%88%B6-%E5%9B%BE1.jpg)

调用栈，也称执行上下文栈，用来管理任务执行的顺序。

&nbsp;

## 事件循环

有了上面这些预备知识，我们可以进入第一个问题：JavaScript的[事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)（Event loop）了。前面我们已经介绍过JS引擎本身是单线程的。这就意味着：
>所有任务需要排队，只有执行完了前一个任务，JS引擎才会继续执行后一个任务。如果前一个任务耗时很长，后一个任务就得一直等着。

所有需要执行的任务都会被 `push` 进调用栈中，等待JS引擎执行。这些任务分为同步任务和异步任务，同步任务在主线程上排队执行，只有前一个任务执行完毕，才能执行后一个任务。异步任务（比如 `Ajax` 请求的回调函数）则会进入任务队列（Task queue）中，等待JS线程的执行。

具体而言，JS引擎执行任务的机制如下：

* 同步任务被 `push` 进调用栈中，等待JS引擎线程的执行，执行完毕后，再 `pop` 出栈。
* 当异步操作返回结果后，会在任务队列中，注册对应的异步任务（通常是对应的异步回调函数）。
* 当JS引擎执行完所有的同步任务后（此时调用栈为空），再从任务队列中取异步任务 `push` 进调用栈中，等待JS引擎执行完毕，再 `pop` 出栈。

JS引擎线程会不断地重复上面的步骤，因此这种机制被叫做**事件循环**。

异步任务又细分为宏任务和微任务，对应的任务队列叫宏任务队列（Tasks）和微任务队列（Microtasks）。这两种任务的执行顺序是：**先执行一个宏任务，然后一次性执行完所有的微任务**（若执行微任务的时候产生了新的微任务，则继续执行新的微任务）。再进行下一轮的循环。

宏任务包括：
* `script`（整体代码本身是一个**宏任务**）。
* `setTimeout`，`setInterval`，`setImmediate` 一类的定时事件。
* I/O （输入输出设备）操作。

微任务包括：
* `Promise` 的回调和所有基于 `Promise` 的技术（比如 `Async await` ）
* [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

需要注意的是：`script` 标签内的代码本身是一个巨大的宏任务，这个任务内部又有同步任务、微任务和宏任务。因此，一开始调用栈为空，JS引擎线程空闲。于是就从任务队列中取任务执行。第一个被 `push` 进调用栈的是 `script` 这个宏任务。会先执行 `script` 内部的同步任务，遇到异步任务后，就将对应的回调函数注册到任务队列中。同步代码执行完毕后， `script` 被 `pop` 出调用栈。由于异步任务是**先执行一个宏任务，再一次性执行完所有的微任务**，所以当 `script` 这个宏任务执行完毕后，就把微任务队列中的微任务依次 `push` 进调用栈让JS引擎线程执行。接着执行下一个宏任务。

举一个简单的事件循环题目：

```javascript
    console.log('script start');

    setTimeout(function () {
    console.log('setTimeout');
    }, 0);

    Promise.resolve()
    .then(function () {
        console.log('promise1');
    })
    .then(function () {
        console.log('promise2');
    });

    console.log('script end');
```

我们来一步步分析：
* 一开始的时候，宏任务队列、微任务队列和调用栈都为空。
* 遇到 `script` 脚本，因此第一个任务是宏任务 `run script`，`push` 进调用栈中让JS引擎执行。现在宏任务队列为 `[run script]`，微任务队列为空，调用栈为 `script`。输出 `'script start'`。
* 遇到 `setTimeout`，它的回调函数 `setTimeout callback` 是一个宏任务，因此 `push` 进宏任务队列。它不会被立即执行，因为此时 `run script` 这个宏任务还没执行完毕，调用栈不为空。现在，宏任务队列为 `[run script, setTimeout callback]`，微任务队列为空，调用栈为 `script`。
* 遇到 `Promise` 的第一个 `then`，这是一个微任务，因此被 `push` 进微任务队列。它也不会被立即执行，因为此时 `run script` 这个任务还没执行完毕，调用栈不为空，也正是如此。第二个 `then` 也不会执行。现在，宏任务队列为 `[run script, setTimeout callback]`，微任务队列为 `[Promise then1]`，调用栈为 `script`。
* 执行到最后，输出 `'script end'`，第一个宏任务 `run script` 执行完毕，从宏任务队列中移除。调用栈中的 `script` 出栈。现在，宏任务队列为 `[setTimeout callback]`，微任务队列为 `[Promise then1]`，调用栈为空。
* 既然一个宏任务执行完了，而且此时调用栈为空，所以可以开始执行微任务了。正好，微任务队列不为空，因此 `Promise then1` 对应的回调函数被 `push` 进调用栈让JS引擎执行。现在，宏任务队列为 `[setTimeout callback]`，微任务队列为 `[Promise then1]`，调用栈为 `Promise callback1`。输出 `'promise1'`。
* 发现还有第二个 `then`，这也是一个微任务，因此也被 `push` 进微任务队列。现在，宏任务队列为 `[setTimeout callback]`，微任务队列为 `[Promise then1, Promise then2]`，调用栈为 `Promise callback1`。
* 因为 `Promise callback1` 执行完了，所以从调用栈和微任务队列中弹出。现在，宏任务队列为 `[setTimeout callback]`，微任务队列为 `[Promise then2]`，调用栈为空。
* 此时微任务队列还有任务，所以继续执行微任务。`Promise callback2` 压入调用栈，输出 `'promise2'`。
* 现在第一次事件循环已经结束了，JS引擎线程会把执行权交给GUI线程，进行重新渲染页面之类的操作。之后再把执行权交给JS引擎线程。
* 进入第二次事件循环。发现宏任务队列中有任务 `setTimeout callback`，因此压栈，输出 `'setTimeout'`，执行完毕后弹栈。
* 结束。

文字说明可能不够直观，可以去[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)查看清晰的动画说明。

**总结**：
* Renderer进程的多个线程相互协作。异步请求、定时器、用户操作所触发的事件会作为任务等待JS引擎线程执行。
* 同步任务被 `push` 进调用栈让JS引擎依次执行。异步任务对应的回调被放入任务队列中。
* JS引擎空闲后，取任务压入调用栈中执行。`script` 脚本本身是一个宏任务，执行完一个宏任务之后，再执行所有的微任务。这是一次循环。
* 执行完毕之后，JS引擎线程把执行权交给GUI线程，重新渲染页面。然后进入下一个循环

&nbsp;

## JavaScript代码的执行过程

JS引擎执行JavaScript代码并不是一行行执行的。JS的执行分为两个过程：

* 预解析（Parser）阶段：JS引擎需要预先对代码进行处理。
* 执行阶段：这时候才真正执行。

举例来说，对于 `var name = 'Rana'`来说，JS引擎会先进行解析，创建一个名为`name`的变量。在之后的执行阶段再把`name`变量赋值为`'Rana'`。

在预解析阶段，JS首先创建了执行上下文。

### 执行上下文

执行上下文（Execution context）的定义可能有点难以给出。简而言之，执行上下文是代码执行之前的准备工作。在JavaScript中有三种类型的执行上下文：

* 全局执行上下文（Global context）：这是默认的执行上下文。
* 函数执行上下文：每个函数都有自己的执行上下文。当一个函数被调用的时候, 都会创建一个新的上下文。
* Eval函数执行上下文（正常情况下都不会用到邪道方法Eval :laughing:）

前面已经提到了，执行上下文栈是一个用来管理执行上下文的栈结构。当 JavaScript 预解释的时候，最先遇到的就是全局代码，因此第一个push进执行上下文栈（Execution context stark）的就是全局执行上下文（Global context）。遇到其他函数代码的时候，对应的函数执行上下文再被push进执行上下文栈。
我们知道栈可以用数组的形式模拟，因此执行上下文栈可以表示为：

```javascript
    const executionContextStack = [
        ...
        executionContextOfInnerFunction,
        executionContextOfOuterFunction,
        globalContext   // <-------------栈底 
    ]
```

总结一下：
JS引擎使用执行上下文栈来管理所有的执行上下文。第一个入栈的是全局执行上下文（Global context），然后各个函数上下文依次入栈。当函数结束运行之后，再依次pop出栈。执行上下文栈保证了所有函数的有序执行。

现在我们继续深入一下执行上下文。一个执行上下文包括三个属性：
* 变量对象（Variable object）：用来存储执行上下文中定义的变量声明和函数声明。全局上下文中的变量对象一般叫全局对象（Global object），函数上下文中的变量对象一般叫活动对象（Active object）（只是叫法上的区别，反正都叫变量对象就对了。）
* 作用域链（Scope chain）：各级执行上下文的变量对象所组成的链表。
* this：决定this的指向

因此，上面的`executionContextOfFunction`可以继续表示为：

```javascript
    executionContextOfFunction = {
        'variableObject': 变量对象,
        'scopeChain': 作用域链,
        'this': 设置this
    }
```

注意：在ES5的标准中，变量对象这个说法被改成了词法环境（LexicalEnvironment）加变量环境（VariableEnvironment）。简而言之，**词法环境**是一种变量/函数名称-->实际的数据/函数对象的映射结构，而**变量环境**是词法环境的一种，你可以在[这里](https://github.com/tc39/ecma262/issues/736)找到官方的解释（反正我是晕了:dizzy_face:）。但是从作用上来讲，无论是变量对象还是XX环境都是用来保存执行上下文中的变量和函数声明的。

### 变量对象

在JS引擎的预解析阶段，创建了执行上下文之后，此时的变量对象包括三个部分：

* 根据函数的参数初始化Arguments对象
* 寻找内部是否有函数声明，若有，则将函数名和函数引用存入变量对象
* 寻找内部是否有变量声明（通过var声明，当然也可以是let或者const），若有，则将变量名存入变量对象中，并初始化为`undefined`

**重点**：同名的函数声明会覆盖变量声明。

举个例子：
```javascript
    function outerFunc(){
        var a = 1
        function innerFunc(){}
        var c = function(){}
    }
```
此时（预解析阶段）的变量对象为：

```javascript
    executionContextOfOuterFunc = {
        'variableObject': {
            arguments:{
                length: 0
            },
            a: undefined,
            innerFunc: reference to function innerFunc(){},
            c: undefined
        },
        'scopeChain': 作用域链,
        'this': 设置this
    }
```

现在你应该明白什么叫**变量提升**了吧？正是因为JS引擎会在预解析阶段，创建执行上下文的变量对象，并对所有变量的声明赋值为 undefined，所以才可以在变量初始化之前使用它（值为 undefined），并且不会抛出错误。再来看看MDN对[变量提升](https://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting)的解释：
>变量提升（Hoisting）被认为是， Javascript中执行上下文 （特别是创建和执行阶段）工作方式的一种认识。从概念的字面意义上说，“变量提升”意味着变量和函数的声明会在物理层面移动到代码的最前面，但这么说并不准确。实际上变量和函数声明在代码里的位置是不会动的，而是在编译阶段被放入内存中。

是不是豁然开朗？

之后在JS引擎执行阶段，会顺序执行代码。根据代码，修改变量对象的值：
```javascript
    executionContextOfOuterFunc = {
        'variableObject': {
            arguments:{
                length: 0
            },
            a: 1,
            innerFunc: reference to function innerFunc(){},
            c: reference to FunctionExpression "c"
        },
        'scopeChain': 作用域链,
        'this': 设置this
    }
```
总结一下：
执行上下文中的变量对象在预解释阶段会先进行解析，等到执行阶段再修改成真正的值。变量提升的意义是教育我们应该先声明一个变量，再使用它，而不是先使用后声明。此外，ES6中的let和const则完全纠正了这种“先使用后声明”的行为。因此我个人觉得能不用var就不用，let和const是更好的选择 :thumbsup:。

### 作用域链

作用域链的完美解释：
>当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

看不懂？没关系，举个例子：
```javascript
    Global object

    function outerFunc(){
        outerFunc Active object

        function innerFunc(){
            innerFunc Active object
        }
    }
```

我们创建了内外两个函数（innerFunc和outerFunc），全局上下文中有变量对象（Global object），两个函数的执行上下文也有各自的变量对象（Active object）。每个函数都有各自的作用域（花括号{}包裹起来的区域）。函数通过一个叫`[[scope]]`的属性表示自己的作用域，函数的作用域总是包含其**父级**作用域中的变量对象。当JS引擎遇到函数代码的时候，首先会创建函数，此时函数的`[[scope]]`为：

```javascript
    outerFunc.[[scope]] = {
        globalContext.VO                 // 全局变量对象
    }

    innerFunc.[[scope]] = {
        executionContextOfOuterFunc.AO,  // 即外部函数的变量对象
        globalContext.VO                 // 全局变量对象
    }
```

当函数创建完毕（执行上下文和变量对象都弄好了之后），会将当前执行上下文的**变量对象**添加到`[[scope]]`的前端。即现在的`[[scope]]`表示为：

```javascript
    innerFunc.[[scope]] = {
        executionContextOfInnerFunc.AO,  // 自己的变量对象
        executionContextOfOuterFunc.AO,  // 外部函数的变量对象
        globalContext.VO                 // 全局变量对象
    }
```

因此，作用域链的本质就是多个执行上下文的变量对象组成的链表。作用域链保证了对执行上下文可以访问的所有变量的有序访问。

对应上面执行上下文的例子，修改一下：
```javascript
    executionContextOfOuterFunc = {
        'variableObject': {
            arguments:{
                length: 0
            },
            a: 1,
            innerFunc: reference to function innerFunc(){},
            c: reference to FunctionExpression "c"
        },
        'scopeChain': [
            executionContextOfOuterFunc.AO,    // 自己的变量对象
            globalContext.VO                   // 全局变量对象
        ],
        'this': 设置this
    }
```

### This

This的指向是在JS引擎预解析阶段，创建执行上下文的时候确定的。在绝大多数情况下，this 永远指向最后调用它的那个对象。
```javascript
    var name = 'Global Name'
    var person = {
        name: 'Rana',
        getName: function(){
            console.log(this.name)
        }
    }
```

* 直接调用：`var p = person.getName; p();`，this指向`window`，因为`p()`是在window下调用的。
* 方法调用：`person.getName()`，this指向`person`对象。
* call，apply，bind：可以指定this的指向。
* new：构造函数会新建一个对象，并将函数的this指向这个新建的对象。

特殊情况发生在[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)中。箭头函数：
>没有自己的this，arguments，super或new.target，并且它不能用作构造函数。箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this。也不能用作构造器，和 new一起用会抛出错误。

```javascript
    var name = 'Global Name'
    var person = {
        name: 'Rana',
        getName: () => {
            console.log(this.name)
        }
    }
```
由于箭头函数没有this，它只会从自己的作用域链的上一层继承this，因此这里的this指向`window`，输出`Global Name`。


**总结**：
现在我们回过头看一下最开始的例子，把前面所有的内容总结一下：
```javascript
    function outerFunc(){
        var a = 1
        function innerFunc(){}
    }
```
1. 进入全局执行上下文，全局执行上下文被压入执行上下文栈，`executionContextStack = [globalContext]`。
2. 全局执行上下文初始化：
    ```javascript
        globalContext = {
            'variableObject': Global object,  // 变量对象是全局对象
            'scopeChain': globalContext.VO,   // 作用域链只包括全局对象
            'this': undefined
        }
    ```
3. JS引擎遇到第一个函数`outerFunc`，创建`outerFunc`函数，此时该函数内部的`[[scope]]`属性为：`outerFunc.[[scope]] = [globalContext.VO]`
4. 创建`outerFunc`的执行上下文`executionContextOfOuterFunc`，push进执行上下文栈：
    ```javascript
        executionContextStack = [
            executionContextOfOuterFunc,
            globalContext
        ]
    ```
5. `outerFunc`的执行上下文初始化，创建变量对象，作用域链和this：
    ```javascript
        executionContextOfOuterFunc = {
            'ActiveObject': {
                arguments: {
                    length: 0                                   // 创建Arguments
                },
                a: undefined,                                   // 创建变量声明
                innerFunc: reference to function innerFunc(){}  // 创建函数声明
            },
            'scopeChain': [ActiveObject, globalContext.VO],     // 作用域链包括自己的变量对象，全局对象
            'this': undefined
        }
    ```
    同时遇到第二个函数`innerFunc`，创建`innerFunc`函数，此时该函数内部的`[[scope]]`属性为：`innerFunc.[[scope]] = [executionContextOfOuterFunc.AO, globalContext.VO]`。创建`innerFunc`的执行上下文`executionContextOfInnerFunc`push进栈：
    ```javascript
        executionContextStack = [
            executionContextOfInnerFunc,
            executionContextOfOuterFunc,
            globalContext
        ]
    ```

6. `innerFunc`的执行上下文初始化，创建变量对象，作用域链和this：
    ```javascript
        executionContextOfInnerFunc = {
            'ActiveObject': {
                arguments: {
                    length: 0                                   // 创建Arguments
                }
            },
            'scopeChain': [ActiveObject, executionContextOfOuterFunc.AO, globalContext.VO],     // 作用域链包括自己的变量对象，全局对象
            'this': undefined
        }
    ```

7. 执行`innerFunc`，根据执行的代码，修改变量对象的值。这里我们省略了执行过程，当`innerFunc`执行完毕之后，从执行上下文栈中弹栈：
    ```javascript
        executionContextStack = [
            executionContextOfOuterFunc,
            globalContext
        ]
    ```
    `outerFunc`也是如此。


### 闭包

只有懂了变量对象，作用域链之后，才能真正理解闭包。MDN对[闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)的定义为：
>函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起构成闭包（closure）。也就是说，闭包可以让你从内部函数访问外部函数作用域。在 JavaScript 中，每当函数被创建，就会在函数生成时生成闭包。

翻译一下：闭包就是**函数**和函数能够访问的**变量对象**的总和。:smile:

因此从理论上来说，JavaScript中所有的函数都是闭包。因为函数都能访问其外部作用域中的变量对象（比如说全局对象），这些**函数**和**全局对象**就形成了闭包。
实际应用中，我们通常在一个函数内部再创建一个函数，那么这个新创建的内部函数就能访问到外部函数作用域中的变量对象，**内部函数**和外部函数的**变量对象**也形成了闭包。例如：

```javascript
    function outerFunc(){
        var a = 1
        function innerFunc(){
            console.log(a)
        }
    }
```
这里的a和`innerFunc`就组成了闭包。

你可能发现了，函数外部是无法访问函数内部的变量对象的（在全局上下文中无法访问到`outerFunc`中的变量a），因为作用域链是从内到外的。而通过使用闭包函数`innerFunc`，我们是可以访问到a的，原因同样是作用域链。因此，闭包的本质就是作用域链的一个特殊应用。

此外，闭包函数还可以使得已经结束运行的函数中的变量保留下来不被垃圾回收机制回收，因为闭包函数的作用域链包含了外部函数的变量对象。看到了吧？这还是因为作用域链。**闭包的本质就是作用域链**