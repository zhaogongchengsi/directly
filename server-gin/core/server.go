package core

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/server-gin/global"
	"github.com/server-gin/routers"
	"net/http"
	"time"
)

func initServer(address string, router *gin.Engine) *http.Server {
	return &http.Server{
		Addr:           address,
		Handler:        router,
		ReadTimeout:    20 * time.Second,
		WriteTimeout:   20 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
}

func CreateAppServer()  {
	gin.SetMode(global.Server.Mode)

	// 初始化全局配置变量
	global.InitGlobalValues()

	// 初始化路由
	router := routers.CreateAppRouter()

	server := initServer(fmt.Sprintf(":%d", global.Server.Port),router)

	if err := server.ListenAndServe(); err != nil {
		fmt.Printf("服务器启动失败 %v", err)
	}

}

