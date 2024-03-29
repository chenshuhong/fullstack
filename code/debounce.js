/**
 * @Author: 陈树鸿
 * @Date: 2019-08-23 11:04
 */
function debounce(func,wait,immediate){
  var timeout,result
  var debounced =  function(){
    var context = this
    var args = arguments
    clearTimeout(timeout)
    if (immediate){
      var callNow = !timeout;
      timeout = setTimeout(function(){
        timeout = null;
      }, wait)
      if (callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(function(){
        func.apply(context,args)
      },wait)
    }
    return result
  }
  
  debounced.cancel = function(){
    clearTimeout(timeout)
    timeout = null
  }
  
  return debounced
}
