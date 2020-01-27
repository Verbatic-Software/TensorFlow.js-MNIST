const tf = require('@tensorflow/tfjs-node')
const utils = require('./utils')

const IMAGE_H = 28
const IMAGE_W = 28
const TEST_SIZE = 10000

async function start() {
  const model = await tf.loadLayersModel('file://./model/model.json');

  const testData = tf.data.csv(
    'file://./data/test.csv', {
      hasHeader: false,
      columnNames: utils.CSVHeaders(),
      columnConfigs: {
        label: {
          isLabel: true
        }
      }
    }
  )

  const processedData = testData.map(({
    xs,
    ys
  }) => {
    // Transform our input data into the required shape
    let x = tf.tensor(Object.values(xs), [IMAGE_H, IMAGE_W, 1])
    // Normalise out input data
    x = x.div(255)

    // No need to do anything here as we will transform our model output
    let y = Object.values(ys)[0]

    return {
      xs: x,
      ys: y
    }
  })

  let correct = 0;
  await processedData.forEachAsync((d) => {
    let input = d.xs
    let target = d.ys
    const res = model.predict(input.reshape([1, 28, 28, 1]))
    const {indices} = tf.topk(res)
    if (indices.dataSync() == target) {
      ++correct
    }
  }).then(() => {
    console.log("Testing completed")

    let acc = correct / TEST_SIZE * 100
    acc = Math.round(acc * 100) / 100
    console.log(`Our model scored an accuracy of ${acc}%`)
  })
}

start()
