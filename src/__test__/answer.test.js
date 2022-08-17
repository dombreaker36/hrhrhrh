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
    const newAns = await request(app).post(`/questions/${questionId}/answers`).send(answer);

    questionId = newAns.body.questionId;
    answerId = newAns.body._id;
  });

  it("should post an answer to a specific question", async () => {
    const res = await request(app).post(`/questions/62f8f0d55fed9b04f8325a6a/answers`).send({
        title: "answer",
        description: "answer",
      });
    expect(res.status).toBe(201);
    expect(res.body).toStrictEqual({ message: "Successfully Created" });
  });

  it("should return an error message with a wrong question id passed", async () => {
    const res = await request(app).post(`/questions/invalidId/answers`).send({
      title: "answer",
      description: "answer",
    });

    expect(res.body).toStrictEqual({err: "incorrect id/question not found"});
  });
  it("should return an answer when the question id is passed", async () => {
    const res = await request(app)
      .get(`/questions/${questionId}/answers`)
      .send({});

    expect(res.status).toBe(200);
    expect(res.body.questionId).toEqual(questionId);
    expect(res.body._id).toStrictEqual(answerId);
  });
});
