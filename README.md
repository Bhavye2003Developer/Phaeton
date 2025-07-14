# Phaeton

A secure, end-to-end encrypted message sharing tool that prioritizes privacy. Share sensitive information with confidence through password-protected, self-destructing messages.

**Live Demo**: [Phaeton](https://phaeton-five.vercel.app)

## Security-First Design

Phaeton implements client-side encryption to ensure that your messages remain private. The server never has access to your decrypted content, passwords, or encryption keys—providing true zero-knowledge security.

### Key Security Features

-   **Client-side encryption** using AES-GCM via the Web Crypto API
-   **Authenticated encryption** ensuring both confidentiality and integrity
-   **Zero-knowledge architecture**—server never sees decrypted messages
-   **Secure password storage** using SHA-256 hashing
-   **View limits** and burn-after-read functionality

## Features

-   **End-to-end encryption**: Messages encrypted locally in your browser
-   **Password protection**: Set alphanumeric or numeric passwords for message access
-   **View limits**: Control how many times a message can be opened
-   **Burn-after-read**: Messages automatically disappear after viewing
-   **Link-based sharing**: No user accounts required—just share the link
-   **Mobile-friendly**: Works seamlessly across all devices

## Tech Stack

### Frontend

-   **Next.js** (App Router) - React framework for production
-   **Tailwind CSS** - Utility-first CSS framework
-   **shadcn/ui** - Re-usable component library
-   **Aceternity UI** - Modern UI components

### Backend

-   **Next.js API Routes** - Serverless API endpoints
-   **Prisma ORM** - Type-safe database client
-   **MongoDB** - Document database for encrypted message storage

### Security

-   **Web Crypto API** - Browser-native cryptographic operations
-   **AES-GCM** - Authenticated encryption algorithm

## How It Works

1.  **Message Creation**: User writes a message and configures security settings (password, expiry, burn timer, view limit)
    
2.  **Client-side Encryption**: Message is encrypted in the browser using AES-GCM with a password-derived key
    
3.  **Secure Storage**: Only the encrypted message and password hash are sent to the server
    
4.  **Link Generation**: A unique shareable link is created: `/view?msg_id=abc123`
    
5.  **Secure Retrieval**: When accessed:
    
    -   Password verification (if protected)
    -   Client-side decryption in the recipient's browser
    -   Burn timer activation (if configured)
    -   View count and limit enforcement

## Getting Started

### Installation

1.  **Clone the repository**
    
    ```bash
    git https://github.com/Bhavye2003Developer/Phaeton.git
    cd phaeton
    
    ```
    
2.  **Install dependencies**
    
    ```bash
    npm install
    
    ```
    
3.  **Set up environment variables**
    
    Create a `.env.local` file in the root directory:
    
    ```env
    # Database
    DATABASE_URL="mongodb://localhost:27017/phaeton"
    NEXT_PUBLIC_DEFAULT_PASSWORD="Your Default Password for encrypting messages" 
    
    ```
    
4.  **Set up the database**
    
    ```bash
    npx prisma generate
    npx prisma db push
    
    ```
    
5.  **Start the development server**
    
    ```bash
    npm run dev
    
    ```
    
6.  **Open your browser**
    
    Navigate to `http://localhost:3000` to start using Phaeton.

## Security Considerations

-   **Client-side encryption**: All encryption/decryption happens in the browser
-   **No server-side keys**: Encryption keys never leave the client
-   **Password security**: Passwords are hashed using SHA-256 before storage
