"""
Gera o cartão de visita da ADS-Construções, Lda em PDF, pronto para gráfica.

Tamanho final: 85 x 55 mm (padrão europeu/moçambicano) com 3 mm de sanha
(bleed) em cada lado e marcas de corte, para qualquer gráfica poder
imprimir sem sobressaltos.

Uso:
    python3 gerar_cartao.py

Antes de enviar à gráfica, confirma em MARCA/CONTACTO/DOMINIO abaixo se
os dados já são os finais.
"""

import qrcode
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor

# ---------------------------------------------------------------------------
# DADOS A CONFIRMAR ANTES DE IMPRIMIR
# ---------------------------------------------------------------------------
MARCA = "ADS-Construções"
SUBMARCA = "Lda"
TAGLINE = "Pintura residencial e comercial"
TELEFONE = "+258 84 777 5566"
WHATSAPP_TEXTO = "WhatsApp: +258 84 777 5566"
EMAIL = "sithoyada@gmail.com"
DOMINIO_EXIBIDO = "adsconstrucoes.co.mz"
URL_QRCODE = "https://adsconstrucoes.co.mz"  # aponta para o site/portfólio

# ---------------------------------------------------------------------------
# Paleta (igual à do site)
# ---------------------------------------------------------------------------
REBOCO = HexColor("#F1ECE2")
CARVAO = HexColor("#2A2622")
AZUL_BAIA = HexColor("#1E4B5F")
TERRACOTA = HexColor("#A6472B")
OCRE = HexColor("#C08829")
VERDE_CAJU = HexColor("#5C6B3F")
BRANCO_TINTA = HexColor("#FAF8F4")

# ---------------------------------------------------------------------------
# Dimensões
# ---------------------------------------------------------------------------
LARGURA_FINAL = 85 * mm
ALTURA_FINAL = 55 * mm
SANHA = 3 * mm
LARGURA_PAGINA = LARGURA_FINAL + 2 * SANHA
ALTURA_PAGINA = ALTURA_FINAL + 2 * SANHA
MARCA_CORTE = 4 * mm


def desenhar_simbolo(c, x, y, tamanho, cor_esquadria=None, cor_pincelada=None):
    """Desenha o símbolo da marca (esquadria + pincelada) em vector,
    escalado para caber num quadrado de lado `tamanho`, com o canto
    inferior esquerdo em (x, y). Mantém a mesma proporção do logo-mark.svg
    (viewBox 0 0 120 120) para haver consistência com o site.
    Aceita cores alternativas para versões monocromáticas/discretas."""
    cor_esquadria = cor_esquadria or AZUL_BAIA
    cor_pincelada = cor_pincelada or TERRACOTA
    escala = tamanho / 120.0

    c.saveState()
    c.translate(x, y)
    c.scale(escala, escala)

    # Esquadria (canto de parede/construção) — eixo Y invertido face ao SVG
    c.setFillColor(cor_esquadria)
    p = c.beginPath()
    p.moveTo(34, 106)
    p.lineTo(48, 106)
    p.lineTo(48, 48)
    p.lineTo(100, 48)
    p.lineTo(100, 34)
    p.lineTo(34, 34)
    p.close()
    c.drawPath(p, fill=1, stroke=0)

    # Pincelada de tinta a atravessar a esquadria
    c.setFillColor(cor_pincelada)
    p2 = c.beginPath()
    p2.moveTo(10, 74)
    p2.curveTo(28, 84, 46, 80, 62, 86)
    p2.curveTo(80, 93, 96, 88, 112, 96)
    p2.lineTo(116, 74)
    p2.curveTo(98, 66, 80, 73, 62, 65)
    p2.curveTo(46, 58, 28, 62, 14, 52)
    p2.close()
    c.drawPath(p2, fill=1, stroke=0)

    c.restoreState()


def marcas_de_corte(c):
    """Desenha 8 marcas de corte finas nos cantos, fora da zona de sanha."""
    c.setStrokeColor(HexColor("#999999"))
    c.setLineWidth(0.3)
    pontos = [
        (SANHA, 0, SANHA, -MARCA_CORTE),
        (0, SANHA, -MARCA_CORTE, SANHA),
        (LARGURA_PAGINA - SANHA, 0, LARGURA_PAGINA - SANHA, -MARCA_CORTE),
        (LARGURA_PAGINA, SANHA, LARGURA_PAGINA + MARCA_CORTE, SANHA),
        (SANHA, ALTURA_PAGINA, SANHA, ALTURA_PAGINA + MARCA_CORTE),
        (0, ALTURA_PAGINA - SANHA, -MARCA_CORTE, ALTURA_PAGINA - SANHA),
        (LARGURA_PAGINA - SANHA, ALTURA_PAGINA, LARGURA_PAGINA - SANHA, ALTURA_PAGINA + MARCA_CORTE),
        (LARGURA_PAGINA, ALTURA_PAGINA - SANHA, LARGURA_PAGINA + MARCA_CORTE, ALTURA_PAGINA - SANHA),
    ]
    for x1, y1, x2, y2 in pontos:
        c.line(x1, y1, x2, y2)


