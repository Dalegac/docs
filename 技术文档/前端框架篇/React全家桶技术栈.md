# 第一章：React入门
## 1.1React简介
### 1.1.1官网
1. 英文官网：https://reactjs.org/
2. 中文官网：https://react.docschina.org/

### 1.1.2 相关库
1. `react.js`：React核心库。
2. `react-dom.js`：提供操作DOM的react扩展库。
3. `babel.min.js`：解析JSX语法代码转为JS代码的库。

### 1.1.3 
1. 语法:  ReactDOM.render(virtualDOM,containerDOM)
2. 作用: 将虚拟DOM元素渲染到页面中的真实容器DOM中显示
3. 参数说明
    1. 参数一: 纯js或jsx创建的虚拟dom对象
    2. 参数二: 用来包含虚拟DOM元素的真实dom元素对象(一般是一个div)

### 1.1.4 创建虚拟DOM
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>1_使用jsx创建虚拟DOM</title>
</head>
<body>
	<!-- 准备好一个“容器” -->
	<div id="test"></div>

	<!-- 引入react核心库 -->
	<script type="text/javascript" src="../js/react.development.js"></script>
	<!-- 引入react-dom，用于支持react操作DOM -->
	<script type="text/javascript" src="../js/react-dom.development.js"></script>
	<!-- 引入babel，用于将jsx转为js -->
	<script type="text/javascript" src="../js/babel.min.js"></script>

    使用jsx创建虚拟DOM
	<script type="text/babel" > /* 此处一定要写babel */
		//1.创建虚拟DOM
		const VDOM = (  /* 此处一定不要写引号，因为不是字符串 */
			<h1 id="title">
				<span>Hello,React</span>
			</h1>
		)
		//2.渲染虚拟DOM到页面
		ReactDOM.render(VDOM,document.getElementById('test'))
	</script>
	<!-- 使用js创建虚拟DOM -->
	<script type="text/javascript" > 
		//1.创建虚拟DOM
		const VDOM = React.createElement('h1',{id:'title'},React.createElement('span',{},'Hello,React'))
		//2.渲染虚拟DOM到页面
		ReactDOM.render(VDOM,document.getElementById('test'))
	</script>
	/* 
    	关于虚拟DOM：
    		1.本质是Object类型的对象（一般对象）
    		2.虚拟DOM比较“轻”，真实DOM比较“重”，因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性。
    		3.虚拟DOM最终会被React转化为真实DOM，呈现在页面上。
    */
</body>
</html>
```
### 1.1.5 jsx的语法规则
```
jsx语法规则：
	1.定义虚拟DOM时，不要写引号。
	2.标签中混入JS表达式时要用{}。
	3.样式的类名指定不要用class，要用className。
	4.内联样式，要用style={{key:value}}的形式去写。
	5.只有一个根标签
	6.标签必须闭合
	7.标签首字母
		(1).若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错。
		(2).若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。
```

### 1.1.6 JavaScript表达式和语句的区别
```
一定注意区分：【js语句(代码)】与【js表达式】
	1.表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方
		下面这些都是表达式：
			(1). a
			(2). a+b
			(3). demo(1)
			(4). arr.map() 
			(5). function test () {}
	2.语句(代码)：
		下面这些都是语句(代码)：
			(1).if(){}
			(2).for(){}
			(3).switch(){case:xxxx}
```
# 第二章：React面向组件编程
## 2.1基本理解和使用
### 2.1.1 开发者工具
![image](https://images.cnblogs.com/cnblogs_com/dalegac/1825105/o_210226020952React%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7.jpg)
### 2.1.2 组件的定义

1. 函数式组件(适用于简单组件)
```
<script type="text/babel">
    //1.创建函数式组件
    function MyComponent(){
    	console.log(this); //此处的this是undefined，因为babel编译后开启了严格模式
    	return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
    }
    //2.渲染组件到页面
    ReactDOM.render(<MyComponent/>,document.getElementById('test'))
    /* 
    	执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
			1.React解析组件标签，找到了MyComponent组件。
			2.发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。
    */
</script>
```
2. 类式组件（适用于复杂组件）
```
<script type="text/babel">
    //1.创建类式组件
    class MyComponent extends React.Component {
    	render(){
    		//render是放在哪里的？—— MyComponent的原型对象上，供实例使用。
    		//render中的this是谁？—— MyComponent的实例对象 <=> MyComponent组件实例对象。
    		console.log('render中的this:',this);
    		return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
    	}
    }
    //2.渲染组件到页面
    ReactDOM.render(<MyComponent/>,document.getElementById('test'))
    /* 
    	执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
			1.React解析组件标签，找到了MyComponent组件。
			2.发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。
			3.将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。
    */
</script>
```
### 2.1.3. 注意
1. 组件名必须首字母大写
2. 虚拟DOM元素只能有一个根元素
3. 虚拟DOM元素必须有结束标签
### 2.1.4. 渲染类组件标签的基本流程
1. React内部会创建组件实例对象
2. 调用render()得到虚拟DOM, 并解析为真实DOM
3. 插入到指定的页面元素内部

## 2.2 组件的三大核心属性1：state 
> 1. state是组件对象最重要的属性, 值是对象(可以包含多个key-value的组合)
> 2. 组件被称为"状态机",通过更新组件的state来更新对应的页面显示(重新渲染组件)

1. 基本写法（可参考看看）
```
<script type="text/babel">
	//1.创建组件
	class Weather extends React.Component{
		
		//构造器调用几次？ ———— 1次
		constructor(props){
			console.log('constructor');
			super(props)
			//初始化状态
			this.state = {isHot:false,wind:'微风'}
			//解决changeWeather中this指向问题
			this.changeWeather = this.changeWeather.bind(this)
		}

		//render调用几次？ ———— 1+n次 1是初始化的那次 n是状态更新的次数
		render(){
			console.log('render');
			//读取状态
			const {isHot,wind} = this.state
			return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
		}

		//changeWeather调用几次？ ———— 点几次调几次
		changeWeather(){
			//changeWeather放在哪里？ ———— Weather的原型对象上，供实例使用
			//由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
			//类中的方法默认开启了局部的严格模式，所以changeWeather中的this为undefined
			
			console.log('changeWeather');
			//获取原来的isHot值
			const isHot = this.state.isHot
			//严重注意：状态必须通过setState进行更新,且更新是一种合并，不是替换。
			this.setState({isHot:!isHot})
			console.log(this);

			//严重注意：状态(state)不可直接更改，下面这行就是直接更改！！！
			//this.state.isHot = !isHot //这是错误的写法
		}
	}
	//2.渲染组件到页面
	ReactDOM.render(<Weather/>,document.getElementById('test'))
			
</script>
```
2. 简写方式
```
<script type="text/babel">
	//1.创建组件
	class Weather extends React.Component{
		//初始化状态
		state = {isHot:false,wind:'微风'}

		render(){
			const {isHot,wind} = this.state
			return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
		}

		//自定义方法————要用赋值语句的形式+箭头函数
		changeWeather = ()=>{
			const isHot = this.state.isHot
			this.setState({isHot:!isHot})
		}
	}
	//2.渲染组件到页面
	ReactDOM.render(<Weather/>,document.getElementById('test'))
