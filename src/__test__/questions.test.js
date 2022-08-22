import request from "supertest";
import app from "../index.js";

describe("Get Questions", function () {
  let questionId;

  const newQues = {
    title: "question",
    description: "What is question",
  };
  beforeAll(async function () {
    const newQuestion = await request(app).post("/questions").send(newQues);
    questionId = newQuestion.body._id;
  });

  afterAll(async function () {
    await request(app).delete(`/questions/${questionId}`);
  });

  it("should return questions", async () => {
    const response = await request(app).get("/questions").send({});
    expect(response.statusCode).toBe(200);
    // https://jestjs.io/docs/expect#expectarraycontainingarray
    expect(response.body).toEqual(expect.arrayContaining([]));
  });

  it("should return a single question", async () => {
    console.log(questionId);
    const response = await request(app)
      .get(`/questions/${questionId}`)
      .send({});

    // expect(response.status).toEqual(200)
    expect(response.body.title).toEqual("question");
    expect(response.body.id).toEqual(newQues._id);
  });

  it("should return error on a wrong id", async () => {
    const response = await request(app).get(`/questions/djfdfhdjf`).send({});

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ message: "Question not found" });
  });

  it("should update a specific question on a specific id", async () => {
    const response = await request(app).put(`/questions/${questionId}`).send({
      title: "boyles",
      description: "what is Boyle's law",
    });
    expect(response.status).toBe(201);
  });

  it("should return an error message with a worng id passed", async () => {
    const response = await request(app).put(`/questions/123id`).send({
      title: "boyles",
      description: "what is Boyle's law",
    });

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      msg: "Un known question",
    });
  });

  it("should delete a question", async () => {
    const response = await request(app)
      .delete(`/questions/${questionId}`)
      .send({});

    expect(response.status).toBe(204);
    expect(response.body).toStrictEqual({});
  });
});
