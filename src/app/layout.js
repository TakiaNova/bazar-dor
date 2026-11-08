import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Bazar Dor | Grocery Price Tracker",
  description:
    "Track grocery prices, compare products, and stay updated with Bazar Dor.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "10px",
              background: "#1f2937",
              color: "#fff",
            },
          }}
        />

        {children}
      </body>
    </html>
  );
}
