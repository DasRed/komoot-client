---
title: Überblick
description: Kleiner Node.js-Client, der sich bei komoot anmeldet und deine aufgezeichneten Touren samt Strecke als Objekte liefert. Kurzbeispiel, Funktionen und Status.
order: 0
section: Einstieg
---

komoot bietet keine offizielle API für die eigenen Touren. `@dasred/komoot-client` meldet sich mit deinem
komoot-Konto an, holt deine aufgezeichneten Touren und gibt sie als `Tour`-Objekte mit umgerechneten Werten zurück:
Strecke in Kilometern, Dauer in Stunden, Geschwindigkeit in km/h.

## Kurzbeispiel

```js
import Client from '@dasred/komoot-client';

const client = new Client({email: 'du@example.com', password: 'geheim'});
const tours  = await client.toursMade({sportTypes: 'touringbicycle'});

for (const tour of tours) {
    console.log(tour.name, tour.distance.toFixed(1), 'km');
}
```

## Was der Client kann

- Anmeldung mit E-Mail und Passwort, die Zugangsdaten für weitere Abfragen merkt er sich.
- Alle aufgezeichneten Touren laden, gefiltert nach Sportart und Startdatum, sortiert nach Datum.
- Je Tour die Koordinaten der Strecke nachladen.
- Touren und Koordinaten mit `JSON.stringify` serialisieren.

> [!WARNING]
> Der Client nutzt die interne API, die auch die komoot-App verwendet. komoot kann sie jederzeit ändern, dann hört der
> Client auf zu funktionieren. Nutze ihn nur für dein eigenes Konto.

## Status

Version 1.5.0 von 2024. Er läuft als Grundlage von komoot2csv und komoot2mqtt.

## Verwandte Projekte

- [komoot2csv](https://www.marco-starker.de/de/projekte/komoot2csv): schreibt deine Touren in eine CSV-Datei.
- [komoot2mqtt](https://www.marco-starker.de/de/projekte/komoot2mqtt): schickt Statistiken deiner Touren per MQTT an
  Home Assistant.