</script>
```
## 2.3 组件的三大核心属性2：props
### 2.3.1 理解
1. 每个组件对象都会有props(properties的简写)属性
2. 组件标签的所有属性都保存在props中

### 2.3.2 作用
1. 通过标签属性从组件外向组件内传递变化的数据
2. 注意: 组件内部不要修改props数据

### 2.3.3 props的基本使用
```
// 创建一个列表展示个人信息【姓名】【性别】【年龄】
<script type="text/babel">
	//创建组件
	class Person extends React.Component{
		render(){
			// console.log(this);
			const {name,age,sex} = this.props
			return (
				<ul>
					<li>姓名：{name}</li>
					<li>性别：{sex}</li>
					<li>年龄：{age+1}</li>
				</ul>
			)
		}
	}
	//渲染组件到页面
	ReactDOM.render(<Person name="jerry" age={19}  sex="男"/>,document.getElementById('test1'))
	ReactDOM.render(<Person name="tom" age={18} sex="女"/>,document.getElementById('test2'))

	const p = {name:'老刘',age:18,sex:'女'}
	// console.log('@',...p);
	// ReactDOM.render(<Person name={p.name} age={p.age} sex={p.sex}/>,document.getElementById('test3'))
	ReactDOM.render(<Person {...p}/>,document.getElementById('test3'))
</script>
```
### 2.3.4 对props进行限制
第一种方式（React v15.5 开始已弃用）
```
Person.propTypes = {
 name: React.PropTypes.string.isRequired,
 age: React.PropTypes.number
}
```
第二种方式（新）：使用prop-types库进限制（需要引入prop-types库）
```
Person.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number. 
}
```

示例代码
```
<!-- 引入prop-types，用于对组件标签属性进行限制 -->
<script type="text/javascript" src="../js/prop-types.js"></script>

<script type="text/babel">
	//创建组件
	class Person extends React.Component{
		render(){
			// console.log(this);
			const {name,age,sex} = this.props
			//props是只读的
			//this.props.name = 'jack' //此行代码会报错，因为props是只读的
			return (
				<ul>
					<li>姓名：{name}</li>
					<li>性别：{sex}</li>
					<li>年龄：{age+1}</li>
				</ul>
			)
		}
	}
	//对标签属性进行类型、必要性的限制
	Person.propTypes = {
		name:PropTypes.string.isRequired, //限制name必传，且为字符串
		sex:PropTypes.string,//限制sex为字符串
		age:PropTypes.number,//限制age为数值
		speak:PropTypes.func,//限制speak为函数
	}
	//指定默认标签属性值
	Person.defaultProps = {
		sex:'男',//sex默认值为男
		age:18 //age默认值为18
	}
	//渲染组件到页面
	ReactDOM.render(<Person name={100} speak={speak}/>,document.getElementById('test1'))
	ReactDOM.render(<Person name="tom" age={18} sex="女"/>,document.getElementById('test2'))

	const p = {name:'老刘',age:18,sex:'女'}
	// console.log('@',...p);
	// ReactDOM.render(<Person name={p.name} age={p.age} sex={p.sex}/>,document.getElementById('test3'))
	ReactDOM.render(<Person {...p}/>,document.getElementById('test3'))

	function speak(){
		console.log('我说话了');
	}
</script>
```
### 2.3.5 props的简写方式
```
<!-- 引入prop-types，用于对组件标签属性进行限制 -->
<script type="text/javascript" src="../js/prop-types.js"></script>

<script type="text/babel">
	//创建组件
	class Person extends React.Component{

		constructor(props){
			//构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
			// console.log(props);
			super(props)
			console.log('constructor',this.props);
		}

		//对标签属性进行类型、必要性的限制
		static propTypes = {
			name:PropTypes.string.isRequired, //限制name必传，且为字符串
			sex:PropTypes.string,//限制sex为字符串
			age:PropTypes.number,//限制age为数值
		}

		//指定默认标签属性值
		static defaultProps = {
			sex:'男',//sex默认值为男
			age:18 //age默认值为18
		}
		
		render(){
			// console.log(this);
			const {name,age,sex} = this.props
			//props是只读的
			//this.props.name = 'jack' //此行代码会报错，因为props是只读的
			return (
				<ul>
					<li>姓名：{name}</li>
					<li>性别：{sex}</li>
					<li>年龄：{age+1}</li>
				</ul>
			)
		}
	}

	//渲染组件到页面
	ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
</script>
```
### 2.3.6 函数组件使用props
```
<!-- 引入prop-types，用于对组件标签属性进行限制 -->
<script type="text/javascript" src="../js/prop-types.js"></script>

<script type="text/babel">
	//创建组件
	function Person (props){
		const {name,age,sex} = props
		return (
				<ul>
					<li>姓名：{name}</li>
					<li>性别：{sex}</li>
					<li>年龄：{age}</li>
				</ul>
			)
	}
	Person.propTypes = {
		name:PropTypes.string.isRequired, //限制name必传，且为字符串
		sex:PropTypes.string,//限制sex为字符串
		age:PropTypes.number,//限制age为数值
	}

	//指定默认标签属性值
	Person.defaultProps = {
		sex:'男',//sex默认值为男
		age:18 //age默认值为18
	}
	//渲染组件到页面
	ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
</script>
```
## 2.4 组件的三大核心属性3：refs与事件处理
### 2.4.1 字符串形式的ref（尽量不适用）
```
<script type="text/babel">
	//创建组件
	class Demo extends React.Component{
		//展示左侧输入框的数据
		showData = ()=>{
			const {input1} = this.refs
			alert(input1.value)
		}
		//展示右侧输入框的数据
		showData2 = ()=>{
			const {input2} = this.refs
			alert(input2.value)
		}
		render(){
			return(
				<div>
					<input ref="input1" type="text" placeholder="点击按钮提示数据"/>&nbsp;
					<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
					<input ref="input2" onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>
				</div>
			)
		}
	}
	//渲染组件到页面
	ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
</script>
```
### 2.4.2 回调形式的ref
```
<script type="text/babel">
	//创建组件
	class Demo extends React.Component{
		//展示左侧输入框的数据
		showData = ()=>{
			const {input1} = this
			alert(input1.value)
		}
		//展示右侧输入框的数据
		showData2 = ()=>{
			const {input2} = this
			alert(input2.value)
		}
		render(){
			return(
				<div>
					<input ref={c => this.input1 = c } type="text" placeholder="点击按钮提示数据"/>&nbsp;
					<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
					<input onBlur={this.showData2} ref={c => this.input2 = c } type="text" placeholder="失去焦点提示数据"/>&nbsp;
				</div>
			)
		}
	}
	//渲染组件到页面
	ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
</script>
```
### 2.4.3 回调ref中回调执行次数的问题
内联形式的回调ref，函数会被调用两次；
类的绑定函数形式，调用一次；
```
<script type="text/babel">
	//创建组件
	class Demo extends React.Component{

		state = {isHot:false}

		showInfo = ()=>{
			const {input1} = this
			alert(input1.value)
		}

		changeWeather = ()=>{
			//获取原来的状态
			const {isHot} = this.state
			//更新状态
			this.setState({isHot:!isHot})
		}

		saveInput = (c)=>{
			this.input1 = c;
			console.log('@',c);
		}

		render(){
			const {isHot} = this.state
			return(
				<div>
					<h2>今天天气很{isHot ? '炎热':'凉爽'}</h2>
					{/*<input ref={(c)=>{this.input1 = c;console.log('@',c);}} type="text"/><br/><br/>*/}
					<input ref={this.saveInput} type="text"/><br/><br/>
					<button onClick={this.showInfo}>点我提示输入的数据</button>
					<button onClick={this.changeWeather}>点我切换天气</button>
				</div>
			)
		}
	}
	//渲染组件到页面
	ReactDOM.render(<Demo/>,document.getElementById('test'))
