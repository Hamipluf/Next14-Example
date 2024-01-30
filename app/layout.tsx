import './ui/global.css';
// Impoerto las fuentas de google fontrs
import { monsterrat } from './ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={`${monsterrat.className} antialiased`}>{children}</div>
        <footer className="flex items-center justify-center py-10">
          Ejemplo hecho con ❤💗
        </footer>
      </body>
    </html>
  );
}
