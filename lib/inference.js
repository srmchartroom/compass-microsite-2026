const { inference } = require('@inferencesh/sdk');

const client = inference({
  apiKey: process.env.INFERENCE_API_KEY
});

module.exports = client;