</script>
```
### 2.4.4 createRef创建ref容器
```
<script type="text/babel">
	//创建组件
	class Demo extends React.Component{
		/* 
			React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点,该容器是“专人专用”的
		 */
		myRef = React.createRef()
		myRef2 = React.createRef()
		//展示左侧输入框的数据
		showData = ()=>{
			alert(this.myRef.current.value);
		}
		//展示右侧输入框的数据
		showData2 = ()=>{
			alert(this.myRef2.current.value);
		}
		render(){
			return(
				<div>
					<input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>&nbsp;
					<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
					<input onBlur={this.showData2} ref={this.myRef2} type="text" placeholder="失去焦点提示数据"/>&nbsp;
				</div>
			)
		}
	}
	//渲染组件到页面
	ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
</script>
```

### 2.4.5 事件处理
1. 通过onXxx属性指定事件处理函数(注意大小写)
    1. React使用的是自定义(合成)事件, 而不是使用的原生DOM事件
    2. React中的事件是通过事件委托方式处理的(委托给组件最外层的元素)
2. 通过event.target得到发生事件的DOM元素对象

示例代码
```
<script type="text/babel">
	//创建组件
	class Demo extends React.Component{
		/* 
			(1).通过onXxx属性指定事件处理函数(注意大小写)
				a.React使用的是自定义(合成)事件, 而不是使用的原生DOM事件 —————— 为了更好的兼容性
				b.React中的事件是通过事件委托方式处理的(委托给组件最外层的元素) ————————为了的高效
			(2).通过event.target得到发生事件的DOM元素对象 ——————————不要过度使用ref
		 */
		//创建ref容器
		myRef = React.createRef()
		myRef2 = React.createRef()

		//展示左侧输入框的数据
		showData = (event)=>{
			console.log(event.target);
			alert(this.myRef.current.value);
		}

		//展示右侧输入框的数据
		showData2 = (event)=>{
			alert(event.target.value);
		}

		render(){
			return(
				<div>
					<input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>&nbsp;
					<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
					<input onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>&nbsp;
				</div>
			)
		}
	}
	//渲染组件到页面
	ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
</script>
```
## 2.5 收集表单数据
> 受控组件：页面中说有输入类的DOM（比如：input，select，checkbox），随着用户的输入，将输入的内容维护到状态state中去，等需要用的时候，从状态中取出来。这就属于受控组件。（类比于Vue的双向数据绑定）。现用现取就是非受控，随着输入维护状态就是受控。非受控组件使用ref实现，受控组件的优势能够减少ref的使用。
### 2.5.1 非受控组件

```
<script type="text/babel">
	//创建组件
	class Login extends React.Component{
		handleSubmit = (event)=>{
			event.preventDefault() //阻止表单提交
			const {username,password} = this
			alert(`你输入的用户名是：${username.value},你输入的密码是：${password.value}`)
		}
		render(){
			return(
				<form onSubmit={this.handleSubmit}>
					用户名：<input ref={c => this.username = c} type="text" name="username"/>
					密码：<input ref={c => this.password = c} type="password" name="password"/>
					<button>登录</button>
				</form>
			)
		}
	}
	//渲染组件
	ReactDOM.render(<Login/>,document.getElementById('test'))
</script>
```
### 2.5.2 受控组件

```
<script type="text/babel">
	//创建组件
	class Login extends React.Component{

		//初始化状态
		state = {
			username:'', //用户名
			password:'' //密码
		}

		//保存用户名到状态中
		saveUsername = (event)=>{
			this.setState({username:event.target.value})
		}

		//保存密码到状态中
		savePassword = (event)=>{
			this.setState({password:event.target.value})
		}

		//表单提交的回调
		handleSubmit = (event)=>{
			event.preventDefault() //阻止表单提交
			const {username,password} = this.state
			alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
		}

		render(){
			return(
				<form onSubmit={this.handleSubmit}>
					用户名：<input onChange={this.saveUsername} type="text" name="username"/>
					密码：<input onChange={this.savePassword} type="password" name="password"/>
					<button>登录</button>
				</form>
			)
		}
	}
	//渲染组件
	ReactDOM.render(<Login/>,document.getElementById('test'))
</script>
```
### 2.6 高阶函数和函数柯里化
### 2.6.1 基本概念
```
高阶函数：如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数。
				1.若A函数，接收的参数是一个函数，那么A就可以称之为高阶函数。
				2.若A函数，调用的返回值依然是一个函数，那么A就可以称之为高阶函数。
				常见的高阶函数有：Promise、setTimeout、arr.map()等等

函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。 
	function sum(a){
		return(b)=>{
			return (c)=>{
				return a+b+c
			}
		}
	}
```
### 2.6.2 示例代码
```
//创建组件
class Login extends React.Component{
	//初始化状态
	state = {
		username:'', //用户名
		password:'' //密码
	}

	//保存表单数据到状态中
	saveFormData = (dataType)=>{
		return (event)=>{
			this.setState({[dataType]:event.target.value})
		}
	}

