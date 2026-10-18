import { useState } from "react";
import {
  ShoppingBag,
  Plus,
  Heart,
  Check,
  Package,
  Truck,
  RefreshCcw,
} from "lucide-react";
import type { TemplateProps, Entity } from "../types";
import { list, money } from "../types";
import {
  WebsiteNav,
  Button,
  Photo,
  SectionHead,
  Footer,
  Modal,
  Search,
  Tabs,
  Badge,
  ContactModal,
  useToast,
} from "../shared/ui";
import { useCart, CartModal } from "../shared/cart";
export default function Ecommerce({ config }: TemplateProps) {
  const { cart, setCart, add, count } = useCart();
  const [cartOpen, setCartOpen] = useState(false),
    [category, setCategory] = useState("Todos"),
    [query, setQuery] = useState(""),
    [selected, setSelected] = useState<Entity | null>(null),
    [contact, setContact] = useState(false);
  const toast = useToast();
  const products = list(config, "products").filter(
    (p) =>
      (category === "Todos" || p.category === category) &&
      p.title.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="shop-announcement">
        OBJETOS ESCOLHIDOS COM INTENÇÃO · COLEÇÃO ESSENCIAL
      </div>
      <WebsiteNav
        config={config}
        links={[
          { label: "Coleção", href: "#colecao" },
          { label: "Nosso olhar", href: "#olhar" },
          { label: "Sobre a Forma", href: "#sobre" },
        ]}
        cta={`Sacola (${count})`}
        onAction={() => setCartOpen(true)}
      />
      <main id="main" className="web-main">
        <section className="shop-hero">
          <div className="shop-hero-copy hero-enter">
            <span className="eyebrow">DESIGN PARA A VIDA REAL</span>
            <h1 className="hero-title">{config.content.headline}</h1>
            <p className="hero-copy">{config.content.description}</p>
            <a className="btn primary" href="#colecao">
              Explore a coleção
            </a>
            <div className="shop-hero-bottom">
              <span>01 / STUDIO ONE</span>
              <span>FORMA & FUNÇÃO, EM SINTONIA</span>
            </div>
          </div>
          <div className="shop-hero-photo hero-enter hero-delay">
            <Photo
              name={config.content.heroImage}
              alt="Fone de ouvido de design sobre uma base terracota"
              loading="eager"
            />
            <span className="shop-new">
              NOVA
              <br />
              PERSPECTIVA
            </span>
            <button
              className="shop-hotspot"
              aria-label="Ver Fone Studio One"
              onClick={() => setSelected(list(config, "products")[0])}
            >
              <Plus size={22} />
            </button>
          </div>
        </section>
        <div className="shop-values" id="olhar">
          <span>
            <Package size={19} />
            Design com propósito
          </span>
          <span>
            <Check size={19} />
            Uma seleção cuidadosa
          </span>
          <span>
            <Heart size={19} />
            Feito para fazer parte
          </span>
        </div>
        <section className="section" id="colecao">
          <SectionHead
            eyebrow="ESCOLHAS QUE FAZEM SENTIDO"
            title="Seu próximo essencial."
          >
            <Search
              value={query}
              onChange={setQuery}
              placeholder="Buscar na coleção…"
            />
          </SectionHead>
          <div className="toolbar">
            <Tabs
              items={["Todos", "Áudio", "Lifestyle", "Decoração"]}
              value={category}
              onChange={setCategory}
            />
            <span className="muted" style={{ fontSize: 12 }}>
              {products.length} objetos selecionados
            </span>
          </div>
          <div className="shop-product-grid">
            {products.map((p, i) => (
              <article className="shop-product" key={p.id} data-reveal>
                <div className="image-wrap">
                  <Photo name={p.image || "product.webp"} alt={p.title} />
                  {p.tag && <Badge>{p.tag}</Badge>}
                  <button
                    className="product-quick"
                    onClick={() => {
                      add(p);
                      toast(`${p.title} adicionado à sacola.`);
                    }}
                    aria-label={`Adicionar ${p.title} à sacola`}
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="between">
                  <div>
                    <span className="eyebrow">{p.category}</span>
                    <h3>
                      <button onClick={() => setSelected(p)}>{p.title}</button>
                    </h3>
                  </div>
                  <b>{money(p.price || 0)}</b>
                </div>
              </article>
            ))}
          </div>
          {!products.length && (
            <p className="empty">Nenhum produto para esta busca.</p>
          )}
        </section>
        <section className="section" id="sobre">
          <div className="shop-about">
            <Photo
              name="beauty.webp"
              alt="Objetos e materiais em uma composição natural"
            />
            <div data-reveal>
              <span className="eyebrow">A BELEZA DO QUE FICA</span>
              <h2>
                Menos excesso.
                <br />
                Mais significado.
              </h2>
              <p>
                Gostamos de objetos que fazem sentido. Que resolvem, acolhem e
                acompanham os dias com uma presença discreta. Uma coleção para
                viver bem, do seu jeito.
              </p>
              <Button variant="ghost" onClick={() => setContact(true)}>
                Converse com a Forma
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer config={config} onContact={() => setContact(true)} />
      <CartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        setCart={setCart}
      />
      <ContactModal
        config={config}
        open={contact}
        onClose={() => setContact(false)}
        subject="Dúvida sobre a coleção"
      />
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title || "Produto"}
        wide
      >
        {selected && (
          <div className="product-detail">
            <Photo
              name={selected.image || "product.webp"}
              alt={selected.title}
            />
            <div>
              <span className="eyebrow">{selected.category}</span>
              <h2>{selected.title}</h2>
              <p>{selected.description}</p>
              <strong className="price">{money(selected.price || 0)}</strong>
              <p className="field-hint">
                Produto e preço de demonstração. Imagem ilustrativa.
              </p>
              <Button
                className="full"
                onClick={() => {
                  add(selected);
                  setSelected(null);
                  setCartOpen(true);
                }}
              >
                <ShoppingBag size={18} />
                Adicionar à sacola
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
