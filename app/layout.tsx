import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dako Tattoo Studio | Black & Grey Tattoo Artist',
  description: 'Professional tattoo studio for black and grey realism, custom tattoo design and booking requests in Calatorao / Zaragoza.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
