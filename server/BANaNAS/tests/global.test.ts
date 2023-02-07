import request from 'supertest';
import app from '../dist/SERVER_BANaNAS';

describe('banana private api test', () => {
  it('should respond with a random banana fact', async () => {
    const res = await request(app).get('/bananaFact');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('fact');
  });

  it('should get the number of bananas eaten', async () => {
    const res = await request(app).get('/bananas');
    expect(res.status).toBe(200);
    const { total } = res.body;
    expect(total).toBeGreaterThanOrEqual(0);
  });
});

describe('random calls to outside API', () => {
  it('should return all the metrics for one category', async () => {
    const res = await request(app).get('/api/Agriculture');
    expect(res.status).toBe(200);
    const { description, parameters_needed, available_countries } = res.body.AgriculturalIrrigatedLand;
    expect(description).toBeDefined();
    expect(parameters_needed).toBeDefined();
    expect(available_countries).toBeDefined();
    
  });
  it('should return the description for a selected metric', async () => {
    const res = await request(app).get('/api/Agriculture/ForestArea');
    expect(res.status).toBe(200);
    const { description } = res.body;
    expect(description).toBeDefined();
  });
  it('should correctly call an endpoint and get the data', async () => {
    const res = await request(app).get('/api/Agriculture/ForestArea/Italy/2010/2015');
    expect(res.status).toBe(200);
    console.log(res.body);
    expect(res.body['2014']).toBeDefined();
  });
});