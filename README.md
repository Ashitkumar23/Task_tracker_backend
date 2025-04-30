it is a backend server for a task tracking application made on express and mongoDb
this is configured for localhost

how to use:{
step 1: install node by npm, express and mongoose
(dependecies used : dotenv(for env file), cors(to whitelist url), cookie-parser(to pass token as cookies), bcrypt(for password hashing and comparing), and jsonwebtoken(for tokens))
step 2: copy the file structure from this repository
step 3: there are accesstoken and refresh token but refreshtoken are not in used but there is function availabe for generting both token 
step 4: change .env varible {
   env contains: access token and refresh token secert and expiry of both token and port and mongo_uri replace these with your own  (use you own)
}
step 5: if you are using on local host rember that in this frontend is on port 5173 and backend in on port 5000 you can confiqure it in App.js cors
step 6: if ypu want to host both you have to whitelist the frontend url in cors


