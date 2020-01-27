const tf = require('@tensorflow/tfjs-node')
const utils = require('./utils')

const IMAGE_H = 28
const IMAGE_W = 28
const NUM_CLASSES = 10

function createModel() {
  const model = tf.sequential()

  model.add(tf.layers.conv2d({
    inputShape: [28, 28, 1],
    kernelSize: 3,
    filters: 16,
    activation: 'relu'
  }))

  model.add(tf.layers.maxPooling2d({
    poolSize: 2,
    strides: 2
  }))

  model.add(tf.layers.conv2d({
    kernelSize: 3,
    filters: 32,
    activation: 'relu'
  }))

  model.add(tf.layers.maxPooling2d({
    poolSize: 2,
    strides: 2
  }))

  model.add(tf.layers.conv2d({
    kernelSize: 3,
    filters: 32,
    activation: 'relu'
  }))

  model.add(tf.layers.flatten({}))

  model.add(tf.layers.dense({
    units: 64,
    activation: 'relu'
  }))

  model.add(tf.layers.dense({
    units: 10,
    activation: 'softmax'
  }))

  return model
}

async function train(model, processedData) {
  console.log('Training model...')

  const optimizer = 'rmsprop';

  const validationSplit = 0.15

  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  })

  model.fitDataset((processedData), {
    // Only 5 epochs as this is simply a demontration
    epochs: 5,
  }).then(() => {
    // save the trained model in the model/ directory
    model.save("file://./model")
  })
}

async function start() {
  const trainData = tf.data.csv(
    'file://./data/train.csv', {
      hasHeader: false,
      columnNames: utils.CSVHeaders(),
      columnConfigs: {
        label: {
          isLabel: true
        }
      }
    }
  )

  const processedData = trainData.map(({
    xs,
    ys
  }) => {
    // Transform our input data into the required shape
    let x = tf.tensor(Object.values(xs), [IMAGE_H, IMAGE_W, 1])
    // Normalise out input data
    x = x.div(255)

    // One hot encode data
    let y = tf.oneHot((Object.values(ys)[0]), NUM_CLASSES)

    return {
      xs: x,
      ys: y
    };
  }).shuffle(1000).batch(300)

  let model = createModel()

  await train(model, processedData)
}

start()
