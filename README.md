<h1 align="center">
  <br>
  🚀 CommitMate
  <br>
</h1>

<div align="center">
  <a href="https://github.com/soumadip-dev">
    <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,react,github" alt="Tech Stack" width="170" style="padding: 15px 0;">
  </a>
</div>

<h3 align="center">
  CommitMate is a developer networking platform designed to foster valuable technical collaborations.
  Connect with like-minded developers, manage your profile, and build meaningful professional relationships.
</h3>

---

## 🌟 Features (Planned)

- 🔐 **User Authentication** – Secure registration and login functionality.
- 👤 **Profile Management** – Create and update detailed user profiles.
- 🌐 **Explore Feed** – Browse developer profiles across the platform.
- 🤝 **Connection Requests** – Like or pass on other developers to grow your network.
- 📬 **Sent Requests Tracking** – View and manage the connection requests you've initiated.
- 🧩 **Matches Overview** – See developers who have matched and connected with you.

---

## 🛠 Tech Stack & Architecture

CommitMate follows a **microservices architecture**:

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint       | Description            |
| ------ | -------------- | ---------------------- |
| POST   | `/auth/signup` | Register a new user    |
| POST   | `/auth/login`  | Log in to an account   |
| POST   | `/auth/logout` | Log out of the session |

---

### 👤 Profile Management

| Method | Endpoint                 | Description                 |
| ------ | ------------------------ | --------------------------- |
| GET    | `/profile/view`          | View current user's profile |
| PATCH  | `/profile/edit`          | Edit profile information    |
| PATCH  | `/profile/resetpassword` | Reset account password      |
| DELETE | `/profile`               | Delete user profile         |

---

### 🤝 Connection Requests

| Method | Endpoint                               | Description                    |
| ------ | -------------------------------------- | ------------------------------ |
| POST   | `/connection/send/like/:userId`        | Send a "like" request          |
| POST   | `/connection/send/pass/:userId`        | Send a "pass" (ignore) request |
| POST   | `/connection/review/match/:requestId`  | Accept a connection request    |
| POST   | `/connection/review/reject/:requestId` | Reject a connection request    |

---

### 👥 User Networking

| Method | Endpoint            | Description                       |
| ------ | ------------------- | --------------------------------- |
| GET    | `/user/requests`    | View received connection requests |
| GET    | `/user/connections` | View established connections      |
| GET    | `/user/feed`        | Discover new developers           |

---
