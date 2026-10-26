import json,re
from pathlib import Path
source=json.load(open('src/locales/source.json'))
manual={
'Lingua':['Language','Idioma','Langue'],
'Usa questo slot per gli effetti audio. La codifica NR si imposta in Nastro e NR. I plugin sono programmi esterni: carica solo quelli che conosci.':['Use this slot for audio effects. Set NR encoding in Tape and NR. Plugins are external programs: only load plugins you trust.','Usa esta ranura para efectos de audio. Configura la codificación NR en Cinta y NR. Los plugins son programas externos: carga solo los que conoces.','Utilisez cet emplacement pour les effets audio. Réglez l’encodage NR dans Bande et NR. Les plugins sont des programmes externes : ne chargez que ceux auxquels vous faites confiance.'],

'Libera master temporanei':['Clear temporary masters','Eliminar másteres temporales','Effacer les masters temporaires'],

'Tema chiaro':['Light theme','Tema claro','Thème clair'],
'Tema scuro':['Dark theme','Tema oscuro','Thème sombre'],
'Distribuisci':['Fit sides','Ajustar caras','Répartir les faces'],
'Ripeti':['Redo','Rehacer','Rétablir'],

'PAUSA':['PAUSED','EN PAUSA','PAUSE'],
'Sposta sul lato {0}':['Move to side {0}','Mover a la cara {0}','Déplacer vers la face {0}'],
'IBM Plex Mono · Tecnico':['IBM Plex Mono · Technical','IBM Plex Mono · Técnico','IBM Plex Mono · Technique'],
'Courier Prime · Dattiloscritto':['Courier Prime · Typewriter','Courier Prime · Máquina de escribir','Courier Prime · Machine à écrire'],

'Aspetto':['Appearance','Apariencia','Apparence'],
'Chiaro':['Light','Claro','Clair'],
'Aggiorna':['Refresh','Actualizar','Actualiser'],
'ELABORAZIONE':['PROCESSING','PROCESANDO','TRAITEMENT'],
'PRONTO':['READY','LISTO','PRÊT'],
'FERMO':['STOPPED','DETENIDO','ARRÊTÉ'],
'USCITA':['OUTPUT','SALIDA','SORTIE'],
'INGRESSO':['INPUT','ENTRADA','ENTRÉE'],
'RITARDO':['DELAY','RETARDO','DÉLAI'],
'CORRELAZIONE':['CORRELATION','CORRELACIÓN','CORRÉLATION'],
'Sposta sopra':['Move up','Mover arriba','Monter'],
'Sposta sotto':['Move down','Mover abajo','Descendre'],
'Modifica brano':['Edit track','Editar pista','Modifier la piste'],
'Rimuovi dalla mixtape':['Remove from mixtape','Quitar de la mixtape','Retirer de la mixtape'],
'Esporta log':['Export log','Exportar registro','Exporter le journal'],
'Avanzamento del lato':['Playback position','Posición de reproducción','Position de lecture'],
'Frequenza progetto':['Project sample rate','Frecuencia de muestreo del proyecto','Fréquence d’échantillonnage du projet'],
'Ripeti modifica':['Redo change','Rehacer cambio','Rétablir la modification'],
'Annulla modifica':['Undo change','Deshacer cambio','Annuler la modification'],

'Piastra':['Cassette deck','Pletina','Platine cassette'],
'Ascolta':['Play','Reproducir','Lire'],
'Copertina':['Cover','Carátula','Pochette'],
'Acquisisci il riascolto':['Capture playback','Capturar la reproducción','Capturer la lecture'],
'Registra la prova sul nastro':['Record the test onto tape','Graba la prueba en la cinta','Enregistrer le test sur la bande'],
'Registra la prova':['Record the test','Grabar la prueba','Enregistrer le test'],
'Brano precedente':['Previous track','Pista anterior','Piste précédente'],
'Brano successivo':['Next track','Pista siguiente','Piste suivante'],
'Font del titolo':['Title font','Fuente del título','Police du titre'],
'Posizione nel lato':['Position on this side','Posición en la cara','Position sur cette face'],
'Brano precedente / successivo':['Previous / next track','Pista anterior / siguiente','Piste précédente / suivante'],
'Fondo iniziale':['Initial noise floor','Ruido de fondo inicial','Bruit de fond initial'],
'Fondo finale':['Final noise floor','Ruido de fondo final','Bruit de fond final'],
'Fondo stabile':['Stable noise floor','Ruido de fondo estable','Bruit de fond stable'],
'Fondo variabile':['Variable noise floor','Ruido de fondo variable','Bruit de fond variable'],
'LATO {0}':['SIDE {0}','CARA {0}','FACE {0}'],
'LATO A / {0} BRANI':['SIDE A / {0} TRACKS','CARA A / {0} PISTAS','FACE A / {0} PISTES'],
'LATO B / {0} BRANI':['SIDE B / {0} TRACKS','CARA B / {0} PISTAS','FACE B / {0} PISTES'],
'Nessun brano':['No tracks','Sin pistas','Aucune piste'],
'Vai al contenuto':['Skip to content','Ir al contenido','Aller au contenu'],
'50 mm · stampa al 100%':['50 mm · print at 100%','50 mm · imprimir al 100%','50 mm · imprimer à 100 %'],
'Copertina di {0}: anteprima di stampa':['Cover for {0}: print preview','Carátula de {0}: vista previa de impresión','Pochette de {0} : aperçu avant impression'],
'Il progetto è stato modificato da un’altra istanza. Riaprilo oppure salva con un altro nome.':['This project was changed by another instance. Reopen it or save under a different name.','Otra instancia ha modificado el proyecto. Ábrelo de nuevo o guárdalo con otro nombre.','Une autre instance a modifié ce projet. Rouvrez-le ou enregistrez-le sous un autre nom.'],
'Dettagli della prova · facoltativi':['Test details · optional','Detalles de la prueba · opcionales','Détails du test · facultatifs'],
'Nome profilo · obbligatorio':['Profile name · required','Nombre del perfil · obligatorio','Nom du profil · obligatoire'],
'Marcatore':['Sync marker','Marcador de sincronización','Marqueur de synchronisation'],
'iniziale':['start','inicial','initial'],
'finale':['end','final','final'],
'solo sinistro':['left only','solo izquierdo','gauche uniquement'],
'solo destro':['right only','solo derecho','droite uniquement'],
}
# Keep identifiers, proper names and DSP units intact.
protected=['MixtapeForge','mixtapeforge','MIXTAPEFORGE','STEREO PLAYER','NR TYPE B','PLAYBACK: DOLBY B','Type B · libdolbyb','Hz','dB','dBFS','dBTP','ms','RMS','PEAK · dBFS','VU REL. · 300 ms','Barlow · Studio','Barlow Bold · Pop','Barlow Condensed · Rock','Bebas Neue · Poster']
for index,lang in enumerate(['en','es','fr']):
 path=Path(f'src/locales/{lang}.json');d=json.loads(path.read_text())
 for key,value in list(d.items()):
  replacements={'en':[(r'\bPlate\b','Cassette deck'),(r'\bplate\b','deck'),(r'\bplaten\b','deck'),(r'\bproof\b','test'),(r'\bevidence\b','test'),(r'\bsongs\b','tracks'),(r'\bsong\b','track')],'es':[(r'\bPlato\b','Pletina'),(r'\bplato\b','pletina'),(r'\bevidencia\b','prueba')],'fr':[(r'\bPlaque\b','Platine'),(r'\bplaque\b','platine'),(r'\bpreuves\b','test'),(r'\bpreuve\b','test')]}[lang]
  for pattern,target in replacements:value=re.sub(pattern,target,value)
  if 'uscit' in key.lower() and lang=='en':value=re.sub(r'\b[Ee]xit\b',lambda m:'Output' if m[0][0].isupper() else 'output',value)
  if 'ingress' in key.lower() and lang=='en':value=re.sub(r'\b[Ee]ntry\b',lambda m:'Input' if m[0][0].isupper() else 'input',value)
  if 'master' in key.lower() and lang=='fr':value=re.sub(r'\bmaître\b','master',value)
  if 'lato' in key.lower() and lang=='fr':value=re.sub(r'\b[Cc]ôté\b',lambda m:'Face' if m[0][0].isupper() else 'face',value)
  d[key]=value
 for key,values in manual.items():d[key]=values[index]
 for key in protected:
  if key in source:d[key]=key
 missing=[key for key in source if key not in d]
 if missing:raise SystemExit(f'{lang}: Missing: {missing}')
 d={key:d[key] for key in source}
 for key,value in d.items():
  if sorted(re.findall(r'\{\d+\}',key))!=sorted(re.findall(r'\{\d+\}',value)):raise SystemExit(f'Bad placeholders: {key}')
 path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
 print(lang,len(d),'reviewed',len(manual),'terminology overrides')
