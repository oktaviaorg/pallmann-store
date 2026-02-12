import csv
import re

# Données brutes - format: ref,designation,prix_achat,qte,unite (prix donné pour la qté indiquée)
raw_data = """
012621,750 X 200 corindon gr 16/10p,61.04,10,UN
012622,750 X 200 corindon gr 24/10p,51.94,10,UN
012624,750 X 200 corindon gr 36/10p,47.39,10,UN
012625,750 X 200 corindon gr 40/10p,45.57,10,UN
012627,750 X 200 corindon gr 60/10p,43.68,10,UN
012628,750 X 200 corindon gr 80/10p,39.00,10,UN
012629,750 X 200 corindon gr100/10p,38.25,10,UN
012630,750 X 200 corindon gr120/10p,38.25,10,UN
011478,750 X 200 zirconium gr 24/10p,74.85,10,UN
011479,750 X 200 zirconium gr 36/10p,66.85,10,UN
011480,750 X 200 zirconium gr 40/10p,59.80,10,UN
011481,750 X 200 zirconium gr 60/10p,57.36,10,UN
011482,750 X 200 zirconium gr 80/10p,54.70,10,UN
011483,750 X 200 zirconium gr 100/10p,54.70,10,UN
014184,Adhésif de traçage 25mm x 50 m,9.04,1,UN
088622,ALL BASE EXTRA 5L,54.40,5,L
039948,ALLKITT 5L,45.00,5,L
059960,B11 couteau à colle,4.88,1,UN
061482,B3 couteau à colle,4.88,1,UN
012510,BALAI APPLICATEUR + PEAU DE MOUTON,35.07,1,UN
053295,CLEAN 0.75L,7.74,1,UN
182486,CLEAN 5L,31.70,5,L
010366,CLEAN STRONG 0.75L,12.22,1,UN
182484,CLEAN STRONG 5L,60.20,5,L
084260,COLOR COLLECTION coffret 2.0,609.90,1,UN
081783,DEGRISEUR 2L,15.16,2,L
086314,ECO OIL CARE 0.75L,17.64,1,UN
086117,ECO OIL CARE 5L,81.90,5,L
013814,ETUI pour rouleau 250mm,12.06,1,UN
053297,FINISH CARE 0.75L,13.27,1,UN
012452,FINISH CARE 5L,64.75,5,L
053300,FINISH CARE mat 0.75L,14.98,1,UN
076843,FINISH CARE MAT 5L,73.50,5,L
012461,FINISH CARE STOP 0.75L,13.55,1,UN
182485,FINISH CARE STOP 5L,66.35,5,L
080735,HARDWAXOIL 3L,62.49,3,L
082958,IS 90 satiné P.U. solvant 1K 5L,64.90,5,L
011666,JOINT A PARQUET chêne clair/12p,125.00,20,UN
041126,JOINT A PARQUET chêne foncé/12p,125.00,20,UN
011669,JOINT A PARQUET frêne/bouleau/épicéa/12p,125.00,20,UN
011665,JOINT A PARQUET hêtre nat/érable can/12p,125.00,20,UN
011667,JOINT A PARQUET hêtre traité/ceris./12p,125.00,20,UN
011668,JOINT A PARQUET wengé/12p,125.00,20,UN
055890,LANGUETTE caoutchouc pour magic oil,21.26,1,UN
068018,MAGIC OIL 2K ERGO monocouche 1L,66.78,1,L
055895,MAGIC OIL 2K ERGO monocouche 2.75L,176.08,2.75,L
021283,MAGIC OIL 2K Original 1L,61.43,1,L
021284,MAGIC OIL 2K Original 2.75L,161.51,2.75,L
175506,MAGIC OIL 2K PURE 1 L,74.25,1,L
055898,MAGIC OIL 2K SPA 1L,79.63,1,L
159671,MAGIC OIL 2K WHITE monocouche 1L,74.25,1,L
055905,MAGIC OIL CARE 0.75L,25.55,1,UN
034053,MAGIC OIL CARE 5L,124.10,5,L
162390,MAGIC OIL CARE WHITE 0.75L,26.99,1,UN
125420,MAGIC OIL CHANGE 1K 1l,35.75,1,L
158420,MAGIC OIL CHANGE 2K 1l,73.45,1,L
084923,MAGIC OIL EASY Huile-cire mono 1L,30.10,1,L
079521,MAGIC OIL EASY Huile-cire mono 3L,73.65,3,L
184886,MONTURE pour manchon softTouch 250mm,5.14,1,UN
021193,MONTURE pour rouleau sport color,2.37,1,UN
081079,OUTDOOR OIL 1K bankirai 3L,45.54,3,L
185862,OUTDOOR OIL 1K miel 10L,113.50,10,L
179338,OUTDOOR OIL 1K miel 3L,45.54,3,L
159652,OUTDOOR OIL 1K naturel 10L,113.50,10,L
081077,OUTDOOR OIL 1K naturel 3L,45.54,3,L
081081,OUTDOOR OIL 1K teck 3L,45.54,3,L
014289,PALL-X 320 fond dur neutre 5L,57.50,5,L
013952,PALL-X 325 1L,18.58,1,L
013267,PALL-X 325 fond dur neutre garnissant 5L,77.40,5,L
159665,PALL-X 330 PURE fond dur brut 5L,65.25,5,L
068044,PALL-X 333 original 1L,53.38,1,L
088921,PALL-X 333 test NEUTRE 0.1L,12.68,1,UN
060022,PALL-X 350 2K 1L,71.58,1,L
040983,PALL-X 94 mat 5L,69.00,5,L
013269,PALL-X 94 satiné 5L,69.00,5,L
013697,PALL-X 96 mat 5L,100.25,5,L
013271,PALL-X 96 ORIGINAL satiné 5L,100.25,5,L
181845,PALL-X 96 POWER mat 5 L,110.25,5,L
181844,PALL-X 96 POWER SATINÉ 5 L,110.25,5,L
013953,PALL-X 96 satiné 1L,21.05,1,L
169408,PALL-X 96 ZERO mat 5L,112.90,5,L
171590,PALL-X 96 ZERO satiné 5L,112.90,5,L
010100,PALL-X 98 2K brillant 4.95L,134.89,4.95,L
010094,PALL-X 98 2K mat 4.95L,134.89,4.95,L
010093,PALL-X 98 2K satiné 4.95L,134.89,4.95,L
172175,PALL-X BASE 5 L,50.50,5,L
188731,PALL-X DUET 2K mat 10 l,165.00,10,L
186521,PALL-X DUET 2K satiné 10 l,165.00,10,L
087764,PALL-X EXTREME HAUT SATIN K1/5L,76.15,5,L
069378,PALL-X EXTREME K.B. Durcisseur 0.5 L,14.00,1,UN
069379,PALL-X EXTREME mat K.A./5L,76.15,5,L
087368,PALL-X EXTREME satiné K1/1L,16.30,1,L
069377,PALL-X EXTREME satiné K1/5L,76.15,5,L
162032,PALL-X FILLER liant pour joint large 5L,61.15,5,L
086268,PALL-X FUTUR mat 5L,69.15,5,L
086375,PALL-X FUTUR satiné 5L,69.15,5,L
012570,PALL-X GEL/1L spatulable après egrennage,23.38,1,L
082319,PALL-X GRIP 75gr,9.36,1,UN
013085,PALL-X KITT 1 L,12.10,1,L
012732,PALL-X KITT 5L,50.50,5,L
010108,PALL-X PURE 4.95L,114.25,4.95,L
184797,PALL-X RETARDER 250 ml,9.45,1,UN
010103,PALL-X SPORT 2K satiné 4.95L,116.08,4.95,L
089453,PALL-X TREND 2K mat 4.95 L,92.57,4.95,L
083529,PALL-X TREND 2K satiné 4.95L,92.57,4.95,L
073699,PALL-X ZERO 2K mat intense 10L,289.50,10,L
073172,PALL-X ZERO BASE fond dur 5L,84.65,5,L
073173,PALL-X ZERO FILLER liant 5L,70.25,5,L
"""

