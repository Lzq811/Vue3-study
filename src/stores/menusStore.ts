import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { IterMenuItem } from '@ts/menuTypes'

export const useMenusStore = defineStore('use-menus-store', () => {
  // 当前账户所拥有的菜单list
  const menuList: Ref<IterMenuItem[]> = ref([
    {
			id: 1,
			name: '系统管理',
			icon: 'el-icon-setting',
			path: '#',
			children: [
				{
					id: 2,
					name: '菜单管理',
					icon: 'Menu',
					path: 'SYSTEM_MENUS'
				},
				{
					id: 3,
					name: '按钮管理',
					icon: 'Pointer',
					path: 'SYSTEM_BTNS'
				},
				{
					id: 4,
					name: '协议管理',
					icon: 'WarnTriangleFilled',
					path: '#',
					children: [
						{
							id: 5,
							name: '平台协议',
							icon: 'Paperclip',
							path: 'SYSTEM_PROTOCOL'
						},
						{
							id: 6,
							name: '会员协议',
							icon: 'User',
							path: 'SYSTEM_MEMBER_PROTOCOL'
						}
					]
				}
			]
		}
  ])
  // 登陆成功或获取
  function updateMenuList(list: Array<IterMenuItem>) {
    menuList.value = list
  }
  // 当前激活页面
  const currActivePath: Ref<string> = ref('/') // 默认home页
  function updateActivePath (path: string) {
    currActivePath.value = path
  }
  // 当前用户所拥有的按钮权限list
  const btnList: Ref<string[]> = ref([])
  // 登陆后获取按钮权限
  function updateBtnList(list: string[]) {
    btnList.value = list
  }

  // 页签所展示的页面
  const menusTags: Ref<IterMenuItem[]> = ref([])
  function addMenuTags(menu: IterMenuItem) {
    const idx = menusTags.value.findIndex(item => item.id === menu.id)
    if (idx === -1) { // 没有重复
      menusTags.value.push(menu)
    }
  }
  function mixinsMenuTags ( idx: number) {
    menusTags.value.splice(idx, 1)
  }

  return {menuList, updateMenuList, btnList, updateBtnList, menusTags, addMenuTags, mixinsMenuTags, updateActivePath, currActivePath }
})
