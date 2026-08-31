#!/bin/bash
# Instalador rápido — corre a partir da pasta extraída do zip.
set -e

echo "→ A instalar dependências do site (Next.js)..."
npm install

echo "→ A instalar dependências do gerador de cartão de visita (Python)..."
pip install --break-system-packages reportlab qrcode pillow 2>/dev/null || pip install reportlab qrcode pillow

echo ""
echo "Tudo pronto. Para correr o site localmente:"
echo "  npm run dev"
echo ""
echo "Para gerar/actualizar o cartão de visita:"
echo "  cd cartao-visita && python3 gerar_cartao.py"
echo ""
echo "Lê o LEIA-ME.md para os próximos passos (Vercel, Redis, domínio)."