def desenhar_frente(c):
    # fundo até à sanha (reboco — a "parede" da marca)
    c.setFillColor(REBOCO)
    c.rect(0, 0, LARGURA_PAGINA, ALTURA_PAGINA, fill=1, stroke=0)

    x0, y0 = SANHA, SANHA  # origem da área final (85x55)

    # símbolo da marca
    desenhar_simbolo(c, x0 + 6 * mm, y0 + 38 * mm, 9 * mm)

    # nome da marca — divide em duas cores no primeiro hífen ou espaço
    c.setFillColor(CARVAO)
    c.setFont("Helvetica-Bold", 20)
    if "-" in MARCA:
        primeira, resto = MARCA.split("-", 1)
        segunda = "-" + resto
    else:
        partes = MARCA.split(" ", 1)
        primeira = partes[0]
        segunda = " " + partes[1] if len(partes) > 1 else ""
    c.drawString(x0 + 19 * mm, y0 + 40 * mm, primeira)
    largura_primeira = c.stringWidth(primeira, "Helvetica-Bold", 20)
    c.setFillColor(TERRACOTA)
    c.drawString(x0 + 19 * mm + largura_primeira, y0 + 40 * mm, segunda)

    c.setFillColor(CARVAO)
    c.setFont("Helvetica", 8)
    c.drawString(x0 + 19 * mm, y0 + 36 * mm, SUBMARCA.upper())

    # tagline
    c.setFont("Helvetica", 8)
    c.setFillColor(HexColor("#5A554E"))
    c.drawString(x0 + 6 * mm, y0 + 10 * mm, TAGLINE)

    # tira de amostras de tinta — assinatura visual da marca, em baixo
    cores = [AZUL_BAIA, TERRACOTA, OCRE, VERDE_CAJU]
    largura_amostra = LARGURA_FINAL / len(cores)
    for i, cor in enumerate(cores):
        c.setFillColor(cor)
        c.rect(x0 + i * largura_amostra, y0, largura_amostra, 4 * mm, fill=1, stroke=0)


def desenhar_verso(c):
    # fundo carvão — espelha o rodapé/secção de contacto do site
    c.setFillColor(CARVAO)
    c.rect(0, 0, LARGURA_PAGINA, ALTURA_PAGINA, fill=1, stroke=0)

    x0, y0 = SANHA, SANHA

    # QR code
    qr = qrcode.QRCode(border=1, box_size=10)
    qr.add_data(URL_QRCODE)
    qr.make(fit=True)
    img = qr.make_image(fill_color="#2A2622", back_color="#FAF8F4")
    caminho_qr = "/tmp/qr_traco_certo.png"
    img.save(caminho_qr)

    lado_qr = 20 * mm
    qr_x = x0 + LARGURA_FINAL - lado_qr - 6 * mm
    qr_y = y0 + (ALTURA_FINAL - lado_qr) / 2
    # moldura clara atrás do QR para garantir contraste/leitura
    c.setFillColor(BRANCO_TINTA)
    c.rect(qr_x - 2 * mm, qr_y - 2 * mm, lado_qr + 4 * mm, lado_qr + 4 * mm, fill=1, stroke=0)
    c.drawImage(caminho_qr, qr_x, qr_y, width=lado_qr, height=lado_qr)

    # contactos à esquerda
    c.setFillColor(BRANCO_TINTA)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(x0 + 6 * mm, y0 + 38 * mm, TELEFONE)
    c.setFont("Helvetica", 8)
    c.drawString(x0 + 6 * mm, y0 + 33 * mm, WHATSAPP_TEXTO)
    c.drawString(x0 + 6 * mm, y0 + 28 * mm, EMAIL)

    c.setFillColor(OCRE)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(x0 + 6 * mm, y0 + 10 * mm, DOMINIO_EXIBIDO)
    c.setFillColor(HexColor("#B7B2A9"))
    c.setFont("Helvetica", 6.5)
    c.drawString(x0 + 6 * mm, y0 + 6.5 * mm, "aponta a câmara para o QR code")

    # símbolo discreto no canto superior, em tom escuro sobre o fundo
    cor_discreta = HexColor("#3A3530")
    desenhar_simbolo(c, x0 + LARGURA_FINAL - 16 * mm, y0 + ALTURA_FINAL - 15 * mm, 9 * mm,
                      cor_esquadria=cor_discreta, cor_pincelada=cor_discreta)


def gerar():
    caminho_saida = "cartao-de-visita-ads-construcoes.pdf"
    c = canvas.Canvas(caminho_saida, pagesize=(LARGURA_PAGINA, ALTURA_PAGINA))

    desenhar_frente(c)
    marcas_de_corte(c)
    c.showPage()

    desenhar_verso(c)
    marcas_de_corte(c)
    c.showPage()

    c.save()
    print(f"Gerado: {caminho_saida}")


if __name__ == "__main__":
    gerar()
