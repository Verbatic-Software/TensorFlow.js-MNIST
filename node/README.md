# TensorFlow.js - MNIST
## Node.js

Before you begin, download the library dependencies using your package manager of choice (npm, yarn, etc.). You will also need to download the data and place it into the `data/` directory. The data can be found in the first release of this repo.

## Why Node.js?

We train our model using Node.js (as oppose to using the JavaScript in our browsers) as this provides a massive performance increase. Using Node.js gives TensorFlow.js access to C++ bindings which greatly improve the speed at which it runs.

## The Saved Model

Our model is saved in the `model` directory and is made up of two files, `model.json` and `weights.bin`. In order to load our model later, both these files must be present in the same directory.
