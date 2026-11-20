# Nuovo sito Marciatori Calalzo – bozze grafiche

Quattro proposte grafiche, con i colori sociali, per rinnovare [marciatoricalalzo.org](https://www.marciatoricalalzo.org/)
(Gruppo Marciatori Calalzo – Atletica Cadore, A.S.D.), con una nuova sezione per
l'iscrizione online alle gare organizzate dalla società.

Il sito vero resta su Wix: queste pagine servono solo a mostrare l'idea e si
consultano tramite GitHub Pages.

| Cartella | Bozza | Idea |
|---|---|---|
| `bozza-1-pista/` | Pista | Anelli del logo come pista di atletica, pagina unica |
| `bozza-2-pagine/` | Pagine | Come la 1, ma a pagine separate come le voci del menu Wix |
| `bozza-3-divisa/` | Divisa | Verde chiaro delle divise dominante, prossima gara come pettorale |
| `bozza-4-bosco/` | Bosco | Versione scura, storia del club e archivio come linea del tempo |

`index.html` è la pagina di confronto da condividere.

## Vedere le bozze in locale

Sono file HTML statici, senza build:

```sh
python3 -m http.server 8000
# poi aprire http://localhost:8000
```

## Note

- I moduli di iscrizione sono dimostrativi: validano i campi ma non inviano dati.
- Il logo è provvisorio; date 2027 da confermare; i link ai risultati sono segnaposto.
- Foto e testi sono presi dal sito attuale della società. La foto di Calalzo dall'alto
  (`assets/img/calalzo-panorama.jpg`) è di Antonio De Lorenzo, Wikimedia Commons, CC BY 2.5.
