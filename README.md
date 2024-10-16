# IShopY
### IShopY is a full-stack e-commerce application built to offer a smooth online shopping experience. It provides features like user authentication (with OTP verification), a dynamic product catalog, shopping cart management, order history, and admin panel access for better management of products and orders. The project uses modern web development tools and frameworks to ensure a scalable, secure, and user-friendly platform.



## Table of Contents
- Features
- Tech Stack
- Installation
- Environment Variables
- Usage
- API Endpoints
- Screenshots
- Contributing

## Features
- **User Registration and Login**: Users can register and log in using their email and password. They receive a One-Time Password (OTP) for email verification to complete their registration.

- **JWT Authentication**: The application uses JSON Web Tokens (JWT) for secure authentication and session management.

- **OTP Verification**: Email OTP system ensures that only verified users can access their accounts and make purchases.

- **Shopping Cart Management**: Users can add products to their shopping cart, update quantities, and manage their cart items.

- **Order Management**: Users can view their order history, track their orders, and re-order products.

- **Admin Access**: Admin users can log in separately to manage product listings and view customer orders. They can add, edit, and delete products.

- **Email Notifications**: Users receive email notifications for account verification, order confirmations, and other important updates.

## Tech Stack
### Frontend:
>React.js: For creating a dynamic and responsive user interface.

>HTML5/CSS3: For structuring and styling the web pages.

>Bootstrap: Used for layout and styling components.

### Backend:
>Node.js & Express.js: For building the server-side logic and handling API requests.

>MongoDB (Mongoose): NoSQL database for storing user information, products, orders, etc.

>Bcrypt.js: For secure password hashing.

>JWT (JSON Web Token): For user authentication and session management.

>Nodemailer: For sending OTP and notification emails.

### Other Tools:
>Postman: For API testing.

>Git & GitHub: For version control and collaboration.

## Installation
### Prerequisites
**Ensure you have the following installed on your system:**
- Node.js (v14+)
- MongoDB (local or cloud instance)
- Git
- visual studio or any code editor
  
### Steps
**Clone the repository:**

```
git clone https://github.com/inbantamizhselvan/ishopy.git
```

**Navigate to the project directory:**
```
cd frontend //for the frontend (change the directory to frontend if you want to run the frontend)
cd backend //for the backend (change the directory to backend if you want to run the backend)
cd admin //for the admin (change the directory to admin if you want to run the admin)
```

**Install the dependencies:**

```
npm install
```

**Create the .env file and add the required environment variables (see below for details).**
Run the application in development mode:

```
npm run server //to start the backend server
```

>Open your browser and go to http://localhost:3000 to view the app.

## Environment Variables
>[!NOTE]
>Create a .env file in the root of your project and add the following environment variables:

```
# MongoDB Connection
MONGO_URI = <Your MongoDB URI>

# JWT Secret
JWT_SECRET = <Your JWT Secret>

# Email Configuration for OTP
EMAIL_HOST = <Your Email Host>
EMAIL_PORT = <Your Email Port>
EMAIL_USER = <Your Email User>
EMAIL_PASS = <Your Email Password>

# Admin Credentials
ADMIN_EMAIL = <Your Admin Email>
ADMIN_PASSWORD = <Your Admin Password>

# Other Configurations
PORT = 3000
Make sure to replace the placeholder values with your own.
```

## Usage
### User Registration and Login:
- **Sign Up**: Users need to enter their email, name, and password. After submitting, an OTP will be sent to their email for verification.
- **Login**: Users can log in using their email and password. If not verified, they will be prompted to verify their email first.
- **Admin Access**: Admins can log in using the credentials defined in the .env file to access the admin panel for managing the store's products and orders.

## API Endpoints
### User Routes
**POST /api/auth/register**: Register a new user.

**POST /api/auth/login**: Login with email and password.

**POST /api/auth/verify**: Verify user with the OTP sent to their email.

### Admin Routes
**POST /api/admin/login**: Admin login.

**POST /api/admin/add-product**: Add a new product (admin only).

**GET /api/admin/orders**: View all customer orders (admin only).

### Order Routes
**POST /api/orders/create**: Create a new order for a user.

**GET /api/orders/user-orders**: Get a user's order history.

### Chat Routes
**POST /api/chat/send**: Send a chat message.

**GET /api/chat/get**: Retrieve chat history for a user.


>(Only some of the essential API endpoint have been mentioned other will be there on backend/Routes)

## Screenshots
### Home Page:
![image](https://github.com/user-attachments/assets/4a4f6266-b2e9-4675-aa8b-f92504c670e2)


### Product Page:
![image](https://github.com/user-attachments/assets/42175f38-ee06-4d3b-8780-63656397156a)



### Admin Dashboard:
![image](https://github.com/user-attachments/assets/fd0392e3-fdee-4a62-88b4-a1b669a3f0c7)

### Login using QR:
The users can login their devices without any password by just scanning the QR on the profile from the logged device.
![image](https://github.com/user-attachments/assets/dbc54b14-d097-49f5-bb46-d4444f869e44)

In the other device which needs to be logged in just press the scan QR button to scan the QR , thats it all set you will be logged in now!
![image](https://github.com/user-attachments/assets/787af3f6-c90e-4bb8-b081-d038bb8f06a4)


## Contributing:
### We welcome contributions to improve IShopY. If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request.
5. Please ensure your code follows best practices and includes tests.

*Also, checkout my other repositories too.*
