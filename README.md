
**Estio Staking App**

Estio Staking is a cryptocurrency staking application that allows users to stake their crypto assets and earn rewards. This repository contains the codebase for the Estio Staking App, built using Flutter for the frontend and Node.js (Express.js) for the backend, with MongoDB as the database.

**Features**

User Registration and Authentication
Crypto Asset Staking
Reward Earnings and Tracking
Dashboard with Staking Analytics
Secure Transactions

**Prerequisites**

Before you begin, ensure you have met the following requirements:

Flutter: Install Flutter
Node.js: Install Node.js
MongoDB: Install MongoDB
Getting Started
Follow these steps to get the Estio Staking App up and running on your local machine:

**Clone this repository:**

bash
Copy code
git clone https://github.com/Chandran98/estio_staking.git
Navigate to the frontend directory and install Flutter dependencies:
bash
Copy code
cd estio_staking/frontend
flutter pub get
Launch the Flutter app:
bash
Copy code
flutter run
Navigate to the backend directory and install Node.js dependencies:
bash
Copy code
cd ../backend
npm install
Set up your MongoDB connection:

Create a .env file in the backend directory.
Add your MongoDB connection URI as MONGODB_URI=<your-mongodb-uri>.
Start the backend server:

bash
Copy code
npm start
Folder Structure
css
Copy code

estio_staking/
├── frontend/
│   ├── lib/
│   │   ├── screens/
│   │   ├── widgets/
│   │   ├── main.dart
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── server.js
├── .gitignore
├── README.md

**Contributing**

If you want to contribute Estio Staking App! To contribute, follow these steps:

Fork the repository.
Create a new branch: git checkout -b feature/new-feature.
Make your changes and commit them: git commit -m 'Add new feature'.
Push to the branch: git push origin feature/new feature.
Create a pull request explaining your changes.
License
This project is licensed under the MIT License.
