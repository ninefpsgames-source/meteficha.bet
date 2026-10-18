import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Dices,
  Spade,
  CircleDot,
  Radio,
  Wallet,
  Flame,
  Sparkles,
  Gift,
  Play,
  ChevronRight,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/casino-hero.webp";
import slotsImg from "@/assets/casino-game-slots.webp";
import rouletteImg from "@/assets/casino-game-roulette.webp";
import cardsImg from "@/assets/casino-game-cards.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meteficha.bet — Cassino Online | Slots, Roleta e Cartas" },
      {
        name: "description",
        content:
          "Jogue slots, roleta e cartas no Meteficha.bet. Bônus de boas-vindas, saldo seguro e saques rápidos.",
      },
    ],
  }),
  component: Home,
});

const categories = [
  { label: "Slots", icon: Dices, active: true },
  { label: "Roleta", icon: CircleDot, active: false },
  { label: "Cartas", icon: Spade, active: false },
  { label: "Ao Vivo", icon: Radio, active: false },
  { label: "Promoções", icon: Gift, active: false },
];

const games = [
  { name: "Fortune Slots", category: "Slots", image: slotsImg, rtp: "96.4%", hot: true },
  { name: "Roleta Dourada", category: "Roleta", image: rouletteImg, rtp: "97.1%", hot: true },
  { name: "Blackjack Royal", category: "Cartas", image: cardsImg, rtp: "98.2%", hot: false },
  { name: "Mega Reels", category: "Slots", image: slotsImg, rtp: "95.8%", hot: false },
  { name: "Roleta Relâmpago", category: "Roleta", image: rouletteImg, rtp: "96.9%", hot: true },
  { name: "Poker Elite", category: "Cartas", image: cardsImg, rtp: "97.5%", hot: false },
  { name: "Diamond Spin", category: "Slots", image: slotsImg, rtp: "96.0%", hot: false },
  { name: "Roleta Europeia", category: "Roleta", image: rouletteImg, rtp: "97.3%", hot: false },
];

function Home() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBalance(248.5);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen hidden md:block">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
          <div className="flex items-center gap-10">
            <a href="/" className="font-display text-2xl font-bold tracking-wide text-primary">
              METE<span className="text-foreground">FICHA</span>
              <span className="text-accent">.bet</span>
            </a>
            <nav className="flex items-center gap-7 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              <a href="#jogos" className="transition-colors hover:text-primary">Cassino</a>
              <a href="#ao-vivo" className="transition-colors hover:text-primary">Ao Vivo</a>
              <a href="#promocoes" className="transition-colors hover:text-primary">Promoções</a>
              <a href="#vip" className="transition-colors hover:text-primary">VIP</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5">
              <Wallet className="h-4 w-4 text-primary" />
              {loading ? (
                <span className="h-4 w-16 animate-pulse rounded bg-muted" />
              ) : (
                <span className="font-display text-sm font-semibold text-foreground">
                  R$ {balance.toFixed(2)}
                </span>
              )}
            </div>
            <Button variant="accent" size="default">
              <Gift className="h-4 w-4" /> Depositar
            </Button>
            <Button variant="outline" size="icon" aria-label="Minha conta">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroImg}
          alt="Mesa de cassino à noite com fichas doradas e verdes, cartas e roleta sob luz dramática"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="relative mx-auto flex max-w-7xl items-center px-8 py-28">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Bônus de boas-vindas 100%
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-tight text-foreground">
              Sua sorte começa aqui
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Slots, roleta e mesas de cartas com saldo seguro, saques rápidos e
              RTP transparente. Jogue agora e receba até R$ 500 em bônus.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Button size="lg">
                <Play className="h-5 w-5" /> Jogar Agora
              </Button>
              <Button variant="outline" size="lg">
                Ver Promoções <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="jogos" className="mx-auto max-w-7xl px-8 py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">Jogos em Destaque</h2>
            <p className="mt-2 text-muted-foreground">Os mais jogados da semana no Meteficha.bet</p>
          </div>
          <div className="flex items-center gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.label}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors ${
                    cat.active
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {games.map((game) => (
            <div
              key={game.name}
              className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/50"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={game.image}
                  alt={`Capa do jogo ${game.name}, categoria ${game.category}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {game.hot && (
                  <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
                    <Flame className="h-3 w-3" /> Hot
                  </span>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-background/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <Button size="sm">
                    <Play className="h-4 w-4" /> Jogar
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <p className="font-display text-sm font-semibold text-foreground">{game.name}</p>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{game.category}</span>
                  <span>RTP {game.rtp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="promocoes" className="mx-auto max-w-7xl px-8 pb-20">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-secondary via-card to-background p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <Gift className="h-3.5 w-3.5" /> Oferta exclusiva
            </span>
            <h3 className="mt-4 font-display text-3xl font-bold text-foreground">
              Deposite hoje e dobre suas fichas
            </h3>
            <p className="mt-3 max-w-md text-muted-foreground">
              Bônus de 100% até R$ 500 no primeiro depósito, liberado na hora para
              jogar em qualquer slot, roleta ou mesa de cartas.
            </p>
            <Button className="mt-6" size="lg">
              Resgatar bônus <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div id="vip" className="flex flex-col justify-between rounded-2xl border border-border bg-card p-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
                <Sparkles className="h-3.5 w-3.5" /> Clube VIP
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
                Cashback semanal
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Jogadores VIP recebem até 15% de cashback e gerente de conta
                dedicado.
              </p>
            </div>
            <Button variant="outline" className="mt-6">
              Conhecer o VIP
            </Button>
          </div>
        </div>
      </section>

      <footer id="ao-vivo" className="border-t border-border bg-card/40 py-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Meteficha.bet — Jogue com responsabilidade. +18</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-primary">Termos</a>
            <a href="#" className="transition-colors hover:text-primary">Privacidade</a>
            <a href="#" className="transition-colors hover:text-primary">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
