export function Pincelada({ cor = "var(--reboco)" }: { cor?: string }) {
  // Uma pincelada orgânica em vez de uma linha recta — reforça o tema
  // "pintura" em vez de um <hr> genérico.
  return (
    <svg
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "40px", display: "block" }}
      aria-hidden="true"
    >
      <path
        d="M0,22 C150,5 300,34 450,18 C600,4 750,30 900,16 C1000,7 1100,26 1200,14 L1200,40 L0,40 Z"
        fill={cor}
      />
    </svg>
  );
}
