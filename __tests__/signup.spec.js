const request = require("supertest");
const app = require("../app");

const userOutput = {
  Status: "Successful",
  Message: "Account created femo",
};

const userInput = {
  "email": "test1@example.com",
  "fullname": "Jane Doe",
  "username": "Janny",
  "password": "Password123",
  "password2": "Password123"
};



  describe("POST /signup", () => {
    test("It responds with the newly created user", async () => {
      const user = await request(app)
        .post("/users/signup")
        .send(userInput);
  
      // make sure we add it correctly
      expect(user.body).toHaveProperty("Status");
      expect(user.body.fullname).toBe("Jane Doe");
      expect(user.statusCode).toBe(200);
  
      // make sure we have 3 students now
      const response = await request(app).get("/users/signup");
      expect(response.body.length).toBe(2);
    });
  });

