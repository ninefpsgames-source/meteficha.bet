import { createRootRoute, Outlet, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Meteficha.bet — Cassino Online | Slots, Roleta e Cartas" },
      {
        name: "description",
        content:
          "Meteficha.bet: caça-níqueis, roleta e mesas de cartas com saldo real, bônus de boas-vindas e saques rápidos. Jogue com responsabilidade.",
      },
      { property: "og:title", content: "Meteficha.bet — Cassino Online" },
      {
        property: "og:description",
        content: "Slots, roleta e cartas com bônus de boas-vindas e saques rápidos.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
