const request = require("supertest");
const app = require("../app");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
var randomEmail = require('random-email');
const genUsername = require("unique-username-generator");

// jest.setTimeout(30000);

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

const fundwalletInput = {
    email: "test1113@example.com",//change
    amount: 400   
};

const withdrawInput = {
    email: "oihimekpen@gmail.com",//change
    amount: 400   
};

const transferfundInput = {
    toemail: "test1113@example.com",//change
    fromemail: "oihimekpen@gmail.com",//change
    amount: 200   
};
const loginInput = {
    email: "test1113@example.com",//change
    password: "Password123"//change
      
};

const loginOutput = {"Message":`${loginInput.email} is logged in!`};
const userOutput = { "Status": "Successful", "Message": `Account created ${userInput.username}` };
const fundwalletOutput = {"Status":"Successful","Message":"Accounted funded with 400 in test1113@example.com"};//change
const withdrawOutput = {"Status":"Successful","Message":"Withdrawl of 400 from oihimekpen@gmail.com Successful","Prompt":"Take your cash "};//change
const transferfundOutput = {"Status":"Successful","Message":" 200 transferred to test1113@example.com from oihimekpen@gmail.com "};//change

// let accessToken = '';

// beforeAll(async () => {
//   const response = await request(app).get('/users/authentication');
//   accessToken = response.header.accessToken;
// });

it("login - success", async () => {


    const { body } = await request(app).post("/users/login").send(loginInput).set('accesToken', `${accessToken}`);;
    expect(body).toEqual(loginOutput);
    // expect(body.statusCode).toEqual(200);
   
});

it("signup - success", async () => {

    const { body } = await request(app).post("/users/signup").send(userInput);
    expect(body).toEqual(userOutput);
    // expect(body.statusCode).toEqual(200);
   
});

it("fundwallet - success", async () => {
    
    const response = await request(app).put("/users/fundwallet").send(fundwalletInput);
    expect(response.body).toEqual(fundwalletOutput);    
    expect(response.statusCode).toEqual(200);
  });

it("withdraw - success", async () => {
    
    const response = await request(app).put("/users/withdraw").send(withdrawInput);
    expect(response.body).toEqual(withdrawOutput);    
    expect(response.statusCode).toEqual(200);
  });

it("transferfund - success", async () => {
    
    const response = await request(app).put("/users/transferfund").send(transferfundInput);
    expect(response.body).toEqual(transferfundOutput);    
    expect(response.statusCode).toEqual(200);
  });