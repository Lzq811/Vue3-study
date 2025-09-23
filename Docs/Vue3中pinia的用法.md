本文旨在介绍在Vue3的项目中状态变量的管理，着重介绍 pinia ，这也是 Vue3 官方推荐的方式。

### 1. Pinia 介绍

##### Pinia的介绍

Pinia [起始](https://github.com/vuejs/pinia/commit/06aeef54e2cad66696063c62829dac74e15fd19e)于 2019 年 11 月左右的一次实验，其目的是设计一个拥有[组合式 API](https://github.com/vuejs/composition-api) 的 Vue 状态管理库。是Vuex的的简化。都是用于Vue的状态管理工具。

> pinia官方文档: https://pinia.vuejs.org/zh/introduction.html

##### Pinia 与 vuex的简单对比

| 功能描述   | Pinia                                                | Vuex                                                       | 说明                                                         |
| ---------- | ---------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| Vue3中使用 | 官方推荐                                             | 完美兼容。                                                 | Vue2中更推荐使用vuex                                         |
| TS的支持   | 完全支持                                             | 支持，但需要很多手动定义                                   |                                                              |
| 模块化     | 天然支持                                             | 支持，需要叫复杂的配置后兼容                               |                                                              |
| 撸码过程   | 更少的流程，更直接的操作方法                         | 更多的api，学习曲线陡峭                                    | 使用过Vuex，再使用pinia会十分容易上手                        |
| 插件       | 够用                                                 | 丰富                                                       |                                                              |
| Store      | 已经默认模块化定义                                   | 需要手动进行拆分                                           | Pinia 中 `@stores/xx`的每个 xx 即为一个模块                  |
| State      | const count = ref(0)                                 | State: { count: 0 }                                        | Pinia 使用选项式时与vuex基本相同。pinia使用组合式时像在`.vue`组件中声明 ref 变量一样。 |
| $reset     | 选项式中已经默认定义了 `$reset`, setup中需要手动实现 | 需要手动实现                                               | [pinia中参考](https://pinia.vuejs.org/zh/core-concepts/state.html#resetting-the-state) |
| Getter     | const doubleCount = computed(() => count.value * 2)  | getters: {    doubleCount: (state) => state.count * 2,  }, | Pinia 使用选项式时与vuex基本相同                             |
| Aciton     | function increment() {    count.value++  }           | actions: {    increment() {      this.count++    },  },    | Pinia 使用选项式时与vuex基本相同                             |
| commit     | 无                                                   | 触发 mutations 的语法                                      |                                                              |
| Dispath    | 无                                                   | 触发 actions (异步)的语法                                  |                                                              |



### 2. Pinia在Vue3项目的使用方法

1.  安装，如果使用vite配置模板会在代码初始化时选择是否安装，也可以如下指令安装。

   ```basic
   yarn add pinia
   # 或者使用 npm
   npm install pinia
   ```

   

2. 全局引用 pinia, 在入口文件 `main.ts` 中操作

   ```tsx
   import { createPinia } from 'pinia'
   
   const app = createApp(App)
   
   app.use(createPinia()) // 引入pinia的实例
   
   app.mount('#app')
   ```

   

3. 定义 `state`。以`counter` 为例，在 `src/stores` 目录下创建 `counter.ts`文件。

   ```ts
   import { ref, computed } from 'vue'
   import { defineStore } from 'pinia'
   export const useCounterStore = defineStore('counter', () => {
     const count = ref(0)
     const doubleCount = computed(() => count.value * 2)
     function increment() {
       count.value++
     }
     function mixins(step:number) {
       count.value -= step
     }
     return { count, doubleCount, increment, mixins } // 只有return 出去的才能被外部调用
   })
   
   ```

   > 也可以使用 选项式 api定义 state.具体参考 https://pinia.vuejs.org/zh/core-concepts/#option-stores

4. 调用 `state`。比如在 `app.vue` 组件中调用, 默认配置了 `@stores`的路径别名。

   ```ts
   import {useCounterStore} from '@stores/counter'
   const store = useCounterStore()
   onMounted(() => {
   	console.log(store.count) // 获取 count的值
   	store.increment() // 更新count
   	store.mixins(3) // 更新count
     store.count = 10 // 甚至支持这么修改状态数据
   })
   ```

   

5. 解构`state`。使用 `store.xxx` 访问比较麻烦，可以解构 `store`，还需保持响应性需要使用`storeToRefs`参考如下代码

   ```ts
   import {storeToRefs} from 'pinia'
   import {useCounterStore} from '@stores/counter'
   const store = useCounterStore()
   const {count, doubleCount, increment, mixins} = storeToRefs(store)
   onMounted(() => {
     console.log(count, doubleCount)
     increment()
     mixins(3)
   })
   ```

6. 模块化描述

   如上面 `counter` 的示例， 每个 `counter`就是一个独立的模块。如果需要其他模块比如`menus`，只需要在 `@stores/menus.ts`按照 `counter`的模式进行声明和调用即可，这也就是 pinia 天然就已经进行模块化封装好，我们只需按照规则进行声明和调用即可。

### 3. Pinia数据持久化

pinia的`state`状态数据和 vuex 一样，都是存在内存中的，刷新页面或关闭页面再次打开`state`都会丢失。有些状态值需要长久保存，比如 token等。这里介绍使用 `pinia-plugin-persistedstate`pinia的官方插件实现持久化。类似`vuex-persistedstate`vuex的数据持久化插件。

> pinia-plugin-persistedstate官方文档：https://prazdevs.github.io/pinia-plugin-persistedstate/zh/

`pinia-plugin-persistedstate`的数据持久化也只是把状态数据存储到`localStorage（默认）` 或者 `sessionStorage`中。缓存有大小限制(5M左右)，所以并不是所有数据都适合持久化操作。

具体操作如下:  

1. 安装插件

   ```basic
   yarn add pinia-plugin-persistedstate
   # or npm
   npm i pinia-plugin-persistedstate
   # or pnpm
   pnpm add pinia-plugin-persistedstate
   ```

   

2. 将插件添加到 pinia 的实例中。`main.ts`文件

   ```ts
   import { createPinia } from 'pinia'
   import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
   
   const pinia = createPinia()
   pinia.use(piniaPluginPersistedstate)
   ```

   

3. 用法

   ```ts
   import { ref, computed } from 'vue'
   import { defineStore } from 'pinia'
   export const useCounterStore = defineStore(
     'counter',
     () => {
       const count = ref(0)
       const doubleCount = computed(() => count.value * 2)
       function increment() {
         count.value++
       }
       function mixins(step:number) {
         count.value -= step
       }
     	return { count, doubleCount, increment, mixins }
   	},
     {
       // persist: true, // 数据持久化配置, 或者传入一个对象添加更多配置
       persist: {
         key: 'my-counter', // 持久化的数据key
         storage: localStorage, // 或者sessionStorage
       }
     }
   )
   ```

   > 用来持久化的数据不能是异步的，而且必须能够进行序列化的与HTML缓存兼容一致的数据格式【字符串】。

4. 高级使用方式。在 `main.ts`全局配置。

   ```tsx
   // 支持 storage, serializer, debug 三项配置
   pinia.use(createPersistedState({
     storage: sessionStorage,
     serializer: {
       deserialize: parse,
       serialize: stringify
     },
     debug: true
   }))
   ```

   实现以上配置后，在单独的模块中不再需要单独进行配置。

   ```tsx
   persist: {
     key: 'my-counter', // 持久化的数据key
   }
   // 或者
   persist: true
   ```

   









