# mDebug
移动端调试解决方案

## 功能包含

* console日志；
* XHR相关信息；
* Resources信息；
* Timeline信息。

以上的内容既可以在移动端来查看，也可以在PC端进行查看。

## 开发测试
开发时，控制台：
>  执行：  
    `npm run dev`  
    会执行构建并进行文件更改监听，但是构建出来的代码不会做压缩、丑化处理;
>  执行：  
    `npm run build`  
    会执行构建并会对代码做压缩、丑化处理，但是不会执行实时监听。  

构建完成后，可以在浏览器中打开index.html来进行调试。

## 使用
使用时，在所有js文件前引入`./dist/mdebug.js`即可。

## 参考
[AlloyLever](https://github.com/AlloyTeam/AlloyLever)  
[vConsole](https://github.com/WechatFE/vConsole)
