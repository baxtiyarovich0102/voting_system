🗳️ Voting System
A simple backend system that allows users to vote in polls. This project is built with NestJS, PostgreSQL, and TypeORM. It includes basic authentication, poll creation, and vote submission features.

🚀 Features
✅ User registration and login (JWT based)

✅ Role-based access (Admin, User)

✅ Create and manage polls (Admin only)

✅ Vote for poll options (User)

✅ Prevent multiple votes from same user

✅ Store votes securely in PostgreSQL

✅ Modular and clean code structure using NestJS

🛠 Tech Stack
Backend Framework: NestJS

Database: PostgreSQL

ORM: TypeORM

Authentication: JWT (Passport)

Language: TypeScript

📦 Installation
bash
Копировать
Редактировать
git clone https://github.com/baxtiyarovich0102/voting_system.git
cd voting_system
npm install
⚙️ Running the App
Configure your .env file (see .env.example if available)

Run the app in development mode:

bash
Копировать
Редактировать
npm run start:dev
📄 API Overview
POST /auth/signup – Register new user

POST /auth/login – Login and get token

POST /polls – Create a new poll (admin only)

GET /polls – Get all polls

POST /votes/:pollId – Submit a vote

👤 Roles
Admin: Can create polls and view all votes

User: Can vote once per poll

🔐 Authentication
All protected routes require JWT token in the Authorization header:

makefile
Копировать
Редактировать
Authorization: Bearer <your_token>
📌 Future Improvements
 Frontend with React

 Real-time vote count (WebSocket)

 Poll expiration and results view

🤝 Contributing
Pull requests and suggestions are welcome! For major changes, please open an issue first to discuss what you would like to change.
