# CommitMate

🚧 **Project coming soon...** 🚧

CommitMate is a developer networking platform designed to foster valuable technical collaborations among developers. It provides users with the ability to connect with others, send and receive connection requests, and manage their profiles. 

---

## Planned Features

- **User Registration** – Create an account on the platform.
- **User Login** – Secure login functionality.
- **Profile Management** – View and update your personal profile.
- **Explore Feed Page** – Discover new developer profiles and potential connections.
- **Send Connection Requests** – Send connection requests to other users.
- **View Your Matches** – View profiles that you’ve connected with.
- **View Sent Requests** – Monitor the requests you’ve sent.

---

## Tech Stack & Architecture

CommitMate will be built using a microservices architecture consisting of:

- **Frontend**: React.js
- **Backend**: Node.js with MongoDB as the database

---

## Low-Level Design (LLD)

### Database Design

#### Collections

- **User** – Stores user-related data such as name, email, etc.
- **ConnectionRequests** – Tracks connection requests sent between users, their statuses, and actions.

### API Design

- **POST** `/signup` – Register a new user account.
- **POST** `/login` – Log in to an existing account.
- **POST** `/logout` – Log out from the current session.
- **GET** `/profile/view` – Retrieve the current user's profile data.
- **PATCH** `/profile/edit` – Update the current user's profile information.
- **PATCH** `/profile/resetpassword` – Reset the user's password.
- **DELETE** `/profile` – Delete the user's profile data.

- **POST** `/connectionrequests/send/like/:userId` – Send a "like" connection request to another user.
- **POST** `/connectionrequests/send/pass/:userId` – Send a "pass" (ignore) connection request to another user.

- **POST** `/connectionrequests/review/match/:requestId` – Accept a pending connection request.
- **POST** `/connectionrequests/review/reject/:requestId` – Reject a pending connection request.

- **GET** `/requests` – Retrieve all the connection requests received by the user.
- **GET** `/connections` – Get a list of all connections the user has made.

- **GET** `/feed` – View the profiles of other users on the platform.

---

