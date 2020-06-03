window.onload = () => {
    let oBox_ul = document.getElementById('box_ul')
    let arr = [{}, {}]
    let context = ''
    console.log(arr)
    arr.map((v, i) => {
        console.log('aa')
        context += '<li></li>'
    })
    console.log(context)
    oBox_ul.innerHTML += context
}