import { it } from 'node:test';
import request from 'supertest';
import app from '../index.js';

let server;
function startServer(){
  return new Promise((resolve) => {
    server = http.createServer(app);
    server.listen(3000, () => {
      resolve(server);
    });
  });
}

function stopServer(){
  return new Promise((resolve) => {
    server.close(() => {
      resolve(server);
    });
  });
}

describe('login & register functionalities', () => {

  beforeAll(async () => {
    await startServer();
  });

  afterAll(async () => {
    await stopServer();
  });

  it('should respond with a random banana fact', async () => {
    const res = await request(app).get('/bananaFact');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('fact');
  });
});