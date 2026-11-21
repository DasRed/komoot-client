---
title: Overview
description: Small Node.js client that signs in to komoot and returns your recorded tours, including the route, as objects.
order: 0
section: Getting started
---

komoot offers no official API for your own tours. `@dasred/komoot-client` signs in with your komoot account, fetches
your recorded tours and returns them as `Tour` objects with converted values: distance in kilometres, duration in
hours, speed in km/h.

## Quick example

```js
import Client from '@dasred/komoot-client';

const client = new Client({email: 'you@example.com', password: 'secret'});
const tours  = await client.toursMade({sportTypes: 'touringbicycle'});

for (const tour of tours) {
    console.log(tour.name, tour.distance.toFixed(1), 'km');
}
```

## What the client does

- Signs in with email and password and keeps the credentials for further requests.
- Loads all recorded tours, filtered by sport and start date, sorted by date.
- Loads the route coordinates per tour on demand.
- Serializes tours and coordinates with `JSON.stringify`.

> [!WARNING]
> The client uses the internal API the komoot app uses as well. komoot can change it at any time, and the client will
> stop working. Only use it for your own account.

## Status

Version 1.5.0 from 2024. It is the foundation of komoot2csv and komoot2mqtt.

## Related projects

- [komoot2csv](https://www.marco-starker.de/en/projects/komoot2csv): writes your tours into a CSV file.
- [komoot2mqtt](https://www.marco-starker.de/en/projects/komoot2mqtt): sends statistics of your tours to Home Assistant
  via MQTT.
