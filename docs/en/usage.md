---
title: Usage
description: Load tours with komoot-client, filter them, load coordinates and save them as JSON.
order: 20
slug: usage
section: Getting started
---

## Sign in and load tours

Signing in happens automatically on the first request. Credentials belong in environment variables, not in code:

```js
import Client from '@dasred/komoot-client';

const client = new Client({
    email:    process.env.KOMOOT_EMAIL,
    password: process.env.KOMOOT_PASSWORD,
});

const tours = await client.toursMade({});
console.log(`${tours.length} tours`);
```

> [!IMPORTANT]
> `toursMade()` always needs an object, even an empty one. Without an argument the call fails with a `TypeError`.

## Filter and sort

```js
const tours = await client.toursMade({
    sportTypes:    'touringbicycle',
    startDate:     '2026-01-01T00:00:00.000Z',
    sortDirection: 'desc',
});
```

- `sportTypes` is komoot's sport key, e.g. `touringbicycle`, `mtb`, `racebike` or `hike`.
- `startDate` ignores all tours before that point in time (ISO 8601).
- `sortDirection` is `asc` (oldest first, default) or `desc`.

The client loads the tours in pages of 50 until komoot returns no more. With many tours this takes a few seconds.

## Values of a tour

```js
const [tour] = await client.toursMade({sortDirection: 'desc'});

console.log(tour.name);
console.log(`${tour.distance.toFixed(1)} km in ${tour.duration.inMotion.toFixed(2)} h`);
console.log(`Ø ${tour.speed.inMotion.toFixed(1)} km/h, ${tour.elevation.up} m uphill`);
```

All fields with units are listed under [Options](options.md#tour).

## Load coordinates

The route is not part of the tour list; it is requested per tour. Pass the client for that:

```js
const coordinates = await tour.getCoordinates(client);

console.log(coordinates.length, 'points');
console.log(coordinates[0].lat, coordinates[0].lng, coordinates[0].alt);
```

The result is cached in the tour. A second call does not ask komoot again.

## Save as JSON

`Tour` and `Coordinate` have their own `toJSON()`. Dates become ISO strings, the route coordinates are not included:

```js
import fs from 'node:fs';

fs.writeFileSync('tours.json', JSON.stringify(tours, null, 4));
```

## Custom headers

`headers` adds further HTTP headers to every request, e.g. your own user agent:

```js
const client = new Client({
    email:    process.env.KOMOOT_EMAIL,
    password: process.env.KOMOOT_PASSWORD,
    headers:  {'User-Agent': 'my-app/1.0'},
});
```
