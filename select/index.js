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
  var placementKeyword = 'bottom' // 列表位置

  var dateList = [] // 保存选中的时间


  if(mode === 'single'){
    $('#keyValue').attr('placeholder', '请选择')
    $('#keyValue').attr("disabled","disabled")
  }
  // 打开关键词查询数据列表
  select_keyword = (e) => {
    stopPropagations(e)
    if($(window).height() - $('.keywordSearch_select').offset().top - $('.keywordSearch_select').outerHeight() > 350){
      placementKeyword = 'bottom'
      $('.select_list').css({'top': `${$('.keywordSearch_select').height() + 10}px`})
    } else {
      placementKeyword = 'top'
      $('.select_list').css({'bottom': `${$('.keywordSearch_select').height() + 10}px`})
    }

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

  // 下拉列表选择事件
  selectItem = (item, e, _this) => {
    if(mode === 'multiple'){ // 多选模式
      stopPropagations(e)
      if($(_this).attr('class').indexOf('option_active') === -1){ // 未选中，添加
        keywordValue_multiple.push(item.id)
        $(_this).addClass('option_active')
        createLabel(item)
      }else{ // 选中点击时则删除
        $(_this).removeClass('option_active')
        for(var r = 0; r < $('.selected_item').length; r++){
          if($('.selected_item').eq(r).attr('ids') === String(item.id)){
            keywordValue_multiple.splice(r, 1)
            $('.selected_item').eq(r).remove()
          }
        }
      }
      if(placementKeyword === 'top'){
        $('.select_list').css({'bottom': `${$('.keywordSearch_select').height() + 10}px`})
      }else{
        $('.select_list').css({'top': `${$('.keywordSearch_select').height() + 10}px`})
      }
      
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

  // 监听自定义关键词文本框回车事件
  $('#keyValue').keyup(event => {
    if(event.keyCode === 13){
      if($('#keyValue').val()){
        var obj = {
          id: $('#keyValue').val(),
          name: $('#keyValue').val(),
          count: 0,
        }
        createLabel(obj)
        keywordValue_multiple.push($('#keyValue').val())
        $('#keyValue').val('')
        if(placementKeyword === 'top'){
          $('.select_list').css({'bottom': `${$('.keywordSearch_select').height() + 10}px`})
        }else{
          $('.select_list').css({'top': `${$('.keywordSearch_select').height() + 10}px`})
        }
      }
    }
  })

  // 创建多选状态下选中的元素标签
  createLabel = (item) => {
    var element_item = `<p
                          class="selected_item"
                          ondragstart='dragStart(event)'
                          draggable='true'
                          ids='${item.id}'
                        >`
        element_item += `<span>${item.name}</span>`
        element_item += `<span onclick='clearKeyWord(${JSON.stringify(item)}, event, this)'>×</span>`
        element_item += '</p>'
    $(element_item).insertBefore('.select_input')
    $('.selected_item').arrangeable() // 拖拽排序
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
      $('.selected_item').remove()
    }else{
      $('.select_selection').empty()
    }

    keywordValue_single = ''
    keywordValue_multiple = []
  }

  // 开始拖动元素时触发
  dragStart = (e) => {
    e.preventDefault()
  }


  // 点击筛选框清除关键词列表
  $('#search').bind('click', () => {
    if($('.select_list').attr('class').indexOf('fadeIn') !== -1){
      $('.select_list').removeClass('fadeIn')
      $('.select_list').addClass('fadeOut')
    }
  })

  // 点击文档清除关键词列表
  $('body').bind('click', () => {
    if($('.select_list').attr('class').indexOf('fadeIn') !== -1){
      $('.select_list').removeClass('fadeIn')
      $('.select_list').addClass('fadeOut')
    }
  })

  // 加载开始时间/结束时间
  $.datetimepicker.setLocale('ch')
  $('.dateSearch_selection').datetimepicker({
    timepicker: false,
    format: 'Y/m/d',
    onSelectDate: (ct) => {
      var date = new Date(ct)
      createDateLabel(`${date.getFullYear()}/${format(date.getMonth() + 1)}/${format(date.getDate())}`)
    }
  })

  // 创建时间标签
  createDateLabel = (v) => {
    if($('.dateSearch_selection').children('span').length !== 0){ // 存在placeholder就移除
      $('.dateSearch_selection').children('span').hide()
    }
    var element_date = `<p
                          class="date_item"
                          ondragstart='dragStart(event)'
                          draggable='true'
                          ids='${v}'
                        >`
        element_date += `<span>${v}</span>`
        element_date += `<span onclick='clearDate(event, this)'>×</span>`
        element_date += '</p>'
    $('.dateSearch_selection').append(element_date)
    $('.date_item').arrangeable() // 拖拽排序
    dateList.push(v)
    console.log(dateList)
  }

  // 设置时间
  setDate = () => {
    $('.dateSearch_selection').datetimepicker('show')
    var top = $('.dateSearch').offset().top + $('.dateSearch').outerHeight()
    var left = $('.dateSearch').offset().left
    $('.xdsoft_datetimepicker').css({'z-index': 99999, 'top': `${top}px`, 'left': `${left}px`})
  }

  // 多选状态下清空单个选中项
  clearDate = (e, _this) => {
    stopPropagations(e)
    var item = $(_this).parent().attr('ids')
    $(_this).parent().remove()
    dateList.splice(dateList.indexOf(item), 1)
    if(dateList.length === 0){
      $('.dateSearch_selection').children('span').show()
    }
    console.log(dateList)
  }

  // 清除所有的选中的时间列表
  clearAllDateSearch = (e) => {
    stopPropagations(e)
    $('.date_item').remove()
    $('.dateSearch_selection').children('span').show()
    dateList = []
  }
  
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

  // 时间位数格式化，
  format = (num) => {
    var data = ''
    if(num < 10){
      data = `0${num}`
    }else{
      data = num
    }
    return data
  }

})