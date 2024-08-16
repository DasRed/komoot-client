export default class Coordinate {
    constructor(data) {
        this.lat  = data.lat;
        this.lng  = data.lng;
        this.alt  = data.alt;
        this.time = data.t;
    }

    toJSON() {
        const result = {
            lat: this.lat,
            lng: this.lng,
            alt: this.alt,
        };

        if (this.time !== undefined) {
            result.time = this.time;
        }

        return result;
    }
}