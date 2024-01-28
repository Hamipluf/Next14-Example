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
      </body>
    </html>
  );
}
