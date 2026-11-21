---
title: Optionen
description: Konstruktor, Methoden und alle Felder von Tour und Coordinate im komoot-client, mit Einheiten und Grenzen.
order: 30
slug: optionen
section: Referenz
---

## Exporte

```js
import Client from '@dasred/komoot-client';
import {Client, Tour, Coordinate} from '@dasred/komoot-client';
```

## Client

```js
new Client({email, password, headers})
```

| Name       | Typ      | Standard | Beschreibung                                   |
|------------|----------|----------|------------------------------------------------|
| `email`    | `string` | Pflicht  | E-Mail-Adresse des komoot-Kontos               |
| `password` | `string` | Pflicht  | Passwort des komoot-Kontos                     |
| `headers`  | `Object` | `{}`     | Zusätzliche HTTP-Header für jede Anfrage       |

### Methoden

| Methode                    | Rückgabe            | Beschreibung                                                     |
|----------------------------|---------------------|------------------------------------------------------------------|
| `toursMade(filter)`        | `Promise<Tour[]>`   | Alle aufgezeichneten Touren, gefiltert und sortiert              |
| `login()`                  | `Promise<boolean>`  | Meldet sich an. Wird von selbst aufgerufen, `true` bei Erfolg    |
| `fetch(url, parameters)`   | `Promise<Object>`   | Freie GET-Anfrage an die komoot-API mit Anmeldung, Antwort als JSON |

### Filter für `toursMade()`

| Name            | Typ      | Standard | Beschreibung                                         |
|-----------------|----------|----------|------------------------------------------------------|
| `sportTypes`    | `string` | alle     | Sport-Schlüssel von komoot, z. B. `touringbicycle`   |
| `startDate`     | `string` | alle     | Nur Touren ab diesem Zeitpunkt (ISO-8601)            |
| `sortDirection` | `string` | `asc`    | `asc` oder `desc`, sortiert nach Datum               |

## Tour

| Feld                 | Typ      | Einheit | Beschreibung                                          |
|----------------------|----------|---------|-------------------------------------------------------|
| `id`                 | `string` |         | ID der Tour bei komoot                                |
| `type`               | `string` |         | Art der Tour, hier immer `tour_recorded`              |
| `name`               | `string` |         | Name der Tour                                         |
| `status`             | `string` |         | Sichtbarkeit bei komoot, z. B. `private`              |
| `date`               | `Date`   |         | Startzeitpunkt                                        |
| `changedAt`          | `Date`   |         | Letzte Änderung bei komoot                            |
| `sport`              | `string` |         | Sport-Schlüssel                                       |
| `distance`           | `number` | km      | Strecke                                               |
| `duration.total`     | `number` | h       | Dauer mit Pausen                                      |
| `duration.inMotion`  | `number` | h       | Dauer in Bewegung (falls komoot sie nicht kennt: wie `total`) |
| `speed.total`        | `number` | km/h    | Durchschnitt mit Pausen                               |
| `speed.inMotion`     | `number` | km/h    | Durchschnitt in Bewegung                              |
| `elevation.up`       | `number` | m       | Höhenmeter bergauf                                    |
| `elevation.down`     | `number` | m       | Höhenmeter bergab                                     |
| `elevation.total`    | `number` | m       | `up` minus `down`                                     |
| `kcal.active`        | `number` | kcal    | Aktiver Kalorienverbrauch laut komoot                 |
| `kcal.resting`       | `number` | kcal    | Grundumsatz laut komoot                               |
| `startPoint`         | `Coordinate` |     | Startpunkt                                            |

| Methode                   | Rückgabe                | Beschreibung                                         |
|---------------------------|-------------------------|------------------------------------------------------|
| `getCoordinates(client)`  | `Promise<Coordinate[]>` | Lädt die Strecke einmal und speichert sie zwischen   |
| `toJSON()`                | `Object`                | Alle Felder oben, Datum als ISO-String, ohne Strecke |

## Coordinate

| Feld   | Typ      | Einheit | Beschreibung                                         |
|--------|----------|---------|------------------------------------------------------|
| `lat`  | `number` | Grad    | Breitengrad                                          |
| `lng`  | `number` | Grad    | Längengrad                                           |
| `alt`  | `number` | m       | Höhe                                                 |
| `time` | `number` |         | Zeitwert `t` von komoot, nur bei Punkten der Strecke |

## Einschränkungen

- **Nur aufgezeichnete Touren.** Geplante Touren lädt der Client nicht.
- **Fehler beim Anmelden** werden nur geloggt. Die folgende Abfrage schlägt dann mit „Invalid response code 401“ fehl.
- **Fehler werden immer mit `console.error` ausgegeben**, bevor sie weitergeworfen werden. Fängst du sie selbst ab,
  erscheinen sie trotzdem auf der Konsole.
- **Inoffizielle API**, siehe [Überblick](index.md).
