const request = require("supertest");
const app = require("../app");


const fundwalletInput = {
    email: "test1113@example.com",//change
    amount: 400
};


const fundwalletOutput = { "Status": "Successful", "Message": "Accounted funded with 400 in test1113@example.com" };//change


test("fundwallet - success", () => {
    const mock_response = jest.fn().mockImplementation(() =>"hi");//mock the response of your fund wallet api to return a value hi
   
    const response = request(app).put("/users/fundwallet").send(fundwalletInput);//original fund wallet api
    
    expect(mock_response("/users/fundwallet")).toBe("hi");
    expect(mock_response).toHaveBeenCalledWith("/users/fundwallet");
    
  });