rows = []
for line in raw_data.strip().split('\n'):
    if not line.strip():
        continue
    parts = line.split(',')
    if len(parts) >= 5:
        ref = parts[0].strip()
        designation = parts[1].strip()
        prix_achat = float(parts[2].strip())
        qte = float(parts[3].strip())
        unite = parts[4].strip()
        
        # Prix achat = prix donné (déjà pour le conditionnement)
        prix_achat_total = prix_achat
        
        # Prix vente HT = x2
        prix_vente_ht = prix_achat_total * 2
        
        # TVA 20%
        tva = prix_vente_ht * 0.20
        prix_vente_ttc = prix_vente_ht + tva
        
        conditionnement = f"{int(qte) if qte == int(qte) else qte} {unite}"
        
        rows.append({
            'ref': ref,
            'designation': designation,
            'conditionnement': conditionnement,
            'prix_achat_ht': round(prix_achat_total, 2),
            'prix_vente_ht': round(prix_vente_ht, 2),
            'tva_20_pct': round(tva, 2),
            'prix_vente_ttc': round(prix_vente_ttc, 2)
        })

# Écrire le CSV
with open('/home/moltbotv2/clawd/projects/pallmann-store/data/prix_pallmann.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['ref', 'designation', 'conditionnement', 'prix_achat_ht', 'prix_vente_ht', 'tva_20_pct', 'prix_vente_ttc'])
    writer.writeheader()
    writer.writerows(rows)

print(f"✅ CSV créé avec {len(rows)} produits")
print("\nAperçu (5 premiers):")
for r in rows[:5]:
    print(f"  {r['designation'][:35]} | {r['conditionnement']} | Achat: {r['prix_achat_ht']}€ | Vente HT: {r['prix_vente_ht']}€ | TTC: {r['prix_vente_ttc']}€")
