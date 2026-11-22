# komoot-client

Small Node.js client that signs in to komoot and returns your recorded tours, including the route, as objects.

Documentation: https://www.marco-starker.de/en/projects/komoot-client/docs
(Deutsch: https://www.marco-starker.de/de/projekte/komoot-client/doku)

> [!WARNING]
> komoot has no official API for this. The client uses the internal API of the komoot app, which can change at any
> time. Only use it for your own account.

## Quick start

Requires Node.js 22.6 or later.

```bash
npm i github:DasRed/komoot-client#semver:^1.5.0
```

```js
import Client from '@dasred/komoot-client';

const client = new Client({email: process.env.KOMOOT_EMAIL, password: process.env.KOMOOT_PASSWORD});
const tours  = await client.toursMade({sportTypes: 'touringbicycle'});

for (const tour of tours) {
    console.log(tour.name, tour.distance.toFixed(1), 'km');
}
```

## License

[MIT](LICENSE)
