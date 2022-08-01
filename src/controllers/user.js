import { v4 as uuidv4 } from "uuid";

let Users = [];

class controller {
  // Get all questions

  static registerUser = async (req, res) => {
    // const user = req.body.user;
    // console.log('Creating User')

    try {
      const createUser = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      Users.push(createUser);

      res.status(201).json(Users);
    } catch (err) {
      res.status(400).json({ msg: err });
    }
  };
}

export default controller;
