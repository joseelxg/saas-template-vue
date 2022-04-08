import store from '@/store'
import Vue from 'vue'

export function install(options){
 
  Vue.prototype.$permission = {

    /**
     *
     * 是否是管理员角色
     * @param {string} name 参数名
     * @returns
     */
    isAdmin: function() {
      const super_admin = "admin";
      const roles = store.getters && store.getters.roles
      const hasRole = roles.some(role => {
        return super_admin === role
      })
      return hasRole
    },
    /**
       *
       * 是否是本人创建
       * @param {string} obj 对象
       * @returns
       */
    isSelf: function(obj) {
     
      const name = store.getters && store.getters.name
      const createBy = obj&&obj.createBy
      return createBy==name
    },
  
    /**
       *
       * 登陆者账号
       * @param {string} obj 对象
       * @returns
       */
     userName: function() {
     
      const name = store.getters && store.getters.name
      return name
    },
    /**
   * 字符权限校验
   * @param {Array} value 校验值
   * @returns {Boolean}
   */
    checkPermi:function(value) {
      if (value && value instanceof Array && value.length > 0) {
        const permissions = store.getters && store.getters.permissions
        const permissionDatas = value
        const all_permission = "*:*:*";
  
        const hasPermission = permissions.some(permission => {
          return all_permission === permission || permissionDatas.includes(permission)
        })
  
        if (!hasPermission) {
          return false
        }
        return true
      } else {
        console.error(`need roles! Like checkPermi="['system:user:add','system:user:edit']"`)
        return false
      }
    },
  
    /**
     * 角色权限校验
     * @param {Array} value 校验值
     * @returns {Boolean}
     */
    checkRole:function(value) {
      if (value && value instanceof Array && value.length > 0) {
        const roles = store.getters && store.getters.roles
        const permissionRoles = value
        const super_admin = "admin";
  
        const hasRole = roles.some(role => {
          return super_admin === role || permissionRoles.includes(role)
        })
  
        if (!hasRole) {
          return false
        }
        return true
      } else {
        console.error(`need roles! Like checkRole="['admin','editor']"`)
        return false
      }
    }
  }
  

}



