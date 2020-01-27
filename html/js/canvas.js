const WIDTH = 200
const HEIGHT = 200

let ctx
let canvas
let layer
let stage
let image

let isPaint = false

function initCanvas() {
    canvas = document.createElement('canvas')
    ctx = canvas.getContext("2d")
    canvas.width = WIDTH
    canvas.height = HEIGHT

    stage = new Konva.Stage({
        container: 'container',
        width: WIDTH,
        height: HEIGHT
    })

    addLayer()

    stage.on('mouseup touchend', function() {
        isPaint = false
    })

    stage.on('mousemove touchmove', function() {
        if (!isPaint) {
            return
        }

        ctx.globalCompositeOperation = 'source-over'
        ctx.beginPath()

        let localPos = {
            x: lastPointerPosition.x - image.x(),
            y: lastPointerPosition.y - image.y()
        }

        ctx.moveTo(localPos.x, localPos.y)

        var pos = stage.getPointerPosition()
        localPos = {
            x: pos.x - image.x(),
            y: pos.y - image.y()
        }

        ctx.lineTo(localPos.x, localPos.y)
        ctx.closePath()
        ctx.stroke()

        lastPointerPosition = pos
        layer.batchDraw()
    })
}

function addLayer() {
    let rect = new Konva.Rect({
        width: 200,
        height: 200,
        fill: 'black'
    })

    layer = new Konva.Layer()
    stage.add(layer)

    image = new Konva.Image({
        image: canvas,
        x: 0,
        y: 0
    })

    layer.add(rect)
    layer.add(image)
    stage.draw()

    ctx.strokeStyle = 'white'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 10

    image.on('mousedown touchstart', function() {
        isPaint = true
        lastPointerPosition = stage.getPointerPosition()
    })
}

function resetCanvas() {
    stage.destroy()
    initCanvas()
}

function extractImage() {
    const newImg = new Image()
    newImg.src = canvas.toDataURL()

    newImg.onload = () => {
        onImageExtract(newImg)
        resetCanvas()
    }
}