	//表单提交的回调
	handleSubmit = (event)=>{
		event.preventDefault() //阻止表单提交
		const {username,password} = this.state
		alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
	}
	render(){
		return(
			<form onSubmit={this.handleSubmit}>
				用户名：<input onChange={this.saveFormData('username')} type="text" name="username"/>
				密码：<input onChange={this.saveFormData('password')} type="password" name="password"/>
				<button>登录</button>
			</form>
		)
	}
}
//渲染组件
ReactDOM.render(<Login/>,document.getElementById('test'))
```
## 2.7 组件的生命周期
### 2.7.1 理解
1. 组件从创建到死亡它会经历一些特定的阶段。
2. React组件中包含一系列勾子函数(生命周期回调函数),会在特定的时刻调用。
3. 我们在定义组件时，会在特定的生命周期回调函数中，做特定的工作。

### 2.7.2 生命周期流程图(旧)
![image](https://note.youdao.com/yws/api/personal/file/CAA3B1141398461ABDF949249072A201?method=download&shareKey=7b75d75c486dc54de58d8bd23147e8d6)

生命周期的三个阶段（旧）
1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
    1. constructor()
    2. componentWillMount()
    3. render()
    4. componentDidMount()
2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发
    1. shouldComponentUpdate()
    2. componentWillUpdate()
    3. render()
    4. componentDidUpdate()
3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
    1. componentWillUnmount()

```
/* 
1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
	1.	constructor()
	2.	componentWillMount()
	3.	render()
	4.	componentDidMount() =====> 常用
	    一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
2. 更新阶段: 由组件内部this.setSate()或父组件render触发
	1.	shouldComponentUpdate()
	2.	componentWillUpdate()
	3.	render() =====> 必须使用的一个
	4.	componentDidUpdate()
3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
	1.	componentWillUnmount()  =====> 常用
	    一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息
*/
```
### 2.7.3 生命周期流程图(新)
![image](https://note.youdao.com/yws/api/personal/file/56CFE17764CC45C080A38C501ABB5CA5?method=download&shareKey=8fc6ee84f9e3e627f00fd4453d055777)

生命周期的三个阶段（新）

1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
    1. constructor()
    2. getDerivedStateFromProps 
    3. render()
    4. componentDidMount()
2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发
    1. getDerivedStateFromProps
    2. shouldComponentUpdate()
    3. render()
    4. getSnapshotBeforeUpdate:这个钩子常常用来获取更新前的DOM信息和组件状态信息
    5. componentDidUpdate()
3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
    1. componentWillUnmount()
```
/* 
1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
	1.	constructor()
	2.	getDerivedStateFromProps 
	3.	render()
	4.	componentDidMount() =====> 常用
		一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发
	1.	getDerivedStateFromProps
	2.	shouldComponentUpdate()
	3.	render()
	4.	getSnapshotBeforeUpdate
	5.	componentDidUpdate()
3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
	1.	componentWillUnmount()  =====> 常用
		一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息
*/
```
### 2.7.4 重要的勾子
1. render：初始化渲染或更新渲染调用
2. componentDidMount：开启监听, 发送ajax请求
3. componentWillUnmount：做一些收尾工作, 如: 清理定时器

### 2.7.5 即将废弃的勾子
1. componentWillMount
2. componentWillReceiveProps
3. componentWillUpdate

现在使用会出现警告，下一个大版本需要加上UNSAFE_前缀才能使用，以后可能会被彻底废弃，不建议使用。

### 2.7.6 Diffing算法
![image](https://note.youdao.com/yws/api/personal/file/2353537E8B60428285E27EFB0A2CEED8?method=download&shareKey=faa39c0ea2c37f96d15d9e4832221291)
### 2.7.7 react中key的作用
```
/*
1). react/vue中的key有什么作用？（key的内部原理是什么？）
2). 为什么遍历列表时，key最好不要用index?

1. 虚拟DOM中key的作用：
	1). 简单的说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用。

	2). 详细的说: 当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】,随后React进行【新虚拟DOM】与【旧虚拟DOM】的diff比较，比较规则如下：

		a. 旧虚拟DOM中找到了与新虚拟DOM相同的key：
			(1).若虚拟DOM中内容没变, 直接使用之前的真实DOM
			(2).若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM

		b. 旧虚拟DOM中未找到与新虚拟DOM相同的key:
		    根据数据创建新的真实DOM，随后渲染到到页面
					
2. 用index作为key可能会引发的问题：
		1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
						会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。

		2. 如果结构中还包含输入类的DOM：
						会产生错误DOM更新 ==> 界面有问题。
						
		3. 注意！如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，
			仅用于渲染列表用于展示，使用index作为key是没有问题的。
	
3. 开发中如何选择key?:
		1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
		2.如果确定只是简单的展示数据，用index也是可以的。
*/
```

# 第三章：React应用（基于React脚手架）
## 3.1 使用create-react-app创建react应用
### 3.1.1react脚手架
1.xxx脚手架: 用来帮助程序员快速创建一个基于xxx库的模板项目
    
    1.包含了所有需要的配置（语法检查、jsx编译、devServer…）
    2.下载好了所有相关的依
    3.可以直接运行一个简单效果
    
2.react提供了一个用于创建react项目的脚手架库: create-react-app

3.项目的整体技术架构为:  react + webpack + es6 + eslint

4.使用脚手架开发的项目的特点: 模块化, 组件化, 工程化
### 3.1.2创建项目并启动
- **第一步**，全局安装：`npm i -g create-react-app`
- **第二步**，切换到想创建的目录，使用命令：`create-react-app hello-react`
- **第三步**，进入项目文件夹：`cd hello-react`
- **第四步**，启动项目：`npm start`

### 3.1.3react脚手架项目结构

```
react_staging               项目名称
├── package.json            包管理文件
├── public                  静态资源文件夹
│   ├── favicon.ico         网页页签图标
│   ├── index.html          主页面
│   ├── logo192.png         logo图
│   ├── logo512.png         logo图
│   ├── manifest.json       应用加壳的配置文件
│   └── robots.txt          爬虫配置文件
├── README.md               项目说明文件
├── src                     源码文件
│   ├── App.css             组件的样式文件
│   ├── App.js              App组件
│   ├── App.test.js         用于给App组件做测试
│   ├── index.css           入口样式（全局通用样式）
│   ├── index.js            入口文件
│   ├── logo.svg            logo图
│   ├── reportWebVitals.js  页面性能分析文件（需要web-vitals库的支持）
│   └── setupTests.js       组件单元测试的文件（需要jest-dom库的支持）
└── yarn.lock
```

```
public/index.html

<!DOCTYPE html>
<html lang="en">
  <head>
		<meta charset="utf-8" />
		<!-- %PUBLIC_URL%代表public文件夹的路径 -->
		<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
		<!-- 开启理想视口，用于做移动端网页的适配 -->
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<!-- 用于配置浏览器页签+地址栏的颜色(仅支持安卓手机浏览器)兼容性差 -->
        <meta name="theme-color" content="red" />
        <!-- 用于描述自身网页内容的，便于搜索引擎搜索 -->
        <meta name="description" content="Web site created using create-react-app"/>
		<!-- 用于指定网页添加到手机主屏幕后的图标,仅适用于苹果手机 -->
		<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
		<!-- 应用加壳时的配置文件，说明、图标、权限配置 -->
		<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
		<!-- 若浏览器不支持js则展示标签中的内容 -->
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

```
src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// render函数只执行一次，将App组件渲染出来
ReactDOM.render(

// React.StrictMode检查代码存在不合理的地方
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// 页面性能检测
reportWebVitals();

```

### 3.1.4 vscode插件

> ES7 React/Redux/GraphQL/React-Native snippets

可以用很多编写react文件时的快捷键。


### 3.1.5 样式模块化
> 每个组件有自己的样式文件（index.css），在一起引入同一个组件中时，同名样式会在合并时，被后引入的组件样式覆盖。

解决办法：

第一种：在样式外包裹一层样式名，这样就通过增加层级，避免了重名问题。

第二种：将样式文件重命名为`index.module.css`,再引入和使用（使用较少）。
```
import React,{Component} from 'react'
import hello from './index.module.css'

export default class Hello extends Component{
	render(){
		return <h2 className={hello.title}>Hello,React!</h2>
	}
}
```

### 3.1.6 功能界面的组件化编码流程（通用）
1. 拆分组件: 拆分界面,抽取组件
2. 实现静态组件: 使用组件实现静态页面效果
3. 实现动态组件
    1. 动态显示初始化数据
        1. 数据类型
        2. 数据名称
        3. 保存在哪个组件?
    2. 交互(从绑定事件监听开始)

```
/*
    随机生成字符串的第三方库uuid,nanoid。其中uuid偏大。
    安装方法
*/

npm i uuid/nanoid
yarn add uuid/nanoid

// 引入方法
import {nanoid} from 'nanoid'
//调用方法,返回随机字符串
nanoid()

```

```
// 鼠标移入移除效果
export default class Item extends Component{
    
    state = {mouse:false}
    handleMouse = (flag) =>{
        return ()=>{
            this.setState({mouse:flag})
        }
    }
    
    render() {
        const {name,done} = this.props
        const {mouse} = this.state
        return (
            <li style={{backgroundColor:mouse?'#ddd':'white'}} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
                <label>
                    <input type='checkbox' defaultChecked={done}/>
                    <span>{name}</span>
                </label>
                <button className='btn btn-danger' style={{display:mouse?:'block':'none'}}>删除</button>
            </li>
        )
    }
}

```

```
// 安装react的props添加类型和必要性限制

yarn add prop-types

// 引入
import PropTypes from 'prop-types'

// 使用
static propTypes = {
    addTodo: PropTypes.func.isRequired
}
```

