# TensorFlow.js - MNIST

This repo in an example of the code used by our [Labs](https://labs.verbatic.io/) demonstration titled [TensorFlow.js](https://labs.verbatic.io/tensorflow-js).

We make use of [TensforFlow.js](https://www.tensorflow.org/js) to train a model to classify the MNIST dataset. Users can then make use of this model by visiting an HTML page and loading the model, in their browser, using HTTP.

The codebase is split into two parts:
* We first train and test our model using [Node.js](./node)
* We then server our model using [HTML and JavaScript](./html)
