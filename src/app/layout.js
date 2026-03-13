import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import NavbarWrapper from './components/NavbarWrapper';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

export const metadata = {
  title: 'ProfilGG — Le profil gaming que tu mérites',
  description: 'Centralise tes stats, trouve des coéquipiers, progresse avec un coach.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={jakarta.variable}>
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}