# JavaScript的异步

在JavaScript的运行机制中我们已经了解到，JS引擎是单线程的。也就是说，JS引擎一次只能执行一个任务，多个任务需要等待前面的任务完成之后，才能继续执行下面的任务。这种单线程的机制使得JS引擎的执行机制比较简单，我们无需考虑多线程之间的协调通信。单线程的缺点在于如果当前的任务执行时间过长，那么剩余的任务需要排队等待，此时浏览器是处于无响应状态的。因此，我们需要异步：

同步和异步的区别在于：
[同步](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/%E5%BC%82%E6%AD%A5/%E6%A6%82%E5%BF%B5)：多个任务顺序执行。同步有可能会阻塞剩余的任务。
>通常来说，程序都是顺序执行，同一时刻只会发生一件事。如果一个函数依赖于另一个函数的结果，它只能等待那个函数结束才能继续执行，从用户的角度来说，整个程序才算运行完毕。

[异步](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/%E5%BC%82%E6%AD%A5/%E6%A6%82%E5%BF%B5)：JS引擎不必等待异步任务的结束，而是继续执行下去，等到异步任务有了结果之后，再执行对应的回调函数。也就是说，异步不会阻塞剩余的任务。

通过阅读下面的内容，你将会了解到异步JavaScript的实现方式，具体包括：
* 回调函数
* 事件监听
* Promise
* Generator
* Async + await
* 实现一个Promise

## 回调函数

准确的来讲，应该叫异步回调函数。

[异步回调函数](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/%E5%BC%82%E6%AD%A5/%E7%AE%80%E4%BB%8B)（Asynchronous Callback）：等一个耗时的异步操作有了结果之后，再调用的函数，就叫异步回调函数。
>异步callbacks 其实就是函数，只不过是作为参数传递给那些在后台执行的其他函数. 当那些后台运行的代码结束，就调用callbacks函数，通知你工作已经完成，或者其他有趣的事情发生了。

例如：
```javascript
    function myAjax(url){
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.onreadystatechange = callback(xhr.response)
        // 或者是 xhr.onload = callback(xhr.response)
        xhr.responseType = 'json'
        xhr.send()
    }

    myAjax('someUrl')
```
对于 `myAjax` 来说，新建 `XMLHttpRequest` 实例，设置请求方法和调用 `send` 方法发送都是同步执行的。而 `onreadystatechange` ，或者是 `onload` ， `onerror` 则是**异步**执行的。JS引擎不会等待 `myAjax` 返回结果，而是继续向下执行代码。等到得到结果之后，再调用 `callback` 函数。

回调函数非常好用，也容易理解，简单的异步操作使用回调函数完全没有问题。唯一的缺点在于层层嵌套的回调函数（基于上一个异步操作的结果进行下一个异步操作）：

```javascript
    doSomething(result1 => {
        doMoreThing(result1, result2 => {
            doMoreThing(result2, result3 => {
                console.log('终于得到了最终结果：', result3)
            })
        })
    })
```

层层嵌套的回调函数（回调地狱）的问题不是嵌套和缩进导致的可读性降低:sweat_smile:，而是这样的代码的执行顺序比较难以判断，而且出了问题不容易排查（我不知道究竟是哪一步出了问题）。

## 事件监听

异步操作返回的时候触发一个事件，通过监听这个事件，得到异步操作的结果。还是上面的 `myAjax` 的例子，我们把 `onload` 属性改为监听 `load` 事件：

```javascript
    function myAjax(url){
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.addEventListener('load', handelFunc)
        xhr.responseType = 'json'
        xhr.send()
    }
```
这里的handelFunc同样是回调函数。

有些地方还给出了一种基于[发布订阅模式](http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html)的异步解决方案：

>我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做发布订阅模式，又称观察者模式。

可见发布订阅模式还是回调函数＋事件监听。

## Promise

上面的异步回调函数和事件监听都是 old school 的异步解决方案。它们的问题各自出在：嵌套的回调函数耦合度太高，不易维护；事件监听如果错过了就没法拿到结果了。Promise的出现彻底解决了这些问题。

