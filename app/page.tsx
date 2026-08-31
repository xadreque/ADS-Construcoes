import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Pincelada } from "./components/Pincelada";
import { Servicos } from "./components/Servicos";
import { Portfolio } from "./components/Portfolio";
import { Processo } from "./components/Processo";
import { Contacto } from "./components/Contacto";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pincelada cor="var(--branco-tinta)" />
        <Servicos />
        <div style={{ background: "var(--branco-tinta)" }}>
          <Pincelada cor="var(--reboco)" />
        </div>
        <Portfolio />
        <Pincelada cor="var(--branco-tinta)" />
        <Processo />
        <div style={{ background: "var(--branco-tinta)" }}>
          <Pincelada cor="var(--carvao)" />
        </div>
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
