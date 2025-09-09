/**
 * ! axios入口文件，所有接口相关功能都可以从此文件引入后再集中导出
 * 1. 集中管理管理当前环境使用的后端服务地址
 * 2. 统一把各个模块的接口导入到该文件，统一导出
 * 3. 调用时只需要 api.common.reqGetDogs() 来调用接口，common为模块名称，reqGetDogs为接口名称
 */

// 后台地址--后续配置环境变量时优化
export const BASE: string = 'http://xxx.xxx.xx:8087'

// 通用接口
import * as common from './common'

// 其他模块接口

export default { common }
