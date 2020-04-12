window.onload = function () {

    let oInp = document.getElementById('inp')
    let oSelect_button = document.getElementById('select_button')
    let oReset = document.getElementById('reset')
    let oBox = document.getElementById('box')
    let oShade = document.getElementById('shade')

    let number = 0, num = 0

    // 查询事件
    oSelect_button.onclick = () => {
        tianqiAPI()
    }

    // 重置事件
    oReset.onclick = () => {
        if (num != 0) {
            oBox.removeChild(document.getElementById(`box_body${num}`))
            oBox.removeChild(document.getElementById(`citys${num}`))
        }
        oInp.value = ''
        document.getElementById('body').className = ''
        num = 0
    }

    // 监听键盘回车键事件
    document.onkeydown = (event) => {
        var ev = ev || window.event
        if (ev.keyCode === 13) {
            tianqiAPI()
        } else {
            return
        }
    }

    tianqiAPI = () => {
        let str = ''
        if (oInp.value === '' || oInp.value === null || oInp.value === undefined) {
            alert('若不指定城市查询则返回当前城市天气！')
            // return
        } else {
            str = `city=${oInp.value}&`
        }

        oShade.style.display = 'block'
        let ajax = new XMLHttpRequest()
        ajax.open('get', `https://www.tianqiapi.com/api/?version=v1&${str}appid=88991653&appsecret=isDc63St`)
        ajax.send()
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                if (ajax.status == 200) {
                    success(ajax.responseText) // 接口调用成功后的回调函数
                } else {
                    alert('接口请求错误！')
                    oShade.style.display = 'none'
                    return
                }
            }
        }
    }

    success = (responseText) => {
        oShade.style.display = 'none'
        let message = JSON.parse(responseText)
        if (oInp.value && oInp.value != message.city) {
            alert('未查询到相关地区的天气情况！')
            if (document.getElementById(`box_body${num}`)) {
                oBox.removeChild(document.getElementById(`box_body${num}`))
                oBox.removeChild(document.getElementById(`citys${num}`))
                oInp.value = ''
                document.getElementById('body').className = ''
                num = 0
            }
            return
        }

        if (message.data[0].wea.indexOf('雨') != -1) {
            document.getElementById('body').className = 'yu'
        } else {
            document.getElementById('body').className = 'qing'
        }

        num++

        let h1 = document.createElement('h1')
        h1.innerHTML = message.city
        h1.id = `citys${num}`
        oBox.appendChild(h1)


        // 根据数据长度动态添加展示
        let str = `<div id='box_body${num}'>`
        message.data.map((item, index) => {
            str += `<div class='box_title' key=${index}>`;
            str += `<p class='box_tq_date1'>${item.day}</p>`;
            str += `<p class='box_tq_date2'><img src=${tianqi(item.wea)}></p>`;
            str += `<p class='box_tq_date3'>${item.tem2}~${item.tem1}</p>`;
            str += `<p class='box_tq_date4'>${item.win_speed}</p>`;
            str += `<p class='box_tq_date5'>${item.wea}</p>`;
            str += `<span class="box_tq_date6 ${level(item.air)}">${item.air_level ? item.air_level : '良'}</span>`;
            str += `<p class='box_tq_date7' title='${item.air_tips || '暂无提示！'}'>${item.air_tips ? item.air_tips : '暂无提示！'}</p>`;
            str += '</div>'

        })
        str += '</div>'
        oBox.innerHTML += str

        // 若num大于1时，动态删除前一个查询的内容
        if (num > 1) {
            oBox.removeChild(document.getElementById(`box_body${num - 1}`))
            oBox.removeChild(document.getElementById(`citys${num - 1}`))
        }

        // 根据天气情况，动态改变容器的背景色
        for (let i = 0; i < message.data.length; i++) {
            backgroundChange(message.data[i], i)
            document.getElementsByClassName('box_title')[i].index = i
            document.getElementsByClassName('box_title')[i].onmouseover = function () {
                if (message.data[i].wea.indexOf('雨') != -1) {
                    document.getElementById('body').className = 'yu'
                } else {
                    document.getElementById('body').className = 'qing'
                }
                number = this.index
                change(message)
            }
            document.getElementsByClassName('box_title')[i].onmouseout = function () {
                document.getElementsByClassName('box_title')[i].style.boxShadow = ''
            }
        }
    }

    backgroundChange = (obj, i) => {
        if (obj.wea.indexOf('雨') != -1) {
            document.getElementsByClassName('box_title')[i].className = 'box_title yu'
        } else {
            document.getElementsByClassName('box_title')[i].className = 'box_title qing'
        }

    }

    tianqi = (type) => {
        let imgType = ''
        if (type.indexOf('晴') === 0) {
            imgType = './images/qt.png'
        } else if (type.indexOf('多云') === 0 || type.indexOf('小到中雨') === 0) {
            imgType = './images/dy.png'
        } else if (type.indexOf('阵雨') === 0) {
            imgType = './images/zy.png'
        } else if (type.indexOf('小雨') === 0) {
            imgType = './images/xy.png'
        } else if (type.indexOf('中雨') === 0) {
            imgType = './images/centery.png'
        } else if (type.indexOf('大雨') === 0) {
            imgType = './images/bigy.png'
        } else if (type.indexOf('雷阵雨') === 0) {
            imgType = './images/lzy.png'
        } else if (type.indexOf('阴') === 0) {
            imgType = './images/yt.png'
        }
        return imgType
    }

    level = (level) => {
        let levelClass = ''
        if (level <= 50) {
            levelClass = 'level_1'
        } else if ((level >= 51 && level <= 100) || level === undefined) {
            levelClass = 'level_2'
        } else if (level >= 101 && level <= 150) {
            levelClass = 'level_3'
        } else if (level >= 151 && level <= 200) {
            levelClass = 'level_4'
        } else if (level >= 201 && level <= 300) {
            levelClass = 'level_5'
        } else if (level > 300) {
            levelClass = 'level_6'
        }
        return levelClass
    }

    change = (message) => {
        for (let i = 0; i < message.data.length; i++) {
            document.getElementsByClassName('box_title')[i].style.boxShadow = ''
        }
        document.getElementsByClassName('box_title')[number].style.boxShadow = '6px 8px 10px #dfeffb'
    }




}