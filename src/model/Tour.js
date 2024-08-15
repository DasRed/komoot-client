import Coordinate from './Coordinate.js';

export default class Tour {
    #coordinates;
    #coordinatesUrl;

    constructor(data) {
        this.id         = data.id;
        this.type       = data.type;
        this.name       = data.name;
        this.status     = data.status;
        this.date       = new Date(data.date);
        this.kcal       = {active: data.kcal_active, resting: data.kcal_resting};
        this.startPoint = new Coordinate(data.start_point);
        this.distance   = data.distance / 1000;
        this.duration   = {
            total:    data.duration / 60 / 60,
            inMotion: (data.time_in_motion ?? data.duration) / 60 / 60,
        };
        this.elevation  = {
            up:    data.elevation_up,
            down:  data.elevation_down,
            total: data.elevation_up - data.elevation_down
        };
        this.sport      = data.sport;
        this.changedAt  = new Date(data.changed_at);

        this.#coordinatesUrl = data._links.coordinates.href;
    }

    async getCoordinates(client) {
        if (this.#coordinates === undefined) {
            const data        = await client.fetch(this.#coordinatesUrl);
            this.#coordinates = data.items.map((item) => new Coordinate(item));
        }

        return this.#coordinates;
    }
}