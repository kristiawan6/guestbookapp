# Guestbook App

![Guestbook App](public/logo.svg)

A modern, full-stack guestbook application built with Next.js, Prisma, and Tailwind CSS. This application allows event organizers to manage guests, send broadcast messages, and track attendance.

## Features

- **Event Management:** Create and manage multiple events.
- **Guest Management:** Add, edit, and delete guests. Import and export guest lists from CSV files.
- **Guest Categories:** Categorize guests for better organization.
- **Broadcast Messaging:** Send broadcast messages to guests via WhatsApp and Email.
- **QR Code Generation:** Generate unique QR codes for each guest for easy check-in.
- **Souvenir Claiming:** Track souvenir claims for each event.
- **Real-time Statistics:** View real-time statistics for each event.
- **Authentication:** Secure authentication for event organizers and administrators.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/UI](https://ui.shadcn.com/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.x or later)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/kristiawan6/guestbookapp.git
   cd guestbookapp
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set up the database:**

   - Create a `.env` file in the root of the project.
   - Add your database connection string to the `.env` file:

     ```
     DATABASE_URL="postgresql://user:password@host:port/database"
     ```

   - Run the following command to migrate the database schema:

     ```bash
     npx prisma migrate dev
     ```

4. **Run the development server:**

   ```bash
   yarn dev
   # or
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
