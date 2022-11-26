package main

import "github.com/gin-gonic/gin"

func main() {

	//创建实例
	engine := gin.Default()
	//处理路由
	engine.GET("/", func(context *gin.Context) {
		//以字符串格式返回
		context.String(200, "这就是一个普通的字符串")
	})
	//运行服务器,默认监听8080端口
	engine.Run()

}
