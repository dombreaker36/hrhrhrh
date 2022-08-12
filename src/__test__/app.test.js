import request from "supertest";
import app from "../index.js";
import Questions from '../model/question'

describe("Get Questions", ()=>{
  const newQues = {
    id: "62e95a30ba5f9a24568f0758",
    title: "question",
    description:"What is question"
  }

  beforeAll(async ()=>{
    await request(app).post('/questions').send(newQues)
  })

  afterAll(async ()=>{
    await request(app).delete(`/questions/${newQues.id}`)
  })


  it("should return questions", async ()=>{
    const response = await request(app).get("/questions");
    expect(response.statusCode).toBe(200);
    // https://jestjs.io/docs/expect#expectarraycontainingarray
    expect(response.body).toEqual(expect.arrayContaining([{
        __v: 0, 
        _id: "62e9733cfea51c1fd42d7175",
       description: "question",
        title: "question"}
    ]));
  })


  it("should return a single question", async ()=>{
    const response = await request(app).get(`/questions/62e9733cfea51c1fd42d7175`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      __v: 0, 
      _id: "62e9733cfea51c1fd42d7175",
     description: "question",
      title: "question"});
  })
  // it("should update question if it exists", async ()=>{
  //   const response =  await (await request(app).patch(`/questions/${newQues.id}`)).toStrictEqual({
  //     title: "code",
  //     description: "I hate tests but love them"
  //   })

  //   expect(response.statusCode).toBe(201)
  // })
  it('Should delete a question', async ()=>{
    const response = await request(app).delete(`/questions/${newQues.id}`)
    expect(response.status).toStrictEqual(204)
})
})