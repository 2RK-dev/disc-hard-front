# 💬 DiscHard — A Discord-Inspired Chat App Built with Next.js

DiscHard is a real-time messaging application inspired by Discord. It aims to provide a smooth, fast, and modern communication experience for friends and communities. Built with **Next.js**, this project explores best practices in frontend performance, design systems, and scalable architecture.

---

## Table of Contents

- [Prerequisites](#-prerequisites)
- [Technologies Used](#-technologies-used)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Future Ideas](#-future-ideas)
- [Environment Configuration](#%EF%B8%8F-environment-configuration)
- [Contribution](#-contribution)
- [License](#-license)

---

## Prerequisites

Before starting, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Yarn](https://yarnpkg.com/) or npm
- [Git](https://git-scm.com/)

**To start the project:**

Using Yarn:

```bash
git clone https://github.com/2RK-dev/disc-hard-front.git
cd dischard
yarn install
yarn dev
```

Using npm:

```bash
git clone https://github.com/2RK-dev/disc-hard-front.git
cd dischard
npm install
npm run dev
```

**If you have Docker installed:**

```bash
docker-compose up --build
```

This will set up the entire development environment inside containers.

**Windows/Mac Tips:**

- Make sure your `.env.local` file is created and correctly configured, see [Environment Configuration](#%EF%B8%8F-environment-configuration) .
- On Windows, use **Git Bash** or **WSL** to run bash commands.
- On Mac, everything should work out of the box with Terminal.

**Development vs Production:**

- For development: `yarn dev` or `npm run dev`
- For production:

```bash
yarn build && yarn start
# or
npm run build && npm start
```

---

## Technologies Used

- **Next.js** — Modern React framework for SSR/SSG
- **Tailwind CSS** — Fast and responsive styling
- **TypeScript** — Static typing for safety and clarity
- **Socket.IO / Ably / Pusher** _(under discussion)_ — For real-time communication
- **NextAuth.js** — Secure authentication system

---

## Features

Here's a list of planned and current features:

- Authentication (OAuth2, Email/Password) (in development)
- Server (guild) and channel system (in development)
- Real-time text messaging (in development)
- File and image uploads (in development)
- Live notifications (in development)
- Member management (roles, permissions) (in development and need discution)
- Dark mode (in development)
- Mobile and desktop responsive design (maybe😂)

---

## Project Structure

The current and planned project structure, with detailed explanations:

```
/dischard
├── /app                      # app directory (Next.js 13+)
│   ├── /login                # Login page
│   ├── /register             # Registration page
│   ├── /direct-message       # private chat page
│   ├── /servers              # server chat page
│   └── page.tsx              # landing page
│
├── /components               # Reusable UI components
│   ├── /ui                   # Buttons, modals, inputs, etc.
│   └── other                 # OtherComponent (in development)
│
├── /lib                # Utility files, config, helpers
│   ├── auth.ts         # NextAuth-related functions
│   └── socket.ts       # Websocket handlers
│
├── /public             # Static files (icons, images, logos)
│
├── /types              # Global TypeScript types (zod schema)
│
├── /services           # API services or external services (in development)
│
├── .env.local          # Environment variables
├── next.config.js      # Next.js configuration
├── tailwind.config.ts  # Tailwind configuration
└── tsconfig.json       # TypeScript configuration
```

each folder in `/app` contains a `page.tsx` file that serves as the entry point for that route.
example: `/app/login/page.tsx` is the login page, and `/app/register/page.tsx` is the registration page.
and the route will be `/new-page` (e.g., `/app/new-page/page.tsx` will be accessible at `/new-page`).

for each folder in app, you have the components used in that page, for example, in the `/servers` folder you have `server-sidebar.tsx` .

---

## Future Ideas

- Audio/video call integration via WebRTC
- Unit testing with Jest + React Testing Library
- Mobile app using React Native
- Server usage statistics
- Server boost and subscription system (if we want money 😗)
- Message threads and reactions
- End-to-end message encryption
- Mentions & custom emojis (maybe)

---

---

## Environment Configuration

You will need a `.env.local` file at the root of your project. For now, it's empty by default, but it should at least include the following variables:

```env
# Backend URL
API_BASE_URL=your-api-url

# Whether to mock the API or to actually hit the backend, useful to test the frontend in isolation
NEXT_PUBLIC_USE_MOCKS=false

# OAuth client (e.g., GitHub, Google)
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret

# NextAuth secret key
NEXTAUTH_SECRET=your-super-secret-key

# Optional: Set the port
PORT=3000
```

To change the default port, set the `PORT` variable in `.env.local`. For example, to run on port 4000:

```env
PORT=4000
```

Then run:

```bash
yarn dev
# or
npm run dev
```

---

## Contribution

Contributions are welcome!  
Feel free to open an issue, suggest a feature or submit a pull request. Please write clean, typed, and well-documented code.

```bash
# Create a branch
git checkout -b feature/my-feature

# Commit with a clear message
git commit -m "feat: add real-time messaging feature"

# Push your branch
git push origin feature/my-feature
```

---

## License

This project is licensed under the MIT License.  
Feel free to clone, modify, or reuse it for personal or academic purposes.

---

> Built with ❤️ by 2RK-dev
