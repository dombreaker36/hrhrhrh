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

  // afterAll(async function () {
  //   await request(app).delete(`/questions/${questionId}`);
  // });

  it("should return questions", async () => {
    const response = await request(app).get("/questions").send({});
    expect(response.statusCode).toBe(200);
    // https://jestjs.io/docs/expect#expectarraycontainingarray
    expect(response.body).toEqual(expect.arrayContaining([]));
  });

  it("should return a single question", async () => {
    console.log(questionId);
    const response = await request(app).get(`/questions/6300db35cfa6fa7cdc242724`).send({});

    expect(response.status).toEqual(200)
    expect(response.body.title).toEqual("boe's law");
  });

  it("should return error on a wrong id", async () => {
    const response = await request(app).get(`/questions/djfdfhdjf`).send({});

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ message: "Question not found" });
  });

  it("should update a specific question on a specific id", async () => {
    const login = await request(app).post("/auth/signin").send({
      email: "donlike@gmail.com",
      password: "$2b$10$MyoIxjTpZ/JNzKnPqt0xrujAetjyQHFNDAYnhK8jdlZD8l3UTritm"
    })
    const token = login.body.token

    const response = await request(app).put(`/questions/6300db35cfa6fa7cdc242724`).set('Authorization', token).send({
      title: "boyles",
      description: "what is Boyle's law",
    });
    expect(response.status).toBe(201);
  });

  it("should return an error message with a wrong id passed", async () => {
    const login = await request(app).post("/auth/signin").send({
      email: "donlike@gmail.com",
      password: "$2b$10$MyoIxjTpZ/JNzKnPqt0xrujAetjyQHFNDAYnhK8jdlZD8l3UTritm"
    })
    const token = login.body.token

    const response = await request(app).put(`/questions/123id`).set("Authorization", token).send({
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
      .delete(`/questions/6300db35cfa6fa7cdc242724`)
      .send({});

    expect(response.status).toBe(204);
    expect(response.body).toStrictEqual({});
  });
});