关于Promise的详细例子可以看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)或者阮一峰的[ES6教程](https://es6.ruanyifeng.com/#docs/promise)。
>Promise 是一个对象，用于表示一个异步操作的最终完成 (或失败), 及其结果值。

>所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

有点迷？没关系。简单的说，Promise的含义就是**承诺**：对于一个异步操作，Promise对象**承诺**给出一个最终的结果，这个结果可能是异步操作成功（fulfilled），也可能是失败（rejected）。但无论是哪种结果，Promise都**承诺**这个结果不会改变或者丢失（事件监听如果错过了就没法拿到结果了，而Promise无论什么时候都保存着结果），并且可以根据这个结果，调用对应的回调函数。

继续上面的 `myAjax`：

```javascript
    function myAjaxUsingPromise(url){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open('GET', url, true)
            xhr.onload = () => {
                if(xhr.status === 200){
                    resolve(xhr.response)
                }else{
                    reject(xhr.statusText)
                }
            }
            xhr.responseType = 'json'
            xhr.send()
        })
    }

    myAjaxUsingPromise('someUrl')
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
```

上面的代码返回了一个新的 `Promise` 实例，Promise构造函数的参数是一个函数，该函数接收两个回调函数：`resolve` 作为状态从pending变成fulfilled时的回调，`reject` 作为状态从pending变成rejected时的回调。

简单的说，我们可以传递两个回调函数 `callback1` 和 `callback2` 作为异步操作成功和失败的回调。并且，关键的是，这个阶段**不需要考虑** `callback1` **和** `callback2` **的具体实现**，我们只需要关心异步操作的流程即可。在之后的 `.then .catch` 调用中，再设计回调函数的具体代码。

此外，Promise可以通过链式调用的方式，解决嵌套回调：
```javascript
    doSomething()
        .then(result1 => doMoreThing(result1))
        .then(result2 => doMoreThing(result2))
        .then(result3 => {
            console.log('终于得到了最终结果：', result3)
        })
```

## Generator

[Generator](https://es6.ruanyifeng.com/#docs/generator#%E5%BA%94%E7%94%A8) 函数是 ES6 提供的一种异步编程解决方案。它的特点是可以拥有多个不同的阶段，阶段之间可以暂停。这也是Generator能够实现异步操作的关键：

```javascript
    function* func(){
        console.log('Stage 1')
        yield console.log('Stage 2')
        console.log('Stage 3')
    }

    let a = func()
    a.next()  // 打印 Stage 1 和 Stage 2
    a.next()  // 打印 Stage 3
```
Generator 函数的function关键字与函数名之间有一个 `*` ，函数体内部使用yield表达式，定义不同的阶段。在上面这个例子中，调用 `func` 函数后，不会立即执行，而是会返回一个 `Generator` 对象。通过调用next方法，可以使得 Generator 函数分段执行。

Generator 函数的意义就是把异步的逻辑以同步的方式表达出来：

```javascript
    function* myAjaxUsingGenerator(){
        const response = yield makeAjax('someUrl')
        console.log(response)
    }

    let generatorRunner = myAjaxUsingGenerator()
    generatorRunner.next()
```


## Async


## 实现自己的Promise

为了实现我们自己的Promise，首先需要了解Promise的执行流程，举一个简单的例子：

```javascript
    const p = new Promise((resolve, reject) => {
        console.log('Promise start')
        resolve('RESOLVED!')
    })
    console.log('Promise end')
    p.then((res) => {
        console.log(res)
    })
    // 打印顺序为 Promise start -> Promise end -> RESOLVED!
```

我们来梳理一下Promise执行的流程：
* Promise构造函数接收一个 `executor` 函数，当 `new Promise()` 的时候就会**立即执行** `executor` 中的代码（也就是 `console.log('Promise start')` ）。
* Promise内部的异步任务（也就是 `resolve('RESOLVED!')` ）被放到任务队列中等待执行。
* 收集then中的回调函数（也就是 `(res) => {console.log(res)}` ）。
* 执行任务队列中的异步任务，结果是成功或者失败，执行对应的resolve或reject回调函数。

这其实是一个观察者模式。首先把then中的回调函数收集起来，当触发异步任务的时候，从收集的回调函数中取出回调执行。因此，我们需要两个队列存储回调函数，then方法会把对应的回调函数push进对应的队列中，翻译成代码就是：

```javascript
    class MyPromise{
        constructor(executor){
            this.resolveCallbackQueue = []     // 用于存放 resolve 的回调函数
            this.rejectCallbackQueue = []      // 用于存放 reject 的回调函数
        }
        then(resolveFunc, rejectFunc){         // then方法把 resolve 和 reject 对应的回调函数 push 进队列
            this.resolveCallbackQueue.push(resolveFunc)
            this.rejectCallbackQueue.push(rejectFunc)
        }
    }
```

当 `new Promise()` 的时候就会**立即执行** `executor` 中的代码，因此：

```javascript
    class MyPromise{
        constructor(executor){
            this.resolveCallbackQueue = []
            this.rejectCallbackQueue = []
            executor(resolve, reject)          // 立即执行 executor 函数并传入 resolve 和 reject 两个参数
        }
        then(resolveFunc, rejectFunc){
            this.resolveCallbackQueue.push(resolveFunc)
            this.rejectCallbackQueue.push(rejectFunc)
        }
    }
```

最后，当异步任务返回成功或者失败的结果后，执行对应的resolve或reject回调函数。

```javascript
    class MyPromise{
        constructor(executor){
            this.resolveCallbackQueue = []
            this.rejectCallbackQueue = []
            let resolve = (value) => {
                setTimeout(() => {
                    while(this.resolveCallbackQueue.length){
                        const callback = this.resolveCallbackQueue.shift()
                        callback(value)
                    }
                }, 0)
            }
            let reject = (value) => {
                setTimeout(() => {
                    while(this.rejectCallbackQueue.length){
                        const callback = this.rejectCallbackQueue.shift()
                        callback(value)
                    }
                }, 0)
            }
            executor(resolve, reject)
        }
        then(resolveFunc, rejectFunc){
            this.resolveCallbackQueue.push(resolveFunc)
            this.rejectCallbackQueue.push(rejectFunc)
        }
    }
```

使用 `setTimeout` 的原因是为了模拟异步任务，让回调函数在同步任务完成之后再执行（当然 Promise 属于微任务，这里用 `setTimeout` 只是为了模拟）。现在一个简单的 `Promise` 就实现完成了。

```javascript
    const p = new MyPromise((resolve, reject) => {
        console.log('Promise start')
        resolve('RESOLVED!')
    })
    console.log('Promise end')
    p.then(res => {
        console.log(res)
    })
    // 成功打印 Promise start -> Promise end -> RESOLVED!
```