### 3.1.7 todoList案例相关知识点
```
1.拆分组件、实现静态组件，注意：className、style的写法
2.动态初始化列表，如何确定将数据放在哪个组件的state中？
			——某个组件使用：放在其自身的state中
			——某些组件使用：放在他们共同的父组件state中（官方称此操作为：状态提升）
3.关于父子之间通信：
		1.【父组件】给【子组件】传递数据：通过props传递
		2.【子组件】给【父组件】传递数据：通过props传递，要求父提前给子传递一个函数
4.注意defaultChecked 和 checked的区别，类似的还有：defaultValue 和 value
5.状态在哪里，操作状态的方法就在哪里
```

# 第四章：React ajax
## 4.1 理解
### 4.1.1 前置说明
1. React本身只关注于界面, 并不包含发送ajax请求的代码（不提供）
2. 前端应用需要通过ajax请求与后台进行交互(json数据)
3. react应用中需要集成第三方ajax库(或自己封装)


### 4.1.2. 常用的ajax请求库
1. jQuery: 比较重, 如果需要另外引入不建议使用
2. axios: 轻量级, 建议使用
    1. 封装XmlHttpRequest对象的ajax
    2. promise风格
    3. 可以用在浏览器端和node服务器端


## 4.2 axios
### 4.2.1 文档
>https://github.com/axios/axios
```
// 安装
yarn add axios
```

> 跨域问题：跨域问题的本质是同源策略的限制

### 4.2.2 react脚手架配置代理总结



#### 方法一

> 在package.json中追加如下配置

```json
"proxy":"http://localhost:5000"

```

说明：

1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：不能配置多个代理。
3. 工作方式：上述方式配置代理，当请求了**3000不存在的资源**(即public文件夹下无资源)时，那么该请求会转发给5000 （优先匹配前端资源）
4. 是方法二的简写



#### 方法二

1. 第一步：创建代理配置文件

   ```
   在src下创建配置文件：src/setupProxy.js
   ```

2. 编写setupProxy.js配置具体代理规则：

   ```js
   // 代码使用的是CJS的语法不是ES6的语法。因为是给webpack使用的，用的node
   
   // react脚手架预下载的中间件
   const proxy = require('http-proxy-middleware')
   
   module.exports = function(app) {
     app.use(
       proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
         target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
         changeOrigin: true, //控制服务器接收到的请求头中host字段的值
         /*
         	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
         	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
         	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
         */
         pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
       }),
       proxy('/api2', { 
         target: 'http://localhost:5001',
         changeOrigin: true,
         pathRewrite: {'^/api2': ''}
       })
     )
   }
   ```

说明：

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。


## 4.3 案例—github用户搜索
### 4.3.1 结构赋值技巧
```js
const this = { keyWordElement : {value:'javascript'} }
// 结构且重命名
const { keyWordElement : { value : keyWord}}=this

console.log(keyWord)
```
### 4.3.2  设置cors在服务端解决跨域问题
>后端解决跨域的一劳永逸的方法，只需要加上特殊的响应头。所有的网站都能访问你。
### 4.3.3 更新state
```
import React, { Component } from 'react'
import Search from './components/Search'
import List from './components/List'

export default class App extends Component {

	state = { //初始化状态
		users:[], //users初始值为数组
		isFirst:true, //是否为第一次打开页面
		isLoading:false,//标识是否处于加载中
		err:'',//存储请求相关的错误信息
	} 

	//更新App的state
	updateAppState = (stateObj)=>{
		this.setState(stateObj)
	}

	render() {
		return (
			<div className="container">
				<Search updateAppState={this.updateAppState}/>
				<List {...this.state}/>
			</div>
		)
	}
}
```

## 4.4 消息订阅-发布机制
### 4.4.1 工具库
> 采用主流的[PubSubJS](https://github.com/mroderick/PubSubJS)


### 4.4.2 安装
```
npm install pubsub-js --save

// 或者
yarn add pubsub-js
```
### 4.4.3 使用
1. 首先引入模块
```
import PubSub from 'pubsub-js'

// or when using CommonJS
const PubSub = require('pubsub-js');
```

2. 基础用法
```
// create a function to subscribe to topics
var mySubscriber = function (msg, data) {
    console.log( msg, data );
};

// add the function to the list of subscribers for a particular topic
// we're keeping the returned token, in order to be able to unsubscribe
// from the topic later on
var token = PubSub.subscribe('MY TOPIC', mySubscriber);

// publish a topic asynchronously
PubSub.publish('MY TOPIC', 'hello world!');

// publish a topic synchronously, which is faster in some environments,
// but will get confusing when one topic triggers new topics in the
// same execution chain
// USE WITH CAUTION, HERE BE DRAGONS!!!
PubSub.publishSync('MY TOPIC', 'hello world!');
```


3. 组件中使用
```
//  组件A 订阅
componentDidMount(){
	this.token = PubSub.subscribe('atguigu',(_,stateObj)=>{
		this.setState(stateObj)
	})
}

componentWillUnmount(){
	PubSub.unsubscribe(this.token)
}
// 组件B 发布
search = ()=>{
	//获取用户的输入(连续解构赋值+重命名)
	const {keyWordElement:{value:keyWord}} = this
	//发送请求前通知List更新状态
	PubSub.publish('atguigu',{isFirst:false,isLoading:true})
	//发送网络请求
	axios.get(`/api1/search/users?q=${keyWord}`).then(
		response => {
			//请求成功后通知List更新状态
			PubSub.publish('atguigu',{isLoading:false,users:response.data.items})
		},
		error => {
			//请求失败后通知App更新状态
			PubSub.publish('atguigu',{isLoading:false,err:error.message})
		}
	)
}
```
## 4.5 扩展：Fetch
>`jQuey`和`axios`都是基于XMLHttpRequest的api封装的。fetch和xhr是一个级别的。内置的方法，直接可用，promise风格。
### 4.5.1. 文档
1. https://github.github.io/fetch/
2. https://segmentfault.com/a/1190000003810652
3. https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch
4. https://fetch.spec.whatwg.org/

### 4.5.2. 特点
1. fetch: 原生函数，不再使用XmlHttpRequest对象提交ajax请求
2. 老版本浏览器可能不支持
3. Fetch 请求默认是不带 cookie 的，需要设置 fetch(url, {credentials: 'include'})
4. 服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
### 4.5.3 案例
```
search = async()=>{
	//获取用户的输入(连续解构赋值+重命名)
	const {keyWordElement:{value:keyWord}} = this
	//发送请求前通知List更新状态
	PubSub.publish('atguigu',{isFirst:false,isLoading:true})
		
	//发送网络请求---使用fetch发送（未优化）
	/* fetch(`/api1/search/users2?q=${keyWord}`).then(
		response => {
			console.log('联系服务器成功了');
			return response.json()
		},
		error => {
			console.log('联系服务器失败了',error);
			return new Promise(()=>{})
		}
	).then(
		response => {console.log('获取数据成功了',response);},
		error => {console.log('获取数据失败了',error);}
	) */

	//发送网络请求---使用fetch发送（优化）
	try {
		const response= await fetch(`/api1/search/users2?q=${keyWord}`)
		const data = await response.json()
		console.log(data);
		PubSub.publish('atguigu',{isLoading:false,users:data.items})
	} catch (error) {
		console.log('请求出错',error);
		PubSub.publish('atguigu',{isLoading:false,err:error.message})
	}
}
```
## 4.6 github搜索案例相关知识点

1. 设计状态时要考虑全面，例如带有网络请求的组件，要考虑请求失败怎么办(初始状态、请求中、请求成功、请求失败)。
2. ES6小知识点：解构赋值+重命名
```
	let obj = {a:{b:1}}
	const {a} = obj; //传统解构赋值
	const {a:{b}} = obj; //连续解构赋值
	const {a:{b:value}} = obj; //连续解构赋值+重命名
```
3. 消息订阅与发布机制
	1. 先订阅，再发布（理解：有一种隔空对话的感觉）
	2. 适用于任意组件间通信
	3. 要在组件的componentWillUnmount中取消订阅
4. fetch发送请求（关注分离的设计思想）
```
	try {
		const response= await fetch(`/api1/search/users2?q=${keyWord}`)
		const data = await response.json()
		console.log(data);
	} catch (error) {
		console.log('请求出错',error);
	}
```
# 第五章：React路由
## 5.1 相关理解
### 5.1.1 SPA的理解
1. 单页Web应用（single page web application，SPA）。
2. 整个应用只有一个完整的页面。
3. 点击页面中的链接不会刷新页面，只会做页面的局部更新。
4. 数据都需要通过ajax请求获取, 并在前端异步展现。

### 5.1.2. 路由的理解
1. 什么是路由?
    1. 一个路由就是一个映射关系(key:value)
    2. key为路径, value可能是function或component
2. 路由分类
    1. 后端路由：
        1. 理解： value是function, 用来处理客户端提交的请求。
        2. 注册路由： router.get(path, function(req, res))
        3. 工作过程：当node接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据
    2. 前端路由：
        1. 浏览器端路由，value是component，用于展示页面内容。
        2. 注册路由: <Route path="/test" component={Test}>
        3. 工作过程：当浏览器的path变为/test时,当前路由组件就会变为Test组件

### 5.1.3 前端路由基石history

```
<script type="text/javascript">
		// let history = History.createBrowserHistory() //方法一，直接使用H5推出的history身上的API，旧浏览器可能不支持
		let history = History.createHashHistory() //方法二，hash值（锚点），兼容性特别好

		function push (path) {
			history.push(path)
			return false
		}

		function replace (path) {
			history.replace(path)
		}

		function back() {
			history.goBack()
		}

		function forword() {
			history.goForward()
		}

		history.listen((location) => {
			console.log('请求路由路径变化了', location)
		})
	</script>
```
### 5.1.3. react-router-dom的理解
1. react的一个插件库。
2. 专门用来实现一个SPA应用。
3. 基于react的项目基本都会用到此库。


```
// 安装
yarn add react-router-dom
```
## 5.2. react-router-dom相关API
### 5.2.1. 内置组件
1. <BrowserRouter>
2. <HashRouter>
3. <Route>
4. <Redirect>
5. <Link>
6. <NavLink>
7. <Switch>

### 5.2.2. 其它
1. history对象
2. match对象
3. withRouter函数

## 5.3 路由的基本使用
1. 明确好界面中的导航区、展示区
2. 导航区的a标签改为Link标签
			<Link to="/xxxxx">Demo</Link>
3. 展示区写Route标签进行路径的匹配
			<Route path='/xxxx' component={Demo}/>
4. <App>的最外侧包裹了一个<BrowserRouter>或<HashRouter>

## 5.4 路由组件与一般组件
```
1. 写法不同：
    一般组件：<Demo/>
	路由组件：<Route path="/demo" component={Demo}/>
2. 存放位置不同：
	一般组件：components
	路由组件：pages
3. 接收到的props不同：
	一般组件：写组件标签时传递了什么，就能收到什么
	路由组件：接收到三个固定的属性
		history:
				go: ƒ go(n)
				goBack: ƒ goBack()
				goForward: ƒ goForward()
				push: ƒ push(path, state)
				replace: ƒ replace(path, state)
		location:
				pathname: "/about"
				search: ""
				state: undefined
		match:
				params: {}
				path: "/about"
				url: "/about"
```

## 5.5 NavLink与封装NavLink
1. NavLink可以实现路由链接的高亮，通过activeClassName指定样式名
2. 标签体内容是一个特殊的标签属性
3. 同各国this.props.children可以获取组件标签体内容

## 5.6 Switch的使用
1. 通常情况下，path和component是一一对应的关系。
2. Switch可以提高路由匹配效率(单一匹配)。

## 5.7 解决多级路径刷新页面样式丢失的问题
1. public/index.html 中 引入样式时不写 ./ 写 / （常用）
2. public/index.html 中 引入样式时不写 ./ 写 %PUBLIC_URL% （常用，仅适用于React脚手架搭建的工具）
3. 使用HashRouter


## 5.8 路由的严格匹配与模糊匹配
1. 默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
2. 开启严格匹配：
```
<Route exact={true} path="/about" component={About}/>
// 或者
<Route exact path="/about" component={About}/>
```
3. 严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由

## 5.9 Redirect的使用	
1. 一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由
2. 具体编码：
```
    <Switch>
    	<Route path="/about" component={About}/>
    	<Route path="/home" component={Home}/>
    	<Redirect to="/about"/>
    </Switch>
```

## 5.10 嵌套路由
1. 注册子路由时要写上父路由的path值
2. 路由的匹配是按照注册路由的顺序进行的

## 5.11 向路由组件传递参数
>`querystring`---处理url的库。

```
//编码类型urlencoded
key=value&key=value
```

```
1.params参数
		路由链接(携带参数)：<Link to='/demo/test/tom/18'}>详情</Link>
		注册路由(声明接收)：<Route path="/demo/test/:name/:age" component={Test}/>
		接收参数：this.props.match.params
2.search参数
		路由链接(携带参数)：<Link to='/demo/test?name=tom&age=18'}>详情</Link>
		注册路由(无需声明，正常注册即可)：<Route path="/demo/test" component={Test}/>
		接收参数：this.props.location.search
		备注：获取到的search是urlencoded编码字符串，需要借助querystring解析
3.state参数
		路由链接(携带参数)：<Link to={{pathname:'/demo/test',state:{name:'tom',age:18}}}>详情</Link>
		注册路由(无需声明，正常注册即可)：<Route path="/demo/test" component={Test}/>
		接收参数：this.props.location.state
		备注：刷新也可以保留住参数
```	

## 5.12 编程式路由导航
借助this.prosp.history对象上的API对操作路由跳转、前进、后退
- this.prosp.history.push()
- this.prosp.history.replace()
- this.prosp.history.goBack()
- this.prosp.history.goForward()
- this.prosp.history.go()

```
// withRouter的使用
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

class Header extends Component {

	back = ()=>{
		this.props.history.goBack()
	}

	forward = ()=>{
		this.props.history.goForward()
	}

	go = ()=>{
		this.props.history.go(-2)
	}

	render() {
		console.log('Header组件收到的props是',this.props);
		return (
			<div className="page-header">
				<h2>React Router Demo</h2>
				<button onClick={this.back}>回退</button>&nbsp;
				<button onClick={this.forward}>前进</button>&nbsp;
				<button onClick={this.go}>go</button>
			</div>
		)
	}
}

export default withRouter(Header)

//withRouter可以加工一般组件，让一般组件具备路由组件所特有的API
//withRouter的返回值是一个新组件

```

## 5.13 BrowserRouter与HashRouter的区别
>前端路由的原理：点击路由链接引起路径的变化，然后被路由器监测到，多次改变路径是能够产生历史记录的。
```
1. 底层原理不一样：
		BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。
		HashRouter使用的是URL的哈希值。类比于锚点，#后面的路由不会发送给服务器，但是会形成历史记录。
2. path表现形式不一样
		BrowserRouter的路径中没有#,例如：localhost:3000/demo/test
		HashRouter的路径包含#,例如：localhost:3000/#/demo/test
3. 刷新后对路由state参数的影响
		(1).BrowserRouter没有任何影响，因为state保存在history对象中。
		(2).HashRouter刷新后会导致路由state参数的丢失！！！（原因，没有基于history的API，无法保存记录）
4. 备注：HashRouter可以用于解决一些路径错误相关的问题。
```


# 第六章：ReactUI组件库
## 6.1 流行的开源React UI组件库
### 6.1.1  material-ui(国外)
1. 官网: http://www.material-ui.com/#/
2. github: https://github.com/callemall/material-ui

### 6.1.2 ant-design(国内蚂蚁金服)
1. 官网: https://ant.design/index-cn
2. Github: https://github.com/ant-design/ant-design/

## 6.3 antd的按需引入+自定主题
```
// 安装组件库（包）
yarn add antd
```

```
1. 安装依赖：yarn add react-app-rewired customize-cra babel-plugin-import less less-loader
2. 修改package.json
	
		"scripts": {
			"start": "react-app-rewired start",
			"build": "react-app-rewired build",
			"test": "react-app-rewired test",
			"eject": "react-scripts eject"
		},
			
3. 根目录下创建config-overrides.js
		//配置具体的修改规则
		const { override, fixBabelImports,addLessLoader} = require('customize-cra');
		module.exports = override(
			fixBabelImports('import', {
				libraryName: 'antd',
				libraryDirectory: 'es',
				style: true,
			}),
			addLessLoader({
				lessOptions:{
					javascriptEnabled: true,
					modifyVars: { '@primary-color': 'green' },
				}
			}),
		);
4. 备注：不用在组件里亲自引入样式了，即：import 'antd/dist/antd.css'应该删掉
```

# 第七章：redux
## 7.1 redux理解
## 7.1.1 学习文档
1. 英文文档: https://redux.js.org/
2. 中文文档: http://www.redux.org.cn/
3. Github: https://github.com/reactjs/redux

### 7.1.2 redux是什么
1. redux是一个专门用于做**状态管理**的JS库(不是react插件库)。
2. 它可以用在react, angular, vue等项目中, 但基本与react配合使用。
3. 作用: 集中式管理react应用中多个组件**共享**的状态。

### 7.1.3 什么情况下需要使用redux
1. 某个组件的状态，需要让其他组件可以随时拿到（共享）。
2. 一个组件需要改变另一个组件的状态（通信）。
3. 总体原则：能不用就不用, 如果不用比较吃力才考虑使用。

### 7.1.4 redux工作流程

![image](https://note.youdao.com/yws/api/personal/file/0B98D5DE780645138E579F2C08766E83?method=download&shareKey=3c3523c607f325185c49ada7d59e7a7c)

## 7.2 redux的三个核心概念
### 7.2.1 action
1. 动作的对象
2. 包含2个属性
- type：标识属性, 值为字符串, 唯一, 必要属性("@@init@@")
- data：数据属性, 值类型任意, 可选属性
3. 例子：{ type:'ADD_STUDENT',data:{name: 'tom',age:18} }

### 7.2.2. reducer
1. 用于初始化状态、加工状态。
2. 加工时，根据旧的state和action， 产生新的state的纯函数。

### 7.2.3. store
1. 将state、action、reducer联系在一起的对象
2. 如何得到此对象?
- import {createStore} from 'redux'
- import reducer from './reducers'
- const store = createStore(reducer)
3. 此对象的功能?
- getState(): 得到state
- dispatch(action): 分发action, 触发reducer调用, 产生新的state
- subscribe(listener): 注册监听, 当产生了新的state时, 自动调用


## 7.3 redux的案例总结
### 7.3.1  createstore()
作用：创建包含指定reducer的store对象
### 7.3.2 store对象
1. 作用: redux库最核心的管理对象
2. 它内部维护着:
- state
- reducer
3. 核心方法:
- getState()
- dispatch(action)
- subscribe(listener)
4. 具体编码:
- store.getState()
- store.dispatch({type:'INCREMENT', number})
- store.subscribe(render)

### 7.3.3 applyMiddleware()
作用：应用上基于redux的中间件(插件库)
### 7.3.4 combineReducers()
作用：合并多个reducer函数

## 7.4 applyMiddleware()
### 7.4.1 求和案例_redux精简版
		(1).去除Count组件自身的状态
		(2).src下建立:
						-redux
							-store.js
							-count_reducer.js

		(3).store.js：
					1).引入redux中的createStore函数，创建一个store
					2).createStore调用时要传入一个为其服务的reducer
					3).记得暴露store对象

		(4).count_reducer.js：
					1).reducer的本质是一个函数，接收：preState,action，返回加工后的状态
					2).reducer有两个作用：初始化状态，加工状态
					3).reducer被第一次调用时，是store自动触发的，
									传递的preState是undefined,
									传递的action是:{type:'@@REDUX/INIT_a.2.b.4'}

		(5).在index.js中监测store中状态的改变，一旦发生改变重新渲染<App/>
				备注：redux只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写。


