import request from 'supertest'
import app from '../app'

describe("server route", ()=>{
  test('return the home page with a message', async ()=>{
    const res = await request(app).get('/');
    expect(res.status).toBe(200)
  })
})

describe('question routes', ()=>{
  const res =  await request(app).get('/questions');
  expect(res.status).toBe(200);
  expect(res.body[0].question).toequal('First Question')
})