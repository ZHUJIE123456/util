window.onload = function(){
  let _self = this
  let number = 0, uNumber = 0
  let oBanner = document.getElementsByClassName('banner')[0]
  let oHead_ul_li = document.getElementsByClassName('head_ul_li')
  let oUser_ul_li = document.getElementsByClassName('user_ul_li')
  let oUser_ul_ewm = document.getElementsByClassName('user_ul_ewm')[0]
  let oBigewm = document.getElementsByClassName('big_ewm')[0]

  // 鼠标移入导航栏改变背景颜色
  oBanner.onmouseover = function(){
    oBanner.style.background = '#000'
  }


  // 鼠标移入导航项时改变其颜色以及出现二级导航
  for(let i = 0; i < oHead_ul_li.length; i++){
    oHead_ul_li[i].index = i
    
    // 鼠标移入事件
    oHead_ul_li[i].onmouseover = function(){
      number = this.index
      change('over')
    }

    // 鼠标移出事件
    oHead_ul_li[i].onmouseout = function(){
      number = this.index
      change('out')
    }
  }

  // 改变字体颜色
  function change(type){
    if(type === 'over'){
      for(let i = 0; i < oHead_ul_li.length; i++){
        oHead_ul_li[0].className = 'head_ul_li write'
        oHead_ul_li[i].className = 'head_ul_li'
      }
      oHead_ul_li[number].className = 'head_ul_li action textAction'
    }else {
      for(let i = 0; i < oHead_ul_li.length; i++){
        oHead_ul_li[0].className = 'head_ul_li write'
        oHead_ul_li[i].className = 'head_ul_li'
      }
    }
    
  }

  // 改变登陆注册按钮样式
  for(let i = 0; i < oUser_ul_li.length; i++){
    oUser_ul_li[i].indexs = i

    // 鼠标移入
    oUser_ul_li[i].onmouseover = function(){
      uNumber = this.indexs
      uChange('over')
    }

    // 鼠标移出
    oUser_ul_li[i].onmouseout = function(){
      uNumber = this.indexs
      uChange('out')
    }
  }
  
  function uChange(type){
    if(type === 'over'){
      for(let i = 0; i < oUser_ul_li.length; i++){
        oUser_ul_li[i].className = 'user_ul_li'
      }
      oUser_ul_li[uNumber].className = 'user_ul_li textAction'
    }else {
      for(let i = 0; i < oUser_ul_li.length; i++){
        oUser_ul_li[i].className = 'user_ul_li'
      }
    }
    
  }


  oUser_ul_ewm.onmouseover = function(){
    oBigewm.style.display = 'block'
  }

  oUser_ul_ewm.onmouseout = function(){
    oBigewm.style.display = 'none'
  }



  // 鼠标移出导航栏无背景色
  oBanner.onmouseout = () => {
    oBanner.style.background = ''
  }



}