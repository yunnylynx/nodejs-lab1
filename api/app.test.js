const request = require('supertest');
const express = require('express');

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

describe('GET /', () => {
  it('responds with Hello World', done => {
    request(app)
      .get('/')
      .expect('Hello World', done);
  });
});
