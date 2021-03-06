const request = require("supertest");
const app = require("../app");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
var randomEmail = require('random-email');
const genUsername = require("unique-username-generator");


jest.setTimeout(30000)
const loginInput = {
    email: "test1113@example.com",//change
    password: "Password123"//change

};

const loginOutput = { "Message": `${loginInput.email} is logged in!` };

test("login - success", async () => {


    const response = await request(app).post("/users/login").send(loginInput);
    expect(response.body).toEqual(loginOutput);
    expect(response.statusCode).toEqual(200);
    
   
});
