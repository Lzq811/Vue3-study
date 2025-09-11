本文旨在介绍使用 **Vue3+ElementPlus**创建的管理后台项目如何配置和拆分优化路由定义

### 1. 根据业务模块定义路由

##### 1.1 把路由名称定义成常量，方便调用保存

创建 `src/router/route-names.ts` 文件，定义常量

```tsx
// src/router/route-names.ts 文件
// 登录页面
export const LOGIN = 'LOGIN'
// 菜单管理 ~ 建议多单词使用 _ 连接
expot const SYSTEM_MENUS = 'SYSTEM_MENUS'
```



##### 1.2 根据业务场景拆分路由模块+同步在 `src/views`目录下定义页面组件

- 定义描述 (下面表示定义了router和views的路径别名)

  | 路由                      | 页面组件                                                     | 说明                                   |
  | ------------------------- | ------------------------------------------------------------ | -------------------------------------- |
  | `@router/auth/index.ts`   | `@views/login/index.vue`和 `@views/p404/index`               | 定义登录页面/404页面等                 |
  | `@router/system/index.ts` | `@views/system/menus/index.vue`;`@views/system/account/index.vue` | 系统管理模块下定义菜单管理，账户管理等 |
  | `@router/operation/index` | `@views/operation/coupon/index`                              | 运营模块下定义优惠券管理页面等         |

- 定义demo，以 system系统管理 为例

  - 定义组件文件 `@views/system/menus/index.vue`

    ```vue
    <script setup lang="ts">
    	import { ref } from 'vue'
    	import type { Ref } from 'vue'
    	const msg: Ref<string> = ref('hello vue3 menus demo')
    </script>
    <template>
    	<div>{{ msg }}</div>
    </template>
    <style lang="less" scoped></style>
    
    ```

    

  - 注册路由 `@router/system/index.ts`

    ```tsx
    import * as routeNams from '@router/route-names'
    import type { RouteRecordRaw } from 'vue-router'
    
    const systemRoutes: RouteRecordRaw[] = [
    	{
    		path: '/system',
    		children: [
    			{
    				path: 'menus',
    				name: routeNams.MENUS,
    				component: () => import('@views/system/menus/index.vue')
    			}
    		]
    	}
    ]
    
    export default systemRoutes
    
    ```

    

  - 把各个模块统一注册在 `src/router/index.ts`中

    ```tsx
    import systemRoutes from '@router/system/index.ts'
    const router = createRouter({
    	history: createWebHistory(import.meta.env.BASE_URL),
    	routes: [
    		// 其他路由
    		...systemRoutes
    	]
    })
    export default router
    ```

    

  - 定义路由前缀[非必选]

    ```tsx
    // src/router/index.ts
    const router = createRouter({
      // 路由前缀 prefix, 或者直接修改 BASE_URL环境变量值
    	history: createWebHistory(`/prefix${import.meta.env.BASE_URL}`),
    	routes: [
    		// 其他路由
    	]
    })
    export default router
    ```

    ```tsx
    // vite.config.ts
    export default defineConfig({
      base: '/your-prefix/', // 确保与路由中的 base 一致 或者直接修改 BASE_URL环境变量值
      // ... 其他配置
    })
    ```

    还需要后端同事配置 `nginx` 负载，一下仅供参考

    ```basic
    server {
        listen 80;
        server_name your-domain.com;
        root /path/to/your/dist;
        index index.html;
        location / {
            try_files $uri $uri/ /index.html; # 重要：将所有请求重定向到 index.html
        }
    }
    ```

- 定义路由守卫拦截

  ```tsx
  // src/router/index.ts
  const router = createRouter({
    // 路由前缀 prefix, 或者直接修改 BASE_URL环境变量值
  	history: createWebHistory(`/prefix${import.meta.env.BASE_URL}`),
  	routes: [
  		// 其他路由
  	]
  })
  
  // 全局定义路由拦截守卫
  router.beforeEach((to, from, next) => {
  	const token = localStorage.getItem('token')
  	if (!token) {
  		next({
  			name: 'LOGIN'
  		})
  	} else {
  		next()
  	}
  })
  
  export default router
  ```

  

  > eslint报错说需要创建 muti-word 组件名，修复方式在 `package.json`中添加一下代码来屏蔽错误。
  >
  > "eslintConfig": {
  >
  >   "rules": {
  >
  >    "vue/multi-word-component-names": "off"
  >
  >   }
  >
  >  }

### 2. 页面跳转操作

##### 2.1 跳转方式：声明式，编程式；

- 声明式

  ```vue
  <router-link to="/user/profile">我的资料</router-link>
  <router-link :to="{ path: '/user/settings' }">系统设置</router-link>
  <!-- 假设路由配置为 { path: '/user/:userId', name: 'user', component: ... } 推荐使用模式 -->
  <router-link :to="{ name: 'USER', params: { userId: 123 }}">用户123</router-link>
  <router-link :to="{ path: '/search', query: { keyword: 'Vue', category: 'frontend' }}">搜索Vue</router-link>
  <router-link :to="..." replace>下一页（无痕）</router-link>
  <!-- exact严格匹配模式 -->
  <router-link to="/" exact>首页</router-link>
  ```

- 编程式 [详细操作参考文档](https://router.vuejs.org/zh/guide/essentials/navigation.html)

  ```tsx
  // 业务组件中
  import { useRouter } from 'vue-router'
  const router = useRouter()
  // 字符串路径
  router.push('/users/eduardo')
  
  // 带有路径的对象
  router.push({ path: '/users/eduardo' })
  
  // 命名的路由，并加上参数，让路由建立 url ---推荐使用方式，name使用预设的常量名称；
  router.push({ name: 'MENUS', params: { username: 'eduardo' } })
  
  // 带查询参数，结果是 /register?plan=private
  router.push({ path: '/register', query: { plan: 'private' } })
  ```

- 更完善的功能，需要配合 [页面布局 Layout](https://www.jianshu.com/p/70aea7068869) 一起使用。

##### 2.2  RouterView定义和使用

使用参考[Routerview 插槽](https://router.vuejs.org/zh/guide/advanced/router-view-slot.html)