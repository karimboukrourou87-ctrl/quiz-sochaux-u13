export const metadata = {
  title: "Quiz U13 - FC Sochaux Lionceaux",
  description: "Quiz officiel des Lionceaux pour préparer Capbreton 2026-2027",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#003D7A" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Quiz U13 FCSM" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#003D7A", overflowX: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
