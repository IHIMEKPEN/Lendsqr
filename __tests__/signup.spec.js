const request = require("supertest");
const app = require("../app");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
var randomEmail = require('random-email');
const genUsername = require("unique-username-generator");
// const auth = require("../routers/users");
// console.log(auth)
var auth = require("../auth").auth;
// var sinon = require('sinon');
const jwt = require("jsonwebtoken");//import d module to mocked in the test file
// const jwksClient = require("jwks-rsa");

// const client = jwksClient({
//     accessToken: "https://MYAUTH0APP.auth0.com/.well-known/jwks.json",
//   });

// jest.mock('jsonwebtoken');//mock the module
// jest.mock('supertest');//mock the module
// jest.mock('../app');//mock the module



// add three random digits
const usernamee = genUsername.generateFromEmail(
    "lakshmi.narayan@example.com",
    3
);

const userInput = {
    email: randomEmail(),//change
    fullname: "Jane Doe",
    username: usernamee,
    password: "Password123",
    password2: "Password123"
};

// const fundwalletInput = {
//     email: "test1113@example.com",//change
//     amount: 400
// };

// const withdrawInput = {
//     email: "oihimekpen@gmail.com",//change
//     amount: 400
// };

// const transferfundInput = {
//     toemail: "test1113@example.com",//change
//     fromemail: "oihimekpen@gmail.com",//change
//     amount: 200
// };
const loginInput = {
    email: "test1113@example.com",//change
    password: "Password123"//change

};

// const loginOutput = { "Message": `${loginInput.email} is logged in!` };
const userOutput = { "Status": "Successful", "Message": `Account created ${userInput.username}` };
// const fundwalletOutput = { "Status": "Successful", "Message": "Accounted funded with 400 in test1113@example.com" };//change
// const withdrawOutput = { "Status": "Successful", "Message": "Withdrawl of 400 from oihimekpen@gmail.com Successful", "Prompt": "Take your cash " };//change
// const transferfundOutput = { "Status": "Successful", "Message": " 200 transferred to test1113@example.com from oihimekpen@gmail.com " };//change

// const gentoken = jwt.sign(loginInput.email, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15h" });
// const mocked_respo_generated_token = jwt.sign.mockResolvedValue({ accessToken: "qwerty" });

// it("login - success", async () => {




//     const { body } = await (await supertest(app).post("/users/login").send(loginInput))

//     expect(body).toEqual(loginOutput);
//     // expect(body.statusCode).toEqual(200);

// });
describe('signup Endpoint', () => {

    test("signup - success", async () => {

        const response = await request(app).post("/users/signup").send(userInput);
        expect(response.body).toEqual(userOutput);
        expect(response.statusCode).toEqual(200);


    });
    
    test("signup - failure", async () => {

        const response = await request(app).post("/users/signup").send(userInput);
        expect(response.body).toEqual({ "message": "user already exist in database" });
        // expect(response.statusCode).toEqual(404);


    });

});



// it("withdraw - success", async () => {

//     const response = await request(app).put("/users/withdraw").send(withdrawInput);
//     expect(response.body).toEqual(withdrawOutput);
//     expect(response.statusCode).toEqual(200);
// });

// it("transferfund - success", async () => {

//     const response = await request(app).put("/users/transferfund").send(transferfundInput);
//     expect(response.body).toEqual(transferfundOutput);
//     expect(response.statusCode).toEqual(200);
// });