$(document).ready(function() {
  var i = 0,
    settings = [
      { duration: 1200, easing: 'easeOutBounce' },
      { duration: 1600, easing: 'easeOutElastic' },
      { duration: 600, easing: 'easeOutQuad' },
      { duration: 1000, easing: 'easeOutBack' }
    ]
  
  $('ul.column1, ul.column3').roundabout({
    clickToFocus: false,
    minOpacity: 0,
    minScale: 0,
    minZ: 0,
    duration: 1500,
    shape: 'rollerCoaster'
  })
  
  $('ul.column2, ul.column4').roundabout({
    clickToFocus: false,
    minOpacity: 0,
    minScale: 0,
    minZ: 0,
    reflect: true,
    duration: 1500,
    shape: 'rollerCoaster'
  })

  // 点击播放
  $('#advance').click(() => play($('#advance')))

  var times = null
  // 点击自动播放
  $('#autoPlay').click(function(){
    if($(this).attr('auto') === '0'){
      $(this).attr('auto', '1')
      $(this).text('取消自动切换')
      $('#custom').val('')
      $('#custom').show()
      custom()
    }else{
      clearInterval(times)
      $(this).attr('auto', '0')
      $(this).text('自动切换')
      $('#custom').hide()
    }
  })

  $('#custom').keydown(function(e){
    if(e.keyCode==13){
      if($('#custom').val() <= 0){
        alert('值必要大于等于1')
      }else{
        clearInterval(times)
        custom($('#custom').val())
      }
    }
  })

  // 自定义时长
  function custom(duration = 3) {
    times = setInterval(function(){
      play($('#advance'))
    }, duration * 1000)
  }

  function play(_this){
    if ($('.column1').data("roundabout").animating || $('.column4').data("roundabout").animating) {
      return false
    }
    
    i++
    i = i++ % settings.length
    
    // fade out link
    _this.fadeTo(400, 0.5)
    
    $('.column1').roundabout('animateToNextChild', settings[i].duration, settings[i].easing)
    setTimeout(function() { $('.column2').roundabout('animateToNextChild', settings[i].duration + 100, settings[i].easing) }, 100)
    setTimeout(function() { $('.column3').roundabout('animateToNextChild', settings[i].duration + 200, settings[i].easing) }, 200)
    setTimeout(function() { $('.column4').roundabout('animateToNextChild', settings[i].duration + 250, settings[i].easing, function() { $('#advance').fadeTo(400, 1) }) }, 300)
    
    return false
  }
})