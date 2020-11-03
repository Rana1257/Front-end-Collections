# JS学习记录

#### 1. var 创建的变量是函数作用域内的，若函数内定义变量的时候省略了 var，则创建的是一个全局变量
```javascript
function func1(){
  var name = 'Rana';
}
func1();
console.log(name); // error

function func2(){
  name = 'Rana';
}
func2();
console.log(name); // name
```

#### 2. var 声明提升，使用 var 声明的变量会自动提升到函数作用域的顶部
```javascript
function func(){
  console.log(name);
  var name = 'Rana';
}
func(); // undefined

// 因为等价于

function func(){
  var name;
  console.log(name); //undefined
  name = 'Rana';
}
func();
```

#### 3. let 声明的是块级作用域，而 var 声明的是函数作用域。let 不能在同一个块级作用域中重复地声明同一个变量，let 也不会出现变量提升
```javascript
if(true){
  var name = 'Rana';
  console.log(name); // Rana
}
console.log(name); // Rana

if(true){
  let name = 'Rana';
  console.log(name); // Rana
}
console.log(name); // error: name is not defined
```

#### 4. let 声明的变量不会成为 window 的属性，而 var 声明的会
```javascript
var name = 'Rana';
console.log(window.name); // Rana

let name = 'Rana';
console.log(window.name); //undefined
```

#### 5. for-in 迭代对象的 key，for-of迭代对象的 value

#### 6. typeof 的返回值总结：
```javascript
undefined //表示未定义
boolean //表示布尔值
string //表示字符串
number //表示数字
object //表示对象或者 null
function //表示函数
symbol //表示符号
```

#### 7. 对未声明的变量，只能进行一个操作：typeof，并返回 undefined

#### 8. 数值转换
`Number()`，`parseInt()`和`parseFloat()`三个函数都可以做到数值转换
#### `Number()`转换规则：
`true`转为1，`false`转为0
数值，直接返回
`null`，返回0
`undefined`，返回`NaN`
字符串：包含正负号的小数，整数，十六进制数都可以被转为数字，前导0会被省略；空字符串转为0；其他情况都为`NaN`
对象：使用`valueOf()`方法并按照上述规则转换为数字。若转换结果是`NaN`，则调用`toString()`，再按照字符串转换规则转换
```javascript
Number('Hello') // NaN
Number('') // 0
Number('00011') // 11
Number(true) // 1
```

#### `parseInt()`转换规则：
`parseInt()`从第一个非空格字符开始，若第一个字符不是数值、正负号，则直接返回`NaN`，即空字符串会返回`NaN`。对于符合数值、正负号的字符，则继续依次检验，直到字符串末尾或者遇到非数值字符
```javascript
parseInt('1234blue') // 1234
parseInt('') // NaN
parseInt('0xA') // 10，解释为十六进制数字
parseInt(22.5) // 22，因为小数点不符合数值、正负号，因此到22就停止检验
```
`parseInt()`可以接收第二个参数表示进制数

#### `parseFloat()`转换规则：
`parseFloat()`只解析十进制，不能指定进制数；也忽略前导0，其他与`parseInt()`一样

#### 9. Symbol 类型就是用来创建唯一的记号，进而用作非字符串形式的对象属性。

#### 10. 前缀加和前缀减变量的值都会在语句被求值之前改变，而后缀加和后缀减则是在求值之后改变
```javascript
// 前缀
let age = 29;
let anotherAge = --age + 2
console.log(age) // 28
console.log(anotherAge) // 30

// 后缀
```