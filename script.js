(function () {
    const _windows = this
    var isTouchDevice = 'ontouchstart' in document.documentElement
    console.log('isTouchDevice', isTouchDevice)
    var canvas = document.getElementById("canvas")
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
    var ctx = canvas.getContext("2d")
    ctx.fillStyle = "black"
    ctx.lineWidth = '6'
    ctx.lineCap = 'round'
    let painting = false
    let last = null
    if (isTouchDevice) {
        canvas.ontouchstart = (e) => {
            let x = e.touches[0].clientX
            let y = e.touches[0].clientY
            last = x && y?[x, y]: [0, 0];
        }
        canvas.ontouchmove = (e) => {
            let x = e.touches[0].clientX
            let y = e.touches[0].clientY
            drawLine(ctx, last[0], last[1], x, y )
            last = [x, y];
        }
    }else {
        canvas.onmousemove = (e) => {
            if (painting === true) {
                drawLine(ctx, last[0], last[1], e.clientX, e.clientY)
                last = [e.clientX, e.clientY]
            }
            
        }
        canvas.onmousedown = (e) => {
            painting = true
            last = e.clientX?[e.clientX, e.clientY]: [0, 0]
        }
        canvas.onmouseup = () => {
            painting = false
        }
    }
    function drawLine (ctx, x1, y1, x2, y2) {
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
        }
    
    
    // _windows.canvas.onmousemove = (e) => {
    //     console.log(e.clientX, e.clientY)
    //     let newdiv = document.createElement('div')
    //     newdiv.style.position = 'absolute'
    //     newdiv.style.top = e.clientY + 'px'
    //     newdiv.style.left = e.clientX + 'px'
    //     newdiv.style.border = '1px solid black'
    //     newdiv.style.width = '10px'
    //     newdiv.style.height = '10px'
    //     newdiv.style.transform = 'translate(-50%, -50%)'
    //     newdiv.style.borderRadius = '50%'
    //     newdiv.style.background = 'red'
    //     _windows.canvas.appendChild(newdiv)
    // }
    
})();