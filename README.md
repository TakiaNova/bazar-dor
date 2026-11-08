# 🛒 বাজার দর (Bazar Dor)

**Know Your Market. Save Your Money.**

Bazar Dor is a grocery price tracking web application designed to help people in Bangladesh explore daily essential product prices, compare market rates, and make smarter shopping decisions.

## 🌟 Features

- **Live Grocery Prices:** Fetch grocery product and category data from the provided API.
- **Product Search:** Search for products by name.
- **Category Filtering:** Browse products by category.
- **Price Sorting:** Sort products by price (low to high and high to low) or name.
- **Product Details:** View individual product prices, historical comparisons, and market-wise price information.
- **User Authentication:** Sign up and sign in using Better Auth.
- **Google Authentication:** Google sign-in integration.
- **Protected Profile:** Access your profile after authentication.
- **Profile Update:** Update your account name.
- **Responsive Design:** Designed for desktop and mobile screens.
- **Toast Notifications:** Get feedback for important actions.

## 🛠️ Technologies Used

- Next.js 16
- React
- JavaScript
- Tailwind CSS
- MongoDB Atlas
- Better Auth
- React Hot Toast
- Lucide React

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TakiaNova/bazar-dor.git
   ```

2. Navigate to the project folder:

   ```bash
   cd bazar-dor
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root and configure your environment variables:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   BETTER_AUTH_SECRET=your_secret
   BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔗 API

Bazar Dor uses the Programming Hero Bazar Dor API.

Base URL:

```text
https://openapi.programming-hero.com/api/bazardor
```

Endpoints:

- `/products`
- `/categories`

## 📁 Project Structure

```text
bazar-dor/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   ├── category/
│   │   ├── product/
│   │   ├── profile/
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── page.js
│   │   ├── layout.js
│   │   └── globals.css
│   └── lib/
│       ├── api.js
│       ├── auth.js
│       ├── auth-client.js
│       └── mongodb.js
├── .env.local
├── .gitignore
├── package.json
└── README.md
```

## 👩‍💻 Developer

**Takia Sultana Nova**

- GitHub: [@TakiaNova](https://github.com/TakiaNova)
- Portfolio: [Takia Sultana Nova](https://sites.google.com/view/takiasultananova/home)

## 📄 License

This project was developed as part of Programming Hero Assignment 7.

---

**বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।**
