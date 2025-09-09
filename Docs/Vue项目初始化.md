**本文旨在使用**Vue相关技术栈搭建web端项目脚手架。通过本文档能够完整搭建一套用来做管理后端的最基础的框架。

### 1. 脚手架需要实现的功能

想要创建一个管理后端的项目，首先要参考要实现的功能进行技术选型。根据用户的使用场景匹配浏览器以及界面的的响应布局。

- 单页应用程序。
- 技术选型：Vue3、Vite、typescript，ElementPlus、Router等常规使用技术框架。根据开发情况再酌情使用 pinia、mement、echarts等技术。
- 不考虑兼容老版本IE等浏览器。
- 根据不同的打包指令配置不同的环境变量配置，以便兼容类似 jenkins 等类似一键部署的工具。
- 适配浏览器窗口

### 2. 搭建步骤

##### 2.1 准备工作

- 安装 **node**， 安装参考 [安装文档](https://nodejs.org/zh-cn)。
- 安装 **Yarn**， 为非必安装，本项目将使用 `yarn v1.22.9`。 [安装Yarn](https://www.yarnpkg.cn/)
- 安装 **VSCode**代码编译器，本项目将使用该编译器。[安装](https://code.visualstudio.com/)。
- 编译器安装 **ESLint** 和 **Prettier** 拓展。

##### 2.2 基础库初始化

- 根据[官方提供的脚手架工具](https://cn.vuejs.org/guide/quick-start.html#creating-a-vue-application)进行安装 Vue + Vite + ts 模板。

  ```bash
  # yarn v1+
  yarn create vue
  # 输入项目名称
  vue3-study-demo
  # 请选择要包含的功能： (↑/↓ 切换，空格选择，a 全选，回车确认)
  TypeScript, Router（单页面应用开发）, Pinia（状态管理）, ESLint（错误预防）, Prettier（代码格式化）
  # 选择要包含的试验特性： (↑/↓ 切换，空格选择，a 全选，回车确认)
  none
  #跳过所有示例代码，创建一个空白的 Vue 项目？
  NO
  # 项目初始化完成，可执行以下命令：
   cd vue3-study-demo
   yarn
   yarn format
   yarn dev
  ```

  执行 `yarn dev` 后可打开监听了 5173端口的web服务，说明这一步完成了。

  版本号记录如下：2025年9月

  | 依赖项     | 版本号  |
  | ---------- | ------- |
  | node       | 22.15.0 |
  | pinia      | 3.0.3   |
  | vue        | 3.5.18  |
  | vue-router | 4.5.1   |
  | eslint     | 9.31.0  |
  | prettier   | 3.6.2   |
  | typescript | ~5.8.0  |
  | vite       | 7.0.6   |

-  **ElementPlus UI**

  1. 安装 [安装文档](https://element-plus.org/zh-CN/guide/installation.html)

     ```basic
     yarn add element-plus
     ```

  2. 按需导入使用 [文档](https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5)

     1. 安装自动导入依赖

        ```basic
        yarn add -D unplugin-vue-components unplugin-auto-import
        ```

        当前版本：element-plus： 2.11.2

     2. 配置 `vite`,  vite.config.ts文件添加一下配置

        ```vue
        # vite.config.ts
        
        import { defineConfig } from 'vite'
        import AutoImport from 'unplugin-auto-import/vite'
        import Components from 'unplugin-vue-components/vite'
        import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
        
        export default defineConfig({
          // ...
          plugins: [
            // ...
            AutoImport({
              resolvers: [ElementPlusResolver()],
            }),
            Components({
              resolvers: [ElementPlusResolver()],
            }),
          ],
        })
        ```

     3.  ElementPlus 也集成了很多优秀的模版，这里不做赘述。

     4. 配置 **主题** 需要使用时候再回来配置。[操作文档](https://element-plus.org/zh-CN/guide/theming.html#%E6%9B%B4%E6%8D%A2%E4%B8%BB%E9%A2%98%E8%89%B2)

     5. 国际化，用到时再说。[文档](https://element-plus.org/zh-CN/guide/i18n.html)

     6. 组件调用测试

        ```vue
        # App.vue
        <el-button type="primary">Primary</el-button>
        ```

        如果能正常渲染一个 按钮(拥有element样式) 则说明引入成功。

     

- 使用 **Less** 作为 css预编译

  - 安装

    ```bash
    yarn add less --dev
    ```

    

  - 配置   `vite.config.ts ` 文件

    ```tsx
    plugins: [
      ...
      ],
      css: {
        preprocessorOptions: {
          less: {
            // 启用 JavaScript 表达式（某些 Less 插件可能需要）
            javascriptEnabled: true,
            // 可选：全局注入 Less 变量或混入文件，这样每个 Less 文件都会自动导入
            // additionalData: `@import "@/styles/variables.less";`, // 根据你的文件路径调整
          },
        },
      },
      resolve: {
       ...
      },
    ```

    

  - 使用测试

    ```vue
    
    <div class="less-text"> hello Less</div>
    
    <style lang="less" scoped>
    .less-text {
      color: red;
      font-size: 36px;
    }
    </style>
    ```

  - 说明：elementPlus 是使用 `scss`来编写样式的，所以安装了 elementPlus 也就相当于安装了 `scss`。但是由于本人更习惯使用 `less`，故这里特意安装使用。

- 安装 **Axios**

  - 安装

    ```bash
    yarn add axios
    ```

  - **二次封装**。目标：优化请求代码量，统一处理请求拦截&响应拦截；根据不同业务逻辑拆分代码，尽可能的实现业务解耦；具体操作参考文档：[Vue3使用axios和二次封装](https://www.jianshu.com/p/3fde486a9ccb)

- 其他依赖项

##### 2.3 简单初始化目录

### 3. 代码预览

[相关代码 -- project-init分支](https://github.com/Lzq811/Vue3-study/tree/project-init)

