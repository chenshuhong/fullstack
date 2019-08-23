/**
 * @Author: 陈树鸿
 * @Date: 2019-08-23 11:46
 */
/**
 * 时间戳实现版本
 * @param func
 * @param wait
 * @returns {Function}
 */
function throttle(func, wait){
  var context, args;
  var previous = 0
  return function(){
    var now = +new Date()
    context = this;
    args = arguments;
    if (now-previous>wait) {
      func.apply(context,args)
    }
  }
}

/**
 * 定时器实现版本
 * @param func
 * @param wait
 * @returns {Function}
 */
function throttle(func, wait){
  var context, args;
  
  var timeout = null
  return function(){
    context = this;
    args = arguments;
    if (timeout){
      setTimeout(function(){
        func.apply(context,args)
        timeout = null
      },wait)
    }
  }
}

/**
 * 双剑合璧版本
 * @param func
 * @param wait
 * @returns {Function}
 */
function throttle(func, wait,options = {}){
  var context, args,timeout,previous = 0,now;
  var throttled =  function(){
    context = this;
    args = arguments;
    //下次触发 func 剩余的时间
    now = +new Date()
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    if (remaining<=0||remaining>wait){
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    }else if (!timeout&& options.trailing !== false) {
      timeout = setTimeout(function(){
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args)
      }, remaining);
    }
  }
  
  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  }
  
  return throttled
}
