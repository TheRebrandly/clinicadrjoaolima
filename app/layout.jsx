import "./globals.css";
import "./logo.css";

export const metadata = {
  title: "Dr. Joao Lima CRM",
  description: "Premium clinic CRM for aesthetic medicine operations"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
