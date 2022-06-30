$(function () {
  var keyword = [
    {
      id: '0',
      name: '乱扔垃圾',
      count: 123
    },
    {
      id: '1',
      name: '乱停车',
      count: 333
    },
    {
      id: '2',
      name: '乱张贴',
      count: 16
    },
    {
      id: '3',
      name: '广告缺失',
      count: 77
    },
    {
      id: '4',
      name: '楼道堵塞',
      count: 60
    },
    {
      id: '5',
      name: '无志愿工作者',
      count: 555
    },
    {
      id: '6',
      name: '不良风气',
      count: 45
    },
    {
      id: '7',
      name: '垃圾堆积',
      count: 323
    },
    {
      id: '8',
      name: '乱穿马路',
      count: 65
    },
    {
      id: '9',
      name: '保洁不及时',
      count: 9
    },
    {
      id: '11',
      name: '清运不及时',
      count: 23
    },
    {
      id: '10',
      name: '乱搭建',
      count: 11
    },
    {
      id: '12',
      name: '布置不达标',
      count: 55
    },
  ]

  var mode = 'multiple' // 选择模式， multiple----多选(默认)  single------单选
  var keywordValue_multiple = [] // 保存关键词多选筛选值
  var keywordValue_single = '' // 保存关键词单选筛选值

  // 打开关键词查询数据列表
  select_keyword = (e) => {
    stopPropagations(e)
    $('.select_list').css({'top': `${$('.keywordSearch_select').height() + 10}px`})
    $("#keyValue").focus() // 设置光标
    if($('.select_list').attr('class').indexOf('fadeIn') !== -1){
      $('.select_list').removeClass('fadeIn')
      $('.select_list').addClass('fadeOut')
    }else{
      $('.select_list').removeClass('fadeOut')
      $('.select_list').addClass('fadeIn')
    }
  }

  // 渲染关键词下拉列表
  renderKeyword()
  function renderKeyword(){
    var element_keyWord = ''
    for(var k = 0; k < keyword.length; k++){
      element_keyWord += `<p class='option' ids='${keyword[k].id}' onclick='selectItem(${JSON.stringify(keyword[k])}, event, this)'>`
      element_keyWord += "<span class='option_item'>"
      element_keyWord += `<span>${keyword[k].name}</span>`
      if(keyword[k].count){
        element_keyWord += `<span class="badge">${keyword[k].count}</span>`
      }
      element_keyWord += "</span>"
      element_keyWord += '<svg viewBox="64 64 896 896" focusable="false" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" fill="#1890ff"></path></svg>'
      element_keyWord += "</p>"
    }
    $('.select_list').append(element_keyWord)
  }

  var stepCount = 0
  // 下拉列表选择事件
  selectItem = (item, e, _this) => {
    if(mode === 'multiple'){ // 多选模式
      stopPropagations(e)
      var left = 0
      var top = 0
      var widthAll = 0
      if($(_this).attr('class').indexOf('option_active') === -1){ // 未选中，添加
        keywordValue_multiple.push(item.id)
        $(_this).addClass('option_active')
        var element_item = `<p
                              class="selected_item"
                              ondragstart='dragStart(event)'
                              ondrag='drag(event)'
                              ondragend='dragEnd(event)'
                              draggable='true'
                              ids='${item.id}'
                              indexs='${stepCount}'
                            >`
          element_item += `<span>${item.name}</span>`
          element_item += `<span onclick='clearKeyWord(${JSON.stringify(item)}, event, this)'>×</span>`
          element_item += '</p>'
        $('.select_selection').append(element_item)

        // 自动定位排列
        for(var se = 0; se < $('.selected_item').length; se++){
          if(se !== 0 && $('.selected_item').eq(se - 1).attr('indexs') === String(stepCount)){
            widthAll += $('.selected_item').eq(se - 1).outerWidth(true)
            left += $('.selected_item').eq(se - 1).outerWidth(true)
          }
          if($('.selected_item').eq(se).attr('ids') === item.id){
            if($('.select_selection').width() - widthAll < $('.selected_item').eq(se).outerWidth(true)){
              stepCount ++  
              left = 0
              widthAll = 0
            }
            top = stepCount * 29
            $('.selected_item').eq(se).attr('indexs', stepCount)
            $('.select_selection').height((stepCount + 1) * 27)
            $('.selected_item').eq(se).css({left: `${left}px`, top: `${top}px`})
          }
        }

      }else{ // 选中点击时则删除
        $(_this).removeClass('option_active')
        for(var r = 0; r < $('.selected_item').length; r++){
          if($('.selected_item').eq(r).attr('ids') === String(item.id)){
            keywordValue_multiple.splice(r, 1)

            var currentIndex = 0 // 当前点击删除的元素的indexs
            if($(_this).attr('ids') === $('.selected_item').eq(r).attr('ids')){
              currentIndex = $('.selected_item').eq(r).attr('indexs')
            }
            for(var ne = 0; ne < $('.selected_item').eq(r).nextAll().length; ne++){
              // 如果当前删除的元素的indexs等于后面的元素的indexs，就直接使用上一个元素的位置；
              // 如果不相等，则拿到indexs进行循环，比较上一层是否有足够的位置放下当前的元素，如果有top改变，left改变，没有则top不变，left依次在本行排序
              var elememts = $('.selected_item').eq(r).nextAll().eq(ne)
              
              if(elememts.attr('indexs') === currentIndex){
                if(ne === 0){
                  left = elememts.prev().position().left
                }else{
                  left = elememts.prev().position().left + elememts.prev().outerWidth(true)
                }
              }else{
                for(var ol = 0; ol < $('.selected_item').length; ol++){
                  if($('.selected_item').eq(ol).attr('indexs') == Number(elememts.attr('indexs')) - 1){
                    widthAll += $('.selected_item').eq(ol).outerWidth(true)
                  }
                }
                if($('.select_selection').width() - widthAll + $('.selected_item').eq(r).outerWidth(true) < elememts.outerWidth(true)){
                  left = 0
                  top = Number(elememts.attr('indexs')) * 29
                }else{
                  top = (Number(elememts.attr('indexs')) - 1) * 29
                  left = widthAll - $('.selected_item').eq(r).outerWidth(true)
                  elememts.attr('indexs', Number(elememts.attr('indexs')) - 1)
                }
                console.log($('.select_selection').width())
                console.log(widthAll)
                console.log(widthAll - $('.selected_item').eq(r).outerWidth(true))
                console.log(elememts.outerWidth(true))
              }
              elememts.css({left: `${left}px`, top: `${top}px`})
            }

            
            $('.selected_item').eq(r).remove()
          }
        }
      }
      $('.select_list').css({'top': `${$('.keywordSearch_select').height() + 10}px`})
      // console.log(keywordValue_multiple)
    }else{ // 单选模式
      keywordValue_single = item.id
      $('.select_selection').text(item.name)
      for(var s = 0; s < $('.option').length; s++){
        $('.option').eq(s).removeClass('option_active')
      }
      $(_this).addClass('option_active')
      // console.log(keywordValue_single)
    }
  }

  // 多选状态下清空单个选中项
  clearKeyWord = (item, e, _this) => {
    stopPropagations(e)
    $(_this).parent().remove()
    for(var c = 0; c < $('.option').length; c++){
      if(String(item.id) === $('.option').eq(c).attr('ids')){
        $('.option').eq(c).removeClass('option_active')
      }
    }
    keywordValue_multiple.splice(keywordValue_multiple.indexOf(item.id), 1)
    // console.log(keywordValue_multiple)
  }

  // 清空所有关键词
  clearAllKeyWord = (e) => {
    stopPropagations(e)
    if((mode === 'multiple' && keywordValue_multiple.length === 0) || (mode === 'single' && keywordValue_single === '')){
      if($('.select_list').attr('class').indexOf('fadeIn') !== -1){
        $('.select_list').removeClass('fadeIn')
        $('.select_list').addClass('fadeOut')
      }
      return false
    }
    for(var s = 0; s < $('.option').length; s++){
      $('.option').eq(s).removeClass('option_active')
    }
    if(mode === 'multiple'){
      $('.select_list').removeClass('fadeIn')
      $('.select_list').addClass('fadeOut')
    }
    keywordValue_single = ''
    keywordValue_multiple = []
    $('.select_selection').height('auto')
    $('.select_selection').empty()
    stepCount = 0
  }

  var isdrag = true;  //是否移动
  var topHeight = $(".others").css("height");  //头部div的高度
  var topHeightInt = 0;
  var elementHeight = $(".drag-div-elem").css("height");  //每一个移动元素DIV的高度
  var elementHeightInt = 0;
  var halfElementHeightInt = 0;
  var startEleCssTopInt;//元素div的起始时的top值
  var lastTouchTempY = null;//上一次滑动时元素触摸点坐标
  var startX = 0 // 起始时的X坐标
  var startY = 0 // 起始时的Y坐标
  var choseEleNum = null; //选择的是第几个元素
  var eleMoveDistance = 0;   //选择元素相对于其他元素的距离
  var isNeedMoveEle = true;   //其他元素是否需要移动
  var theMaxNumberAttr = null; //元素最大的number值
  var theMinNumberAttr = null; //元素最小的number值
  var theMaxMoveScope = null;  //可以移动的最大范围  ，最小范围为topHeightInt；

  // 开始拖动元素时触发
  dragStart = (e) => {
    isdrag = true
    e.preventDefault()
    startX = e.pageX
    startY = e.pageY
    for(var dn = 0; dn < $('.selected_item').length; dn++){
      if($('.selected_item').eq(dn).attr('ids') === $(e.target).attr('ids')){
        choseEleNum = dn + 1
      }
    }
    console.log(choseEleNum)
    $(e.target).addClass('show_top')
  }

  // 元素正在拖动时触发
  drag = (e) => {
    e.preventDefault()
    console.log('移动中')
  }

  // 完成元素拖动后触发
  dragEnd = (e) => {
    e.preventDefault()
    console.log('aaaaaaaaaaaaaaaa')
    isdrag = false
    // lastTouchTempY = null
    $(e.target).removeClass('show_top')
  }



  // 点击筛选框清除关键词列表
  $('#search').bind('click', () => {
    if($('.select_list').attr('class').indexOf('fadeIn') !== -1){
      $('.select_list').removeClass('fadeIn')
      $('.select_list').addClass('fadeOut')
    }
  })

  // 点击地图清除关键词列表
  $('body').bind('click', () => {
    if($('.select_list').attr('class').indexOf('fadeIn') !== -1){
      $('.select_list').removeClass('fadeIn')
      $('.select_list').addClass('fadeOut')
    }
  })
  
  // 点击打开搜索框
  $('.search_img').click((e) => {
    stopPropagations(e)
    $('#search').css({'width': '490px', 'border-radius': '0'})
    $('.search_img').hide()
    $('.search_body').show()
  })

  // 关闭搜索框
  closeSearch = (e) => {
    stopPropagations(e)
    $('#search').css({'width': '45px', 'border-radius': '50%'})
    $('.search_body').hide()
    $('.search_img').css({'display': 'flex'})
    $('.select_list').removeClass('fadeOut')
    $('.select_list').removeClass('fadeIn')
  }

  // 阻止事件冒泡通用函数
  stopPropagations = (ev) => {
    var evs = ev || window.event
    evs.stopPropagation()
  }

})