本文旨在使用 **Vue3+ElementPlus**只做 web端 管理后台页面整体布局以及页面响应式窗口。

> 本文是 [Vue3+ElementPlus路由初始化](https://www.jianshu.com/p/a5cffbeb9e01) 之后的操作，请参考完成路由定义后再进行本文的的操作

### 1. 页面布局初始化

1.  使用 Container 组件进行布局：在 `src/components` 目录下创建 `container`组件，用来撑起页面布局; 定义 header 和 aside 通用组件，填充页面通用头部和菜单栏信息；

   ```tsx
   // @components/container/index.vue 文件
   <script setup lang="ts">
   	import Header from '@components/header/index.vue'
   	import Aside from '@components/aside/index.vue'
   </script>
   <template>
   	<el-container class="container-layout">
   		<el-aside width="200px" class="aside-container"><Aside /></el-aside>
   		<el-container>
   			<el-header class="header-container"><Header /></el-header>
   			<el-main class="main-container">
   				<router-view />
   			</el-main>
   		</el-container>
   	</el-container>
   </template>
   <style lang="less" scoped>
   	.container-layout {
   		width: 100%;
   		height: 100%;
   		background-color: #f1f2f5;
   		box-sizing: border-box;
   		.aside-container {
   			background-color: #fff;
   			border-right: 1px solid #ccc;
   		}
   		.header-container {
   			background-color: #fff;
   			border-bottom: 1px solid #ccc;
   		}
   		.main-container {
   			padding: 0.5rem;
   		}
   	}
   </style>
   
   ```

   

2.  初始化布局样式，参考上面代码；

   > 注：在 `src/assets/base.css` 定义了 `font-size: 14px`，也就定义了默认 `1rem`的大小是14px；

3. 定义路由跟组件 router-view，参考上面代码；

4. 定义布局通用组件[默认已配置了 @components 路径别名]；

   | 通用组件                       | 说明             |
   | ------------------------------ | ---------------- |
   | `@components/header/index.vue` | 页面头部通用组件 |
   | `@components/aside/index.vue`  | 通用菜单栏组件   |

   

### 2. 初始化菜单+页面跳转

##### 2.1 菜单初始化分为两部分，后续还会有面包屑部分

- header 组件定义菜单组按钮
- aside 组件定义 当前菜单组下的 菜单
- 面包屑

##### 2.2 菜单页面跳转

### 3. 页面窗口响应

​	页面大小兼容 1280-1920 宽度直接，使用缩放模式

小于 1280 出先横向滚动条





