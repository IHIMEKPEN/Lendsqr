# Lendsqr Backend Engineer role Application test

it's a simple API that does the following

• Create an account for a new User

• The User can fund their account

• The User can transfer funds to another User's account

• The User can withdraw funds from their account .

• The User  can login his/her account .

# Built with

• NodeJS (LTS version)

• MySQL 

• Javascript


# Authors

Ihimekpen Osemudiamen Andrew

# Quickstart

1. Clone this repo
2. setup your virtual environment
3. Run "npm install"
4. Download postman for testing API
6. Run "npm start"
7. move to postman use https://lendsqrproject.herokuapp.com/users/signup to access signup make sure its a 'POST' request and move to body then x-www-form-urlencoded

<img width="1280" alt="Screen Shot 2022-03-13 at 13 33 56" src="https://user-images.githubusercontent.com/75396799/158059533-a528ccee-060a-4fa3-a485-583236647b9e.png">

  
9. to access login https://lendsqrproject.herokuapp.com/users/login make sure its a 'POST' request but note an access token is generated in the header to grab it cause you will need it to transfer funds,withdraw funds and add fund to the wallet.

<img width="1280" alt="Screen Shot 2022-03-13 at 13 38 36" src="https://user-images.githubusercontent.com/75396799/158059706-29f9bdb7-0b26-433c-a435-6c7bb8c14b1c.png">

11. to access fund wallet https://lendsqrproject.herokuapp.com/users/fundwallet make sure its a 'PUT' request and move to the header and add the access token you grabbed earlier and input it there. note your key for the token is case sensitive to it should be "accessToken".

<img width="1280" alt="Screen Shot 2022-03-13 at 13 41 32" src="https://user-images.githubusercontent.com/75396799/158059818-e4c493b8-e3ec-4338-89ac-11d681633444.png">

<img width="1280" alt="Screen Shot 2022-03-13 at 13 41 39" src="https://user-images.githubusercontent.com/75396799/158059874-558596a5-ba40-4488-b758-6c28b335ce05.png">

12. to access transfer fund wallet https://lendsqrproject.herokuapp.com/users/transferfund make sure its a 'PUT' request and move to the header and add the access token  again you grabbed earlier and input it there. note your key for the token is case sensitive to it should be "accessToken".This token expires after 15hrs and can be adjusted if you like.<img width="1280" alt="Screen Shot 2022-03-13 at 13 47 12" src="https://user-images.githubusercontent.com/75396799/158060033-7aec485a-f3b6-4cfe-88a1-7408209602ae.png">

13. to access withdraw fund wallet https://lendsqrproject.herokuapp.com/users/withdraw make sure its a 'PUT' request and move to the header and add the access token  again you grabbed earlier and input it there. note your key for the token is case sensitive to it should be "accessToken".This token expires after 15hrs and can be adjusted if you like.<img width="1280" alt="Screen Shot 2022-03-13 at 13 49 09" src="https://user-images.githubusercontent.com/75396799/158060105-731c3b11-7ece-4534-8bf6-c31da4dd32c8.png">


# Deployed to heroku

https://lendsqrproject.herokuapp.com/

# Notes

• Account balances can read negative if there isn't money in the account 

• Before running test go to server.js and comment the production and uncomment the development code to avoid failure due to timeout during testing

