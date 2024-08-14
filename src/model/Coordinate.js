export default class Coordinate {
    constructor(data) {
        this.lat  = data.lat;
        this.lng  = data.lng;
        this.alt  = data.alt;
        this.time = data.t;
    }
}