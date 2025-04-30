Step 1: Install Node Modules
Ensure Node.js is installed on your system. Install the required dependencies by running npm install. The backend uses the following packages:

dotenv for managing environment variables

cors for whitelisting frontend URLs

cookie-parser for handling cookies (used for token storage)

bcrypt for password hashing and comparison

jsonwebtoken for generating and verifying access and refresh tokens

mongoose for connecting to MongoDB

Step 2: Set Up Project Structure
Clone this repository or copy the file structure into your local project.

Step 3: Token Handling
The backend supports both access tokens and refresh tokens for authentication. While only access tokens are actively used, the logic for generating both is already implemented and available for future use.

Step 4: Configure Environment Variables
Create a .env file in the root directory and add the following variables (replace the values with your own):

ini
Copy
Edit
PORT=5000  
MONGO_URI=your_mongodb_connection_string  
ACCESS_TOKEN_SECRET=your_access_token_secret  
REFRESH_TOKEN_SECRET=your_refresh_token_secret  
ACCESS_TOKEN_EXPIRY=15m  
REFRESH_TOKEN_EXPIRY=7d  
Step 5: Localhost Configuration
By default, the frontend runs on port 5173 and the backend on port 5000. Make sure your CORS settings reflect this in the Express setup so that both can communicate locally.

Step 6: Hosting the Application
If deploying the project, update the CORS configuration to whitelist the domain of your hosted frontend application.

