import request from "supertest";
import app from "../index.js";
import question from "../model/question.js";

describe("Testing the answer's EndPoint", function () {
  let answerId;
  let questionId;

  const answer = {
    title: "answer",
    description: "answer",
  };

  beforeEach(async function () {
    const newAns = await request(app)
      .post(`/questions/${questionId}/answers`)
      .send(answer);

    questionId = newAns.body.questionId;
    answerId = newAns.body._id;
  });

  it("should post an answer to a specific question", async () => {
    const res = await request(app)
      .post(`/questions/62f8f0d55fed9b04f8325a6a/answers`)
      .send({
        title: "answer",
        description: "answer",
      });

    let id = res.body.answer._id;
    let description = res.body.answer.description;
    let title = res.body.answer.title;
    expect(res.status).toBe(201);
    expect(res.body).toStrictEqual({
      message: "Successfully Created",
      answer: {
        __v: 0,
        _id: id,
        description: description,
        questionId: "62f8f0d55fed9b04f8325a6a",
        title: title,
      },
    });
  });

  it("should return an error message with a wrong question id passed", async () => {
    const res = await request(app).post(`/questions/invalidId/answers`).send({
      title: "answer",
      description: "answer",
    });

    expect(res.body).toStrictEqual({ err: "incorrect id/question not found" });
  });

  it("should return an answer when the question id is passed", async () => {
    const res = await request(app)
      .get(`/questions/6300db35cfa6fa7cdc242724/answers`)
      .send({});

    expect(res.status).toBe(200);
    expect(res.body.questionId).toEqual(questionId);
    expect(res.body._id).toStrictEqual(answerId);
  });

  // it("should not update answer with a wrong answer id", async ()=>{
  //   const res = await request(app).put(`/questions/6300db35cfa6fa7cdc242724/answers/asjjdjdkdjskfsk`).send({
  //     title: "second answer",
  //     description: "my second answer",
  //   })

  //   expect(res.status).toBe(400);
  //   expect(res.body.message).toStrictEqual("Answer not  found")
  // })
  // it("should not update answer with a wrong question id", async ()=>{
  //   const res = await request(app).put(`/questions/fdfjdfdjfjdfhjfdh/answers/6300fc178cbf67c44f42c8d4`).send({
  //     title: "second answer",
  //     description: "my second answer",
  //   })

  //   expect(res.status).toBe(400);
  //   expect(res.body.message).toStrictEqual("question not found")
  // })
});
