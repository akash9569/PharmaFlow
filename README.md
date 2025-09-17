# PharmaFlow - Online Pharmacy

Welcome to PharmaFlow, your trusted online pharmacy for all your health needs. This application is a modern, full-stack web app built with Next.js, Firebase, and Google's generative AI.

## Key Features

- **Product Catalog:** Browse and search for a wide range of pharmaceutical products with detailed descriptions and pricing.
- **AI Dosage Helper:** An intelligent tool that provides dosage recommendations based on user-reported symptoms.
- **Shopping Cart & Checkout:** A seamless e-commerce experience allowing users to add products to a cart and complete their purchase.
- **User Authentication:** Secure user accounts with email/password and Google sign-in options, managed by Firebase Authentication.
- **AI Chatbot "PharmaBot":** A friendly pharmacy assistant, powered by Google's Gemini model, to answer questions about medications and general health topics in real-time.
- **Membership Program:** An overview of an exclusive membership with benefits like free shipping and discounts.
- **Contact Page:** An interactive contact form with validation and a map to display the pharmacy's location.
- **Order History:** A dedicated page for authenticated users to view their past orders and their statuses.
- **Client Reviews:** A dynamic carousel of customer testimonials with an option for users to submit their own reviews.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **UI:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [ShadCN UI](https://ui.shadcn.com/) for components.
- **Generative AI:** [Google AI (Gemini)](https://ai.google.dev/) via [Genkit](https://firebase.google.com/docs/genkit) for the AI Dosage Helper and Chatbot.
- **Authentication:** [Firebase Authentication](https://firebase.google.com/docs/auth) for secure user management.
- **Form Management:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for robust form validation.

## Getting Started

To run this project locally, you will need to set up your environment variables.

1.  **Create a `.env.local` file** in the root of the project.
2.  **Add your Firebase and Google AI credentials** to the file:

    ```
    # Firebase Client SDK Configuration
    NEXT_PUBLIC_FIREBASE_API_KEY=
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
    NEXT_PUBLIC_FIREBASE_APP_ID=
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

    # Genkit (Google AI) API Key
    GEMINI_API_KEY=
    ```

3.  **Install dependencies and run the development server:**

    ```bash
    npm install
    npm run dev
    ```

The application will be available at `http://localhost:9002`.
