# MusicPlayer
Questo music player, sviluppato per un progetto di Tecnologie Web dell'università di Bologna, supporta la riproduzione tracce prese dalla cartella `Example` e di cui ne vengono date le specifiche all'interno del file `main.js` nell'apposito array

## Pages
Link per visionare la pagina da github pages:
```sh
    https://andrea9111.github.io/MusicPlayer/music.html
```

## Funzioni principali
Innanzi tutto, per farlo partire la prima volta premere il tasto per la traccia successiva/precedente; la palette dei comandi è interamente creata con icone del framework bootstrap, e di seguito ne verrà esposto il funzionamento:

### Play/Stop
Il tasto principale (al centro della palette) è gestito da un listener che cambia appositamente l'icona e mette il brano in play/pause

### Random track
L'icona sulla destra se selezionata e attiva, oltre che diventere di colore verde, rende la scelta del brano successivo casuale

### Repeat
L'icona sulla sinistra permette di ripetere all'infinito il brano corrente

### Next/prev
I classici pulsanti dei brani next e prev sono gestiti con uno stack per andare a prendere il brano precedente anche in caso siano scelti random; in caso di next fa semplicemente un push nello stack

