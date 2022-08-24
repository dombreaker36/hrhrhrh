import request from "supertest";
import app from "../index.js";

describe("Testing the user's End Point", function () {
  let userId;
  let token;
  const user = {
    name: "Macson",
    username: "maclenic",
    email: "maclenic@gmail.com",
    password: "clenic23223434",
  };

  beforeAll(async () => {
    const newUser = await request(app).post(`/auth/signup`).send(user);

    userId = newUser.body._id;
    token = newUser.body.token;
  });

  it("should not register/signup a user but return an error message", async () => {
    const res = await request(app).post("/auth/signup").send({
      name: "Macson",
      username: "maclenic",
      email: "maclenic@gmail.com",
      password: "clenic23223434",
    });

    expect(res.status).toBe(409);
    expect(res.body).toEqual({ message: "Email already exists" });
  });

  it("should signin a user", async () => {
    const res = await request(app).post("/auth/signin").send({
      email: "maclenic@gmail.com",
      password: "12394394393",
    });
    const token = res.body.token;
    const userId = res.body.user._id;
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      token: token,
      user: {
        _id: userId,
        email: "maclenic@gmail.com",
        username: "maclenic",
      },
    });
  });

  it("should return an error when the user doesn't exist in the database", async () => {
    const res = await request(app).post("/auth/signin").send({
      email: "test@gmail.com",
      password: "euqweuqrueqru",
    });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      Error: "Email doesnot Exist",
    });
  });

  it("should signOut a user", async () => {
    const res = await request(app).get("/auth/signout").send({});

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      message: "User has signed out!",
    });
  });
});
