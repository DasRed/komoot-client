---
title: Options
description: Constructor, methods and all fields of Tour and Coordinate in komoot-client, with units and limitations.
order: 30
slug: options
section: Reference
---

## Exports

```js
import Client from '@dasred/komoot-client';
import {Client, Tour, Coordinate} from '@dasred/komoot-client';
```

## Client

```js
new Client({email, password, headers})
```

| Name       | Type     | Default  | Description                                 |
|------------|----------|----------|---------------------------------------------|
| `email`    | `string` | required | Email address of the komoot account         |
| `password` | `string` | required | Password of the komoot account              |
| `headers`  | `Object` | `{}`     | Additional HTTP headers for every request   |

### Methods

| Method                   | Returns            | Description                                                    |
|--------------------------|--------------------|----------------------------------------------------------------|
| `toursMade(filter)`      | `Promise<Tour[]>`  | All recorded tours, filtered and sorted                        |
| `login()`                | `Promise<boolean>` | Signs in. Called automatically, `true` on success              |
| `fetch(url, parameters)` | `Promise<Object>`  | Free GET request to the komoot API with sign-in, JSON response |

### Filter for `toursMade()`

| Name            | Type     | Default | Description                                       |
|-----------------|----------|---------|---------------------------------------------------|
| `sportTypes`    | `string` | all     | komoot sport key, e.g. `touringbicycle`           |
| `startDate`     | `string` | all     | Only tours from this point in time (ISO 8601)     |
| `sortDirection` | `string` | `asc`   | `asc` or `desc`, sorted by date                   |

## Tour

| Field               | Type         | Unit | Description                                            |
|---------------------|--------------|------|--------------------------------------------------------|
| `id`                | `string`     |      | ID of the tour at komoot                               |
| `type`              | `string`     |      | Kind of tour, always `tour_recorded` here              |
| `name`              | `string`     |      | Name of the tour                                       |
| `status`            | `string`     |      | Visibility at komoot, e.g. `private`                   |
| `date`              | `Date`       |      | Start time                                             |
| `changedAt`         | `Date`       |      | Last change at komoot                                  |
| `sport`             | `string`     |      | Sport key                                              |
| `distance`          | `number`     | km   | Distance                                               |
| `duration.total`    | `number`     | h    | Duration including breaks                              |
| `duration.inMotion` | `number`     | h    | Duration in motion (same as `total` if komoot lacks it) |
| `speed.total`       | `number`     | km/h | Average including breaks                               |
| `speed.inMotion`    | `number`     | km/h | Average in motion                                      |
| `elevation.up`      | `number`     | m    | Elevation gain                                         |
| `elevation.down`    | `number`     | m    | Elevation loss                                         |
| `elevation.total`   | `number`     | m    | `up` minus `down`                                      |
| `kcal.active`       | `number`     | kcal | Active calories according to komoot                    |
| `kcal.resting`      | `number`     | kcal | Resting calories according to komoot                   |
| `startPoint`        | `Coordinate` |      | Start point                                            |

| Method                   | Returns                 | Description                                         |
|--------------------------|-------------------------|-----------------------------------------------------|
| `getCoordinates(client)` | `Promise<Coordinate[]>` | Loads the route once and caches it                  |
| `toJSON()`               | `Object`                | All fields above, dates as ISO strings, no route    |

## Coordinate

| Field  | Type     | Unit    | Description                                      |
|--------|----------|---------|--------------------------------------------------|
| `lat`  | `number` | degrees | Latitude                                         |
| `lng`  | `number` | degrees | Longitude                                        |
| `alt`  | `number` | m       | Altitude                                         |
| `time` | `number` |         | komoot's time value `t`, only for route points   |

## Limitations

- **Recorded tours only.** The client does not load planned tours.
- **Sign-in errors** are only logged. The following request then fails with "Invalid response code 401".
- **Errors are always printed with `console.error`** before being rethrown. Even if you catch them yourself, they
  still show up on the console.
- **Unofficial API**, see [Overview](index.md).
