/**
 * @Author: 陈树鸿
 * @Date: 2019-08-27 15:42
 */
(function () {
  //环境检测
  var root = (typeof self == 'object' && self.self == self && self) ||
    (typeof global == 'object' && global.global == global && global) ||
    this || {};
  
  var ArrayProto = Array.prototype;
  var push = ArrayProto.push;
  
  var _ = function(obj){
    if (!(this instanceof _)){
      return new _(obj)
    }
    this.wrapped = obj
  };
  
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }
  
  _.isFunction = function(obj) {
    return typeof obj == 'function' || false;
  };
  
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var isArrayLike = function(collection) {
    var length = collection.length;
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };
  
  _.each = function(obj, callback) {
    var length, i = 0;
    
    if (isArrayLike(obj)) {
      length = obj.length;
      for (; i < length; i++) {
        if (callback.call(obj[i], obj[i], i) === false) {
          break;
        }
      }
    } else {
      for (i in obj) {
        if (callback.call(obj[i], obj[i], i) === false) {
          break;
        }
      }
    }
    
    return obj;
  }
  
  /**
   * 为了将 _ 上的方法复制到原型上，首先我们要获得 _ 上的方法
   * @param obj
   * @returns {Array}
   */
  _.functions = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };
  
  /**
   * 在 _.mixin(_) 前添加自己定义的方法
   */
  _.reverse = function(string){
    return string.split('').reverse().join('');
  }
  
  _.mixin = function(obj){
    _.each(_.functions(obj),function (name) {
      var func = _[name] = obj[name]
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return func.apply(_, args);
      };
    })
  }
  
  _.mixin(_);
})()
