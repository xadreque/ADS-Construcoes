# ADS-Construções, Lda — Site, Portfólio e Cartão de Visita

Pacote completo: website em Next.js (pronto para Vercel), API de contacto
com Redis (Upstash), e o cartão de visita em PDF pronto para gráfica.

---

## 1. Instalar e correr localmente

Precisas de [Node.js](https://nodejs.org) 18 ou superior instalado.

```bash
# 1. Descarregar/extrair o zip, depois entrar na pasta
cd traco-certo

# 2. Instalar dependências
npm install

# 3. Correr em modo de desenvolvimento
npm run dev
```

Abre http://localhost:3000 no navegador.

---

## 2. Publicar na Vercel

1. Cria uma conta em https://vercel.com (podes entrar com GitHub).
2. Sobe esta pasta para um repositório no GitHub (ou usa `vercel` via
   linha de comandos: `npm i -g vercel && vercel`).
3. Na Vercel, "Add New Project" → escolhe o repositório → Deploy.
   A Vercel detecta automaticamente que é um projecto Next.js.

---

## 3. Configurar o Redis (Upstash) — para o formulário e a newsletter

O formulário de "Pedir orçamento" guarda os pedidos e limita abusos
(máx. 5 pedidos/hora por visitante), e a caixa de "Novidades" no rodapé
guarda os e-mails inscritos — ambos usando Redis. A Vercel recomenda o
Upstash, que tem plano gratuito suficiente para começar.

1. Cria uma conta em https://console.upstash.com
2. Cria uma base de dados Redis (região mais próxima: Europa ou África,
   a que tiver menor latência).
3. Copia os valores **REST URL** e **REST TOKEN**.
4. Na Vercel: Project → Settings → Environment Variables, adiciona:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
5. Volta a fazer deploy (Vercel → Deployments → ⋮ → Redeploy).

Sem isto configurado, o formulário continua a funcionar (não bloqueia
o visitante) mas os pedidos não ficam guardados — fica só um aviso nos
logs.

Para veres os pedidos recebidos, usa a consola do Upstash (Data Browser)
e procura chaves que começam por `lead:`. Os e-mails da newsletter ficam
guardados num único conjunto chamado `newsletter:emails`.

---

## 4. Adicionar as fotos e vídeos reais

Vê `public/portfolio/LEIA-ME.md` — tens lá o passo a passo (é literalmente
trocar `src: null` pelo caminho do ficheiro em `app/components/Portfolio.tsx`).

---

## 5. O cartão de visita

Está em `cartao-visita/cartao-de-visita-ads-construcoes.pdf` — frente e
verso, tamanho 85×55mm com 3mm de sanha e marcas de corte, pronto para
qualquer gráfica. O QR code no verso aponta para o domínio do site.

Para gerar de novo depois de mudares nome/contactos/domínio:

```bash
cd cartao-visita
pip install reportlab qrcode pillow
python3 gerar_cartao.py
```

Os dados a editar estão no topo de `gerar_cartao.py`, na secção
"DADOS A CONFIRMAR ANTES DE IMPRIMIR".

---

## 6. Sugestões de domínio

Como ainda não tens um domínio, aqui vão sugestões (a confirmar
disponibilidade em https://dominios.gov.mz ou junto de um registador
de domínios .mz):

- `adsconstrucoes.co.mz`
- `ads-construcoes.co.mz`
- `adsconstrucoeslda.co.mz`
- `adsconstrucoes.com` (se quiseres alcance fora de Moçambique)

Se este ainda não for o domínio final que vais comprar, avisa-me para
actualizar o QR code do cartão.

---

## Antes de publicar — o que É PRECISO trocar

- [x] Nome real do negócio — já actualizado (ADS-Construções, Lda)
- [x] Número de telefone/WhatsApp real — já actualizado (+258 84 777 5566)
- [x] E-mail real — já actualizado (sithoyada@gmail.com)
- [ ] Domínio real (depois de escolhido/comprado) em
      `cartao-visita/gerar_cartao.py` (`URL_QRCODE`)
- [ ] Fotos e vídeos reais em `public/portfolio/`
- [ ] Anos de experiência em `app/components/Hero.tsx` (onde está "+[X] anos")
