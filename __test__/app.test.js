import request from 'supertest'
import app from '../app'

describe("server route", ()=>{
  it('return the home page with a message', async ()=>{
    const res = await request(app).get('/');
    expect(res.status).toBe(200)
  })
})

describe('question routes', ()=>{
  it('get all questions', async ()=>{
    const res =  await request(app).get('/questions');
    expect(res.status).toBe(200);
    expect(res.body[0].question).toequal('Questions')
  })

  it('if the question doesnt exist', async ()=>{
    const res = await request(app).get('/questions/p');
    expect(res.status).toBe(400)

    expect(res.body.message).toequal('Question not found')
  })

  // it('Post a question', async ()=>{
  //   const res = await request(app).post('/question')
  //   .send({question: 'What is Question?'});
  //   expect(res.status).toBe(201)
  // })

  // it('Update a specific Question', async ())
})