### 7.4.2 求和案例_redux完整版
		新增文件：
			1.count_action.js 专门用于创建action对象
			2.constant.js 放置容易写错的type值



### 7.4.3 求和案例_redux异步action版
		 (1).明确：延迟的动作不想交给组件自身，想交给action
		 (2).何时需要异步action：想要对状态进行操作，但是具体的数据靠异步任务返回。
		 (3).具体编码：
		 			1).yarn add redux-thunk，并配置在store中
		 			2).创建action的函数不再返回一般对象，而是一个函数，该函数中写异步任务。
		 			3).异步任务有结果后，分发一个同步的action去真正操作数据。
		 (4).备注：异步action不是必须要写的，完全可以自己等待异步任务的结果了再去分发同步action。





### 7.4.4 求和案例_react-redux基本使用
![image](https://note.youdao.com/yws/api/personal/file/279755EB2F07473686C118705734B4CF?method=download&shareKey=08a9a701e6af33bcc02c14582fcdc092)
1. 明确两个概念：
- UI组件:不能使用任何redux的api，只负责页面的呈现、交互等。
- 容器组件：负责和redux通信，将结果交给UI组件。
2. 如何创建一个容器组件————靠react-redux 的 connect函数
	
connect(mapStateToProps,mapDispatchToProps)(UI组件)
- mapStateToProps:映射状态，返回值是一个对象
- mapDispatchToProps:映射操作状态的方法，返回值是一个对象
3. 备注1：容器组件中的store是靠props传进去的，而不是在容器组件中直接引入
4. 备注2：mapDispatchToProps，也可以是一个对象
```
//使用connect()()创建并暴露一个Count的容器组件
export default connect(
	state => ({count:state}),

	//mapDispatchToProps的一般写法
	/* dispatch => ({
		jia:number => dispatch(createIncrementAction(number)),
		jian:number => dispatch(createDecrementAction(number)),
		jiaAsync:(number,time) => dispatch(createIncrementAsyncAction(number,time)),
	}) */

	//mapDispatchToProps的简写
	{
		jia:createIncrementAction,
		jian:createDecrementAction,
		jiaAsync:createIncrementAsyncAction,
	}
)(Count)
```

### 7.4.5 求和案例_react-redux优化
1. 容器组件和UI组件整合一个文件
2. 无需自己给容器组件传递store，给<App/>包裹一个<Provider store={store}>即可。
```
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'
import {Provider} from 'react-redux'

// 批量给应用中的所有容器组件传递store对象
ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
)
```
3. 使用了react-redux后也不用再自己检测redux中状态的改变了，容器组件可以自动完成这个工作。
4. mapDispatchToProps也可以简单的写成一个对象
5. 一个组件要和redux“打交道”要经过哪几步？
- 定义好UI组件---不暴露
- 引入connect生成一个容器组件，并暴露，写法如下：
			

        connect(
        	state => ({key:value}), //映射状态
        	{key:xxxxxAction} //映射操作状态的方法
        )(UI组件)


- 在UI组件中通过this.props.xxxxxxx读取和操作状态


### 7.4.6 求和案例_react-redux数据共享版
1. 定义一个Pserson组件，和Count组件通过redux共享数据。
2. 为Person组件编写：reducer、action，配置constant常量。
3. 重点：Person的reducer和Count的Reducer要使用combineReducers进行合并，合并后的总状态是一个对象！！！
4. 交给store的是总reducer，最后注意在组件中取出状态的时候，记得“取到位”。

### 7.4.7 求和案例_react-redux开发者工具的使用
1. 安装redux开发工具
```
yarn add redux-devtools-extension
```

2. store中进行配置
				
```js
//在redux核心文件store.js中修改

import {composeWithDevTools} from 'redux-devtools-extension'
const store = createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))
```

### 7.4.8 求和案例_react-redux最终版
1. 所有变量名字要规范，尽量触发对象的简写形式。
2. reducers文件夹中，编写index.js专门用于汇总并暴露所有的reducer

## 7.5 react项目的打包运行
### 7.5.1 serve库
- 安装
```
npm i serve -g
```
- 启动服务(build文件夹是打包后的react项目文件夹)
```
serve -s build/serve build
```
## 7.6 纯函数和高阶函数
### 7.6.1 纯函数
1. 一类特别的函数: 只要是同样的输入(实参)，必定得到同样的输出(返回)
2. 必须遵守以下一些约束
- 不得改写参数数据
- 不会产生任何副作用，例如网络请求，输入和输出设备
- 不能调用Date.now()或者Math.random()等不纯的方法
3. redux的reducer函数必须是一个纯函数

### 7.6.2 高阶函数
1. 理解: 一类特别的函数
- 情况1: 参数是函数
- 情况2: 返回是函数
2. 常见的高阶函数: 
- 定时器设置函数
- 数组的forEach()/map()/filter()/reduce()/find()/bind()
- promise
- react-redux中的connect函数
3. 作用: 能实现更加动态, 更加可扩展的功能

# 第八章：React扩展
## 8.1 setState

### setState更新状态的2种写法

```
(1). setState(stateChange, [callback])------对象式的setState
        1.stateChange为状态改变对象(该对象可以体现出状态的更改)
        2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
				
(2). setState(updater, [callback])------函数式的setState
        1.updater为返回stateChange对象的函数。
        2.updater可以接收到state和props。
        4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
总结:
	1.对象式的setState是函数式的setState的简写方式(语法糖)
	2.使用原则：
			(1).如果新状态不依赖于原状态 ===> 使用对象方式
			(2).如果新状态依赖于原状态 ===> 使用函数方式
			(3).如果需要在setState()执行后获取最新的状态数据, 
				要在第二个callback函数中读取
```

## 8.2 lazyLoad

### 路由组件的lazyLoad

```js
	//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
	const Login = lazy(()=>import('@/pages/Login'))
	
	//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	<Suspense fallback={<h1>loading.....</h1>}>
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
```


## 8.3 Hooks

### 8.3.1 React Hook/Hooks是什么?

```
(1). Hook是React 16.8.0版本增加的新特性/新语法
(2). 可以让你在函数组件中使用 state 以及其他的 React 特性
```

### 8.3.2 三个常用的Hook

```
(1). State Hook: React.useState()
(2). Effect Hook: React.useEffect()
(3). Ref Hook: React.useRef()
```

### 8.3.3 State Hook

```
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)  
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
```

### 8.3.4 Effect Hook

```
(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
(3). 语法和说明: 
        useEffect(() => { 
          // 在此可以执行任何带副作用操作
          return () => { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
    
(4). 可以把 useEffect Hook 看做如下三个函数的组合
        componentDidMount()
        componentDidUpdate()
    	componentWillUnmount() 
```

### 8.3.5 Ref Hook

```
(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
(2). 语法: const refContainer = useRef()
(3). 作用:保存标签对象,功能与React.createRef()一样
```



------



## 8.4 Fragment

### 使用

	<Fragment><Fragment>
	<></>

### 作用

> 可以不用必须有一个真实的DOM根标签了



<hr/>

## 8.5 Context

### 理解

> 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

### 使用

```js
1) 创建Context容器对象：
	const XxxContext = React.createContext()  
	
2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
	<xxxContext.Provider value={数据}>
		子组件
    </xxxContext.Provider>
    
3) 后代组件读取数据：

	//第一种方式:仅适用于类组件 
	  static contextType = xxxContext  // 声明接收context
	  this.context // 读取context中的value数据
	  
	//第二种方式: 函数组件与类组件都可以
	  <xxxContext.Consumer>
	    {
	      value => ( // value就是context中的value数据
	        要显示的内容
	      )
	    }
	  </xxxContext.Consumer>
```

### 注意

	在应用开发中一般不用context, 一般都用它的封装react插件



<hr/>


## 8.6 组件优化

### Component的2个问题 

> 1. 只要执行setState(),即使不改变状态数据, 组件也会重新render() ==> 效率低
>
> 2. 只当前组件重新render(), 就会自动重新render子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低

### 效率高的做法

>  只有当组件的state或props数据发生改变时才重新render()

### 原因

>  Component中的shouldComponentUpdate()总是返回true

### 解决

	办法1: 
		重写shouldComponentUpdate()方法
		比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
	办法2:  
		使用PureComponent
		PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
		注意: 
			只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false  
			不要直接修改state数据, 而是要产生新数据
	项目中一般使用PureComponent来优化



<hr/>


## 8.7 render props

### 如何向组件内部动态传入带内容的结构(标签)?

	Vue中: 
		使用slot技术, 也就是通过组件标签体传入结构  <A><B/></A>
	React中:
		使用children props: 通过组件标签体传入结构
		使用render props: 通过组件标签属性传入结构,而且可以携带数据，一般用render函数属性

### children props

	<A>
	  <B>xxxx</B>
	</A>
	{this.props.children}
	问题: 如果B组件需要A组件内的数据, ==> 做不到 

### render props

	<A render={(data) => <C data={data}></C>}></A>
	A组件: {this.props.render(内部state数据)}
	C组件: 读取A组件传入的数据显示 {this.props.data} 



<hr/>

## 8.8 错误边界

#### 理解：

错误边界(Error boundary)：用来捕获后代组件错误，渲染出备用页面

#### 特点：

只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

##### 使用方式：

getDerivedStateFromError配合componentDidCatch

```js
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}
```
## 8.9 组件通信方式总结

### 组件间的关系：

- 父子组件
- 兄弟组件（非嵌套组件）
- 祖孙组件（跨级组件）

### 几种通信方式：

		1.props：
			(1).children props
			(2).render props
		2.消息订阅-发布：
			pubs-sub、event等等
		3.集中式管理：
			redux、dva等等
		4.conText:
			生产者-消费者模式

### 比较好的搭配方式：
		父子组件：props
		兄弟组件：消息订阅-发布、集中式管理
		祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(开发用的少，封装插件用的多)


