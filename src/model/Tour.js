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
        this.speed      = {
            total:    this.distance / this.duration.total,
            inMotion: this.distance / this.duration.inMotion,
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

    toJSON() {
        return {
            id:         this.id,
            type:       this.type,
            name:       this.name,
            status:     this.status,
            date:       this.date.toJSON(),
            kcal:       {...this.kcal},
            startPoint: this.startPoint.toJSON(),
            distance:   this.distance,
            duration:   {...this.duration},
            speed:      {...this.speed},
            elevation:  {...this.elevation},
            sport:      this.sport,
            changedAt:  this.changedAt.toJSON(),
        };
    }
}