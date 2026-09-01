import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FaixaConfianca } from "./components/FaixaConfianca";
import { Pincelada } from "./components/Pincelada";
import { Servicos } from "./components/Servicos";
import { Calculadora } from "./components/Calculadora";
import { Portfolio } from "./components/Portfolio";
import { Testemunhos } from "./components/Testemunhos";
import { Processo } from "./components/Processo";
import { FAQ } from "./components/FAQ";
import { Contacto } from "./components/Contacto";
import { Footer } from "./components/Footer";
import { AoEntrarNaVista } from "./components/AoEntrarNaVista";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FaixaConfianca />
        <Pincelada cor="var(--branco-tinta)" />
        <AoEntrarNaVista><Servicos /></AoEntrarNaVista>
        <div style={{ background: "var(--branco-tinta)" }}>
          <Pincelada cor="var(--reboco)" />
        </div>
        <AoEntrarNaVista><Calculadora /></AoEntrarNaVista>
        <div style={{ background: "var(--branco-tinta)" }}>
          <Pincelada cor="var(--reboco)" />
        </div>
        <AoEntrarNaVista><Portfolio /></AoEntrarNaVista>
        <Pincelada cor="var(--branco-tinta)" />
        <AoEntrarNaVista><Testemunhos /></AoEntrarNaVista>
        <div style={{ background: "var(--branco-tinta)" }}>
          <Pincelada cor="var(--reboco)" />
        </div>
        <AoEntrarNaVista><Processo /></AoEntrarNaVista>
        <div style={{ background: "var(--branco-tinta)" }}>
          <Pincelada cor="var(--reboco)" />
        </div>
        <AoEntrarNaVista><FAQ /></AoEntrarNaVista>
        <div style={{ background: "var(--branco-tinta)" }}>
          <Pincelada cor="var(--carvao)" />
        </div>
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
