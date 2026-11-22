- npm init
- npm i cors dotenv express jsonwebtoken mongoose multer nodemon razorpay stripe validator @imagekit/nodejs bcrypt

cors -> we can allows frontend ip to backend.
dotenv -> we can use environment variables in our project.
express -> we can use API
jsonwebtoken -> We can anable user authentication and login our website.
mongoose -> manage our Database connectivity.
multer -> Accepts product images in memory before uploading them to ImageKit.
nodemon -> Re-start backend whenever any changes in the code.
razorpay, stripe -> set up online payment intailation.
validator -> We will check data is valid or not from coming user.
@imagekit/nodejs -> Uploads product images to ImageKit.
bcrypt -> Encrypt the user data, password and stores in ypur database.






--------------------------------------------------------------------------------------------------------------------------------------
config -> Store all this configuration.





--------------------------------------------------------------------------------------------------------------------------------------------
models -> Stores all your mongoose in this schema.
Schema -> Schema is a structure using that we can create the data in the database.
required : true -> It means data is magnatory store in the database.
unique : true -> one account create in one email.
{minimize : false} -> when we use cardData give empty object. mongoDb can't display when no card data.

--------------------------------------------------------------------------------------------------------------------------------------------
controllers -> manages all the login in our backend.
validator -> check email and password correct or not.



---------------------------------------------------------------------------------------------------------------------------------
middleware -> Stores all the backend middleware.







----------------------------------------------------------------------------------------------------------------------------------------------
routes -> manages the express server routes.



----------------------------------------------------------------------------------------------------------------------------------------------




- Create a file server.js
- add "scripts" : {"dev" : "nodemon server.js"} in package.json file.          npm run dev -> for running server
- "type": "module" in package.json file.
- Create .env file ( stores secret keys and API keys)
- install Thunder client extension to check API  but we use postman that works same
- Run application write code server.js file and run in postman, browser
- Create mongoDB.js file in config. 
- Create database in mongoDB compass.
- DB_URL store in .env file.
- connect with mongoDB.
- Set IMAGEKIT_PRIVATE_KEY in .env using the private key from your ImageKit dashboard.
