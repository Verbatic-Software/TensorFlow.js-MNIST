# TensorFlow.js - MNIST
## HTML

Before beginning, be sure to copy the model you have trained with Node.js into the `model/` directory here. Without this our AI will fail to load.

### Using our AI model

The following is a practial example of how we would use HTML and JavaScript to deliver our AI model to our customers. We use JavaScript to load our model via a HTTP request and then pass it data to process. We have included a way for you to draw images for the AI to classify.

### Loading the model

The model important peace of code here is the following:
```js
  tf.loadLayersModel('http://localhost:3000/model/model.json').then((_model) => {
    model = _model
  })
```

In these lines of code we are telling TensorFlow.js to load our model via HTTP, which will load the neural networks topology as well as the trained weights. After this our AI is ready to start classifying images.

### Running

In order to run this page you'll need to make use of an HTTP server. We recommend using the built in Python `http.server` module. Simply go to this directory in your command line and run the following command:
```bash
python3 -m http.server 3000
```

Visit `http://localhost:3000/` in your browser of choice and you are ready to go.
