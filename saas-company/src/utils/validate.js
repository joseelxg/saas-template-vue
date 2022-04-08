/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}


import Vue from 'vue'

export function install(options) {
  Vue.prototype.$validate = {
    /**
         *
         *校验金额
         * @export
         * @param {*} price
         * @returns {Boolean}
         */
    isPrice: function(price) {
      const reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/
      return reg.test(price)
    },

    /**
         *
         *校验金额并且不能为零
         * @export
         * @param {*} price
         * @returns {Boolean}
         */
         isPriceNoZero: function(price) {
      const reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/
      var flag = reg.test(price)
      if (flag) {
        if (price == '0' || price == '0.0' || price == '0.00') {
          flag = false
        }
      }
      return flag
    },

    /**
         *校验正整数
         *
         * @export
         * @param {*} integer
         * @returns
         */
         isPositiveInteger: function(integer) {
      console.log('3333333')
      const reg = /^[1-9]\d*$/
      return reg.test(integer)
    },
    /**
         *校验整数(不包括负数)
         *
         * @export
         * @param {*} integer
         * @returns
         */
         isInteger: function(integer) {
      console.log('3333333')
      const reg = /^0{1}$|^([1-9]\d*)$/
      return reg.test(integer)
    },
    /**
         *校验整数(包括负数)
         *
         * @export
         * @param {*} integer
         * @returns
         */
         isAllInteger: function(integer) {
      console.log('3333333')
      const reg = /^0{1}$|^-?([1-9]\d*)$/
      return reg.test(integer)
    },
    /**
         * 校验整数 或者不填
         * @param {*} integer
         */
     isAllIntegerOrNull: function(integer) {
      if (integer == null || integer == '') { return true }
      console.log('3333333')
      const reg = /^0{1}$|^-?([1-9]\d*)$/
      return reg.test(integer)
    },

    /**
         * 校验价格或者不填
         * @param {*} price
         */
     isPriceOrNull: function(price) {
      if (price == null || price == '') { return true }
      const reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/
      return reg.test(price)
    },
    /**
         *
         *
         * @export
         * @param {*} val 手机号码/固话号码
         */
     isPhone: function(val) {
      const reg = /^((0\d{2,3}-\d{7,8})|(1[3567849]\d{9}))$/
      return reg.test(val)
    }

  }
}
