export type Artigo = {
  slug: string;
  titulo: string;
  resumo: string;
  dataPublicacao: string; // ISO
  paragrafos: string[];
};

export const ARTIGOS: Artigo[] = [
  {
    slug: "clima-tinta-maputo",
    titulo: "Como escolher a tinta certa para o clima de Maputo",
    resumo:
      "Calor, humidade e chuvas fortes exigem tintas e preparação diferentes das de climas mais secos. Aqui fica o que considerar antes de pintar.",
    dataPublicacao: "2026-02-01",
    paragrafos: [
      "Maputo tem um clima quente e húmido, com uma época chuvosa que testa qualquer pintura mal preparada. Isso significa que a escolha da tinta não pode ser feita só pela cor — tem de ter em conta a exposição ao sol e à humidade da superfície.",
      "Para exteriores e fachadas, o mais importante é usar tinta com boa resistência à água e aos raios UV. Tintas acrílicas de exterior, com propriedades hidrofugantes, ajudam a evitar que a humidade entre pelas paredes durante a época chuvosa e reduzem o desbotamento causado pelo sol forte durante o resto do ano.",
      "Em interiores, o maior inimigo costuma ser o mofo em casas de banho e cozinhas, onde a humidade se acumula. Tintas com aditivos antifúngicos fazem diferença real nestas divisões, mesmo que custem um pouco mais por litro.",
      "Outro ponto que muitas vezes se ignora é a preparação da parede antes de pintar. Numa superfície com humidade retida ou fissuras por tratar, mesmo a melhor tinta do mercado vai descascar ou empolar em poucos meses. Vale sempre a pena tratar a causa da humidade antes de pintar por cima.",
      "Se não tens a certeza de qual tinta se adequa ao teu caso — parede exterior virada a sul, casa de banho sem ventilação, fachada junto ao mar — fala connosco antes de comprar. Muitas vezes a diferença entre um trabalho que dura 2 anos e um que dura 8 está só na escolha certa do material.",
    ],
  },
  {
    slug: "quantas-demaos-de-tinta",
    titulo: "Quantas demãos de tinta preciso mesmo?",
    resumo:
      "A resposta não é sempre \"duas\" — depende da cor antiga, da tinta nova e do estado da superfície.",
    dataPublicacao: "2026-02-08",
    paragrafos: [
      "É uma das perguntas mais comuns quando alguém pede um orçamento: \"quantas demãos vou precisar?\". A resposta honesta é que depende de três factores — a cor que já está na parede, a cor nova, e a qualidade/opacidade da tinta escolhida.",
      "Se estás a pintar uma cor clara por cima de outra cor clara semelhante, muitas vezes uma demão bem aplicada (depois de primário) já cobre bem. Mas se estás a mudar de uma cor escura para uma clara — por exemplo, de um azul forte para um branco — vais quase sempre precisar de pelo menos duas demãos, e por vezes três, para a cor antiga não \"transparecer\".",
      "O primário (base) também faz diferença. Saltar o primário para poupar dinheiro costuma sair caro a longo prazo: sem ele, a tinta de acabamento tem de fazer o trabalho de cobrir e proteger ao mesmo tempo, o que normalmente obriga a mais demãos e ainda assim com resultado menos uniforme.",
      "Outro factor é a superfície em si. Paredes rebocadas de novo absorvem mais tinta do que uma parede já pintada anteriormente, e por isso podem precisar de uma demão extra ou de um primário selador antes de começar.",
      "Na prática, quando fazemos um orçamento, já incluímos o número de demãos necessário para um acabamento uniforme — não cobramos por demão extra que devia ter sido prevista à partida. É por isso que vale a pena teres uma visita antes de fechar o preço, em vez de um valor \"à vista\" sem ver o espaço.",
    ],
  },
  {
    slug: "sinais-de-fissuras-na-parede",
    titulo: "5 sinais de que a tua parede precisa de reparação antes de pintar",
    resumo:
      "Pintar por cima de uma fissura activa é desperdiçar tinta. Aprende a reconhecer os sinais antes de chamares o pintor.",
    dataPublicacao: "2026-02-15",
    paragrafos: [
      "Nem toda a fissura numa parede é grave, mas ignorar os sinais errados pode significar pintar duas vezes o mesmo espaço em poucos meses. Aqui ficam cinco sinais a que vale a pena prestar atenção antes de agendar a pintura.",
      "1. Fissuras finas que \"voltam\" depois de tapadas — se já tapaste uma fissura com massa e ela reapareceu na mesma linha, é provável que seja um movimento estrutural leve, não apenas um problema estético. Isto precisa de ser tratado com um material flexível, não só massa comum.",
      "2. Manchas escuras ou esverdeadas — normalmente sinal de humidade ou início de fungos por trás da tinta. Pintar por cima sem tratar a causa só esconde o problema por uns meses.",
      "3. Tinta a empolar ou descascar em placas — geralmente indica que há humidade a tentar sair da parede. É preciso deixar secar e tratar a origem da humidade antes de qualquer tinta nova.",
      "4. Pó fino a soltar-se da parede ao tocar — sinal de que o reboco está a perder aderência. Pintar directamente sobre isso significa que a tinta nova vai descascar junto com o reboco solto.",
      "5. Fissuras junto a portas e janelas — são normais em edifícios mais antigos devido a pequenos assentamentos, mas se forem largas (mais do que uma unha) ou estiverem a crescer, vale a pena reforçar antes de pintar.",
      "Na prática, tratamos disto como parte do serviço de reparação de imóveis antes da pintura geral — não faz sentido aplicar tinta nova sobre uma base que ainda tem um problema por resolver.",
    ],
  },
];

export function obterArtigoPorSlug(slug: string): Artigo | undefined {
  return ARTIGOS.find((a) => a.slug === slug);
}
