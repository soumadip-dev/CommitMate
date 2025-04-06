# CommitMate

🚧 _Project coming soon..._ 🚧

A developer networking platform designed to create valuable technical collaborations.

---

---

---

## Planned Features

- User Registration (Create an account)
- User Login
- Profile Management (View and Update your profile)
- Explore Feed Page
- Send Connection Requests
- View Your Matches
- View Sent Requests

## Tech Stack & Architecture

The platform will be built using a microservices architecture consisting of:

1. **Frontend** – React.js
2. **Backend** – Node.js, MongoDB

## LLD (Low-Level Design)

### DB Design

#### Collections

- **User**
- **ConnectionRequests**

### API Design

- POST   --> /signup  
- POST   --> /login  
- GET    --> /profile        (Get the profile data)  
- POST   --> /profile        (Update the profile data)  
- DELETE --> /profile        (Delete the profile data)  
- POST   --> /sendrequest    (Ignore / Interested)  
- POST   --> /reviewRequest  (Accept / Reject)  
- GET    --> /requests       (All the requests I received)  
- GET    --> /connections    (Profiles of all my connections)

---

---

---
