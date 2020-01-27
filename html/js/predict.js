let lastImage = null
let lastPred = null

function onImageExtract(img) {
    let pixels = this.transformImage(img)
    let lastPrediction = this.predict(pixels)

    lastImage = img
    lastPred = lastPrediction
    displayLatest()
}

function transformImage(img) {
    const elem = document.createElement('canvas');
    elem.width = 28;
    elem.height = 28;

    const ctx = elem.getContext('2d')
    ctx.drawImage(img, 0, 0, 28, 28)

    const new_data = ctx.getImageData(0, 0, elem.width, elem.height)

    let pixels = [ ]

    for (let i = 0; i < new_data.data.length; i += 4) {
      pixels.push( new_data.data[i] / 255 )
    }

    return pixels
}

function predict(pixels) {
    console.log("Predicting...")

    let tensor = tf.tensor(pixels, [28, 28, 1])
    const res = model.predict(tensor.reshape([1, 28, 28, 1]))
    const { indices } = tf.topk(res)

    return indices.dataSync()[0]
}

function displayLatest() {
    let image = document.getElementById('latest-image')
    let label = document.getElementById('latest-label')

    image.src = lastImage.src
    label.innerHTML = "Classification: " + lastPred
}
