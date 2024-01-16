<h1 align="center">Kosmic</h1>

<p align="center">
  <img alt="Logo dell'App" src="assets/images/banner2.jpg" width="600" />
</p>

<p align="center">
  Benvenuto in Kosmic, l'app che ti guiderà attraverso il misterioso e affascinante mondo della notte, rivelando i luoghi dove le stelle brillano più intensamente. Affronta l'inquinamento luminoso esplorando le regioni a basso impatto luminoso sulla nostra mappa interattiva, progettata per connetterti con la bellezza del cielo notturno.
</p>

## ✨ Features

| Feature                                       | Descrizione                                                                                                                                                                                                                                                   |
| :-------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🌌 Esperienza Stellare                        | Kosmic ti offre un'esperienza senza precedenti sotto il manto di stelle. Scopri luoghi magici lontani dalle luci della città, dove il cielo notturno si svela in tutta la sua grandezza. Osserva costellazioni, pianeti e la Via Lattea come mai prima d'ora. |
| 🗺 Mappa dell'Inquinamento Luminoso            | Naviga attraverso la nostra mappa interattiva, che ti mostra i luoghi con il minor inquinamento luminoso. Trova le località ideali per osservare le stelle e immergiti in un'esperienza di osservazione astronomica senza distrazioni.                        |
| 🔍 Effettuare ricerche di luoghi              | La mappa dispone di una search bar per effettuare delle ricerche di un luogo specifico suggerendo eventuali risultati e mostrando il luogo ricercato nella mappa (per ora limitati alla regione Veneto).                                                      |
| ❤️ Aggiungere un luogo tra i luoghi preferiti | Scopri e salva nuovi luoghi esplorando la mappa. Pianifica le escursioni scegliendo tra i luoghi salvati quando la notte brilla e racconta le tua avventura.                                                                                                  |
| 🌠 Raggiungi le stelle                        | Non sai quando sarà il prossimo evento astronomico? Rimani aggiornato tramite la sezione "Eventi". Immergiti nella scoperta di come avvengono tali fenomeni leggendo le descrizioni di ciascuno.                                                              |
| 🌍 Contribuisci alla Scienza (COMING SOON...) | Partecipa alla nostra missione di preservare il cielo notturno. Scopri e aggiungi nuovi luoghi e racconta la tua esperienza con l'app contribuendo a una comunità globale di appassionati di astronomia e amanti della stelle.                                |

## 🚀 Requisiti di Sistema

Prima di iniziare, assicurati di avere installato quanto segue:

-   [Node.js](https://nodejs.org/) (versione consigliata: 20.x LTS)
-   [npm](https://www.npmjs.com/) (viene installato con Node.js)
-   [ExpoGo](https://expo.dev/client) (per testare l'app sul proprio dispositivo)

## 🔧 Installazione

1. **Clona il repository:**

    ```bash
    git clone https://github.com/NotFiliberto/Kosmic.git
    ```

2. **Naviga nella directory dell'app:**

    ```bash
    cd Kosmic
    ```

3. **Installare le dipendenze:**

    ```bash
    npm install
    ```

<!-- ## ⚙️ Configurazione

1. **Copia il file di configurazione dell'esempio:**

    ```bash
    cp .env.example .env
    ```

2. **Modifica il file `.env` aggiungendo la tua API key per Google Maps.**

    ```txt
    GOOGLE_MAPS_API_KEY='tua chiave'
    ``` -->

## 🚀 Avvio dell'App su Emulatore Android

1. **Avvia l'emulatore Android:**

    Assicurati che il tuo emulatore Android sia in esecuzione. (tramite Android Studio)

2. **Avvia l'app su Android:**

    ```bash
    npm run android
    ```

## 🚀 Avvio dell'App su Dispositivo Android (tramite Expo)

1. **Scarica ExpoGo sul tuo dispositivo:**

    https://expo.dev/client

2. **Avvia l'app da terminale:**

    ```bash
    npm run start
    ```

3. **Scanneriza il QR Code mostrato sul terminale**

    Scannerizzando il QR Code mostrato sul terminale tramite il tuo dispositivo, si aprirà tramite ExpoGo l'applicazione.

## 🛠️ Risoluzione dei Problemi

### **Problemi di cache**

Nel caso ci siano problemi di cache, avviare l' app tramite i metodoi sopra riportati e aggiugere l'opzione "-- --reset-cache". Esempio di avvio con dispositivo android:

    npm run android -- --reset-cache

## 📜 Licenza

Questo progetto è distribuito con licenza [Nome della Licenza]. Vedi il file `LICENSE` per ulteriori informazioni.
