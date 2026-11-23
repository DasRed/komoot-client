---
title: Verwendung
description: Mit komoot-client anmelden, Touren laden, filtern und sortieren, Werte einer Tour lesen, Koordinaten nachladen, als JSON speichern und eigene Header setzen.
order: 20
slug: verwendung
section: Einstieg
---

## Anmelden und Touren laden

Die Anmeldung passiert automatisch bei der ersten Abfrage. Zugangsdaten gehören in Umgebungsvariablen, nicht in den
Code:

```js
import Client from '@dasred/komoot-client';

const client = new Client({
    email:    process.env.KOMOOT_EMAIL,
    password: process.env.KOMOOT_PASSWORD,
});

const tours = await client.toursMade({});
console.log(`${tours.length} Touren`);
```

> [!IMPORTANT]
> `toursMade()` braucht immer ein Objekt, auch ein leeres. Ohne Argument bricht der Aufruf mit einem `TypeError` ab.

## Filtern und sortieren

```js
const tours = await client.toursMade({
    sportTypes:    'touringbicycle',
    startDate:     '2026-01-01T00:00:00.000Z',
    sortDirection: 'desc',
});
```

- `sportTypes` ist der Sport-Schlüssel von komoot, etwa `touringbicycle`, `mtb`, `racebike` oder `hike`.
- `startDate` ignoriert alle Touren vor diesem Zeitpunkt (ISO-8601).
- `sortDirection` ist `asc` (älteste zuerst, Standard) oder `desc`.

Der Client lädt die Touren seitenweise zu je 50, bis komoot keine mehr liefert. Bei vielen Touren dauert das ein paar
Sekunden.

## Werte einer Tour

```js
const [tour] = await client.toursMade({sortDirection: 'desc'});

console.log(tour.name);
console.log(`${tour.distance.toFixed(1)} km in ${tour.duration.inMotion.toFixed(2)} h`);
console.log(`Ø ${tour.speed.inMotion.toFixed(1)} km/h, ${tour.elevation.up} m bergauf`);
```

Alle Felder mit Einheiten stehen unter [Optionen](options.md#tour).

## Koordinaten nachladen

Die Strecke steckt nicht in der Tourliste, sie wird je Tour eigens abgefragt. Dafür übergibst du den Client:

```js
const coordinates = await tour.getCoordinates(client);

console.log(coordinates.length, 'Punkte');
console.log(coordinates[0].lat, coordinates[0].lng, coordinates[0].alt);
```

Das Ergebnis wird in der Tour zwischengespeichert. Ein zweiter Aufruf fragt komoot nicht noch einmal.

## Als JSON speichern

`Tour` und `Coordinate` haben ein eigenes `toJSON()`. Datumswerte werden zu ISO-Strings, die Koordinaten der Strecke
sind nicht enthalten:

```js
import fs from 'node:fs';

fs.writeFileSync('tours.json', JSON.stringify(tours, null, 4));
```

## Eigene Header

Mit `headers` hängst du jeder Anfrage weitere HTTP-Header an, zum Beispiel einen eigenen User-Agent:

```js
const client = new Client({
    email:    process.env.KOMOOT_EMAIL,
    password: process.env.KOMOOT_PASSWORD,
    headers:  {'User-Agent': 'meine-app/1.0'},
});
```
