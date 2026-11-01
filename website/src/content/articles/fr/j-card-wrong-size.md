---
id: "j-card-wrong-size"
lang: "fr"
title: "Pourquoi ma J-card s’imprime-t-elle à la mauvaise taille ?"
description: "Ne redimensionnez pas le dessin avant d’avoir séparé erreur du fichier, échelle d’impression et pliage."
primaryKeyword: "Pourquoi ma J-card s’imprime-t-elle à la mauvaise taille ?"
secondaryKeywords: ["les dimensions du modèle","les deux formats","validation de l’insertion et de la lecture","Créer et imprimer une J-card à la bonne taille"]
searchIntent: "diagnosis"
answer: "Ne redimensionnez pas le dessin avant d’avoir séparé erreur du fichier, échelle d’impression et pliage. Une règle et un exemplaire raté suffisent souvent."
category: "covers"
image: "covers"
updated: "2026-11-01"
sources: [{"title": "Adobe Acrobat — impression à taille réelle", "url": "https://helpx.adobe.com/acrobat/desktop/print-documents/set-up-and-print-pdfs/page-size.html"}]
guideType: "troubleshooting"
related: ["print-j-card", "j-card-dimensions", "a4-letter-j-cards"]
prerequisites: ["print-j-card"]
next: ["print-j-card"]
---

## Mesurer d’abord

1. Ouvrez le PDF exporté, pas une capture. Consultez [les dimensions du modèle](../j-card-dimensions/) : MixtapeForge utilise 104,8 × 101,6 mm à plat.
2. Mesurez les deux côtés avant découpe. En impression directe, vérifiez aussi le repère de 50 mm.
3. Divisez mesure imprimée par mesure prévue. **Exemple fictif :** 48 mm au lieu de 50 indiquent 96 %. Une réduction semblable dans les deux directions suggère Ajuster/Réduire, pas un mauvais pli.
4. Réimprimez à Taille réelle/100 %, avec papier et orientation corrects. Supprimez aussi toute mise à l’échelle du pilote.

## Suivre le symptôme

- **Tout est trop petit :** corrigez l’échelle avant d’étirer le SVG.
- **Bonne taille, bord coupé :** vérifiez marges imprimables, position et format. A4 et Letter diffèrent : voir [les deux formats](../a4-letter-j-cards/).
- **Bonnes dimensions à plat, fermeture impossible :** vérifiez plis et épaisseur. Comparez un prototype sur papier ordinaire dans le même boîtier.
- **Texte manquant seulement :** cherchez noms tronqués ou problème de police dans le fichier exporté.

Gardez fichier et réglages après [validation de l’insertion et de la lecture](../print-j-card/).

**Résolu :** deux dimensions vérifiées, aucun bord coupé, plis corrects, fermeture sans pression.
