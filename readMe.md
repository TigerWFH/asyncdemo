# AsyncDemo（目前使用的是静态路由）
## 第一步 目录结构
	AsyncDemo
	|
	|
	|------>src/app(存放源代码)
	|	|
	|	|
	|	|------>index.js(启动app前的配置项)
	|	|
	|	|
	|	|------>store.js
	|	|
	|	|
	|	|------>home.html
	|	|
	|	|
	|	|------>rootReducer.js
	|	|
	|	|
	|	|------>common(存放通用资源，至少是两个模块都会引用的资源才会放到这里，否者放在模块自己的目录下)
	|	|	|
	|	|	|
	|	|	|------>globalActions()
	|	|	|
	|	|	|
	|	|	|------>globalReducers()
	|	|	|
	|	|	|
	|	|	|------>globalUtils()
	|	|	|
	|	|	|
	|	|	|------>globalCss()
	|	|	|
	|	|	|
	|	|	|------>res(存放资源)
	|	|	|	|
	|	|	|	|
	|	|	|	|------>images
	|	|	|	|
	|	|	|	|
	|	|	|	|------>fonts
	|	|	|
	|	|	|
	|	|	|------>libs(存放非node_module方式引入的包)
	|	|
	|	|
	|	|------>modules(存放各个模块)
	|	|	|
	|	|	|
	|	|	|------>first(第一个模块)
	|	|	|	|
	|	|	|	|
	|	|	|	|------>index.js(动态加载渲染路由，如果一次性加载路由，可取消该项）
	|	|	|	|
	|	|	|	|
	|	|	|	|------>main.js(渲染html)
	|	|	|	|
	|	|	|	|
	|	|	|	|------>actions.js
	|	|	|	|
	|	|	|	|
	|	|	|	|------>reducers.js
	|	|	|	|
	|	|	|	|
	|	|	|	|------>components(存放页面级的模块)
	|	|	|	|	|
	|	|	|	|	|
	|	|	|	|	|------>header
	|	|	|	|	|	|
	|	|	|	|	|	|
	|	|	|	|	|	|------>index.js
	|	|	|	|	|	|
	|	|	|	|	|	|------->index.css
	|	|	|	|	|
	|	|	|	|	|
	|	|	|	|	|------>content(同header)
	|	|	|	|	|
	|	|	|	|	|
	|	|	|	|	|------>footer(同header)
	|	|	|	|
	|	|	|
	|	|	|
	|	|	|------>second
	|	|	|
	|	|	|
	|	|	|------>third
	|
	|
	|
	|------>configs(各种根目录下的配置文件)
	|
	|------>tools
	|
	|
	|------>static/dist(构建目录)
	|
	|
	|------>node_modules

`结论`：

	通用的东西全部到common目录下查找。
	modules目录下是相互独立的模块。
	非业务基础组件拉出去，作为单独的项目。
	通用业务组件拉出去，作为单独的项目。
	特有组件则单独开发，并存放在compoennets目录下。
	非业务组件------>业务组件------>页面------>应用


## 第二步 npm install

## 第三步 loaders
* `储备知识：DataURL，Base64`

	1、DataUrl技术，就是将图片数据以base64形式压缩编码，以字符串形式直接嵌入到目标文件中（html，css），目前大部分主流浏览器都支持。
	2、Base64编码的数据体积通常是原数据体积的4/3，即比原数据大。
	3、DateURL形式的图片不会被浏览器缓存。（通过css文件简介缓存DateUrl形式的图片）
	4、webpack只能处理javascript，其它资源需要使用loader进行转换
	5、loader：
* `file-loader`
	
	拷贝图片到指定的位置并返回对应的url或者仅仅返回一个url。[更多资料](https://github.com/webpack-contrib/file-loader)
	```
	var url = require("file-loader!./file.png");
	// => 根据file.png在输出目录emit a file，并返回对应的url
	//=>"/publick-path/000000000(hash).png"
	var url = require("file-loader?emitFile=false!./file.png");
	// not emit a file
	```
* `url-loader`

	将指定大小的图片进行base64压缩编码，并返回对应的DataUrl。[更多资料](https://github.com/webpack-contrib/url-loader)
	```
	import img from './image.png';
	```
	webpack.config.js
	```
	{
		test: /\.(png|jpg|jpeg|gif)$/,
		use:[
			{
				loader: 'url-loader',
				options: {
					limit: 8192,
					mimeType:"文件后缀，imgage/png",
					prefix:"传递给file-loader的参数"
				}
			}
		]
	}
	```
	`注意：`配置了url-loader后，就不需要安装配置file-loader
* `css-loader`

	css-loader会像解析import/require一样将解析import和url()，并自行处理它们的解析。

	`css-loader并没有将css解析成样式树，而是将它的整个内容作为一个字符串打包进js中。`

	![css-loader](./app/common/res/images/css-loader.jpeg)

	loader会将其它资源打包成js。
* `style-loader`

	通过注入style标签的形式，讲css添加到dom上。
	
# plugins
* `webpack.optimize.CommonsChunkPlugin`
* `webpack.ProvidePlugin`
* `webpack.DefinePlugin`
* `clean-webpack-plugin`
* `copy-webpack-plugin`
* `html-webpack-plugin`
* `extract-text-webpack-plugin`
* `webpack-md5-hash`
* `webpack-mainfest-plugin`

## 第四步  npm相关知识
* `npm run`

	npm run是npm run-script的简写
	
	npm内置了两个命令简写即，npm start(=npm run start)和npm test(npm run test)

	npm run会`创建一个shell`，执行指定的命令，并临时将node_modules/.bin加入PATH变量
* `npm search`

	npm search name,查询包
* `npm update`

	更新包
# 第五步 git知识点

	git是一套内容寻址（content addressable）文件系统，基于此提供了一个VCS用户界面。git通过键值对存取内容（hash-object命令存储内容，返回对应的key值，即一个40个字符的校验和字符串）。
	git提供了一套类似unix命令风格的命令供脚本调用，这些命令称为底层命令（plumbing）。其它更友好的命令则称为高层命令（porcelain）。
	高层命令用于终端执行；底层命令主要用于脚本或其它类似工具。

	git目录
	|
	|--->HEAD（*指向当前分支）
	|
	|--->branches/(新版本废弃，已经没有该文件了)
	|
	|--->config（项目独有的配置）
	|
	|--->description（仅供gitweb使用）
	|
	|--->hooks/（客户端或服务端钩子脚本）
	|
	|--->index（*保存暂存区的信息,初始化状态没有该文件）
	|
	|--->info/（保存了了一份不希望.gitignore文件管理的忽略模式的全局可执行文件）
	|
	|--->objects/（*存储所有数据内容）
	|
	|--->refs/（*存储提交的各分支指向的对象）

	git存储内容数据的方式---每一份内容生成一个文件，取得内容信息和头信息的SHA-1作为校验和。

	git以对象类型为起始内容构造一个文件头，然后加一个空格，接着是数据内容长度，最后一个是空字节。

* `hash-object`

	将数据内容存储为文件（blob类型），并返回40个字符的校验和字符串。

	blob对象保存的是文件内容
* `cat-file`

	根据key值查看对应文件的内容
* `update-index`

	添加到缓存区（index）
* `write-tree`

	写成树对象（tree类型）

	tree对象指向了，你要跟踪的项目的`不同快照`
* `read-tree`

	但是有个问题，如何记录不同的快照的SHA-1值？谁提交的信息？什么时间提交的信息？（commit对象，指明了时间戳，提交者，提交信息，项目快照的顶层tree对象）。
* `commit-tree`

* `tag对象`