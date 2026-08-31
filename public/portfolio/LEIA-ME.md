# Como adicionar os trabalhos reais

1. Coloca aqui as fotos (`.jpg`/`.webp`, idealmente < 500 KB cada) e vídeos
   curtos (`.mp4`, idealmente < 8 MB, sem som ou com som opcional).
2. Abre `app/components/Portfolio.tsx` e, na lista `TRABALHOS`, troca
   `src: null` pelo caminho do ficheiro, por exemplo:
   `src: "/portfolio/sala-matola.jpg"`.
3. Ajusta também o `titulo` de cada peça.
4. Para trocar a foto do hero (o bloco "Exterior" na primeira secção),
   edita `app/components/Hero.tsx` e define o `backgroundImage` indicado
   no comentário `TODO`.

Não precisas de mexer em mais nada — o site já está preparado para os
espaços, tamanhos e comportamento (zoom subtil ao passar o rato, legendas).
