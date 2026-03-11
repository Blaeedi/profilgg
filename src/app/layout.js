import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "ProfilGG — Le LinkedIn du gamer",
  description: "Profil public, stats multi-jeux, LFG intelligent et coachs certifiés.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}