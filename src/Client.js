import Tour from './model/Tour.js';

export default class Client {
    static URL = {
        LOGIN:      'https://api.komoot.de/v006/account/email/{email}/',
        TOURS_MADE: 'https://api.komoot.de/v007/users/{authUserId}/tours/?sort_types=&type=tour_recorded&sort_field=date&sort_direction={sortDirection}&name=&status=private&hl=de&page={page}&limit=50',
    }

    constructor({email, password, headers = {}}) {
        this.email    = email;
        this.password = password;
        this.headers  = {
            ...headers
        };
    }

    async fetch(url, parameters = {}, authorization = null) {
        try {
            if (authorization === null) {
                await this.login();
                authorization = btoa(`${this.authUserId}:${this.authPassword}`);
            }

            const response = await fetch(this.prepareUrl(url, parameters), {
                method:  'GET',
                headers: {
                    'Authorization': `Basic ${authorization}`,
                    ...this.headers,
                }
            });

            if (!response.ok) {
                throw new Error(`Invalid response code ${response.status}. ${await response.text()}`);
            }

            return await response.json();
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    async login() {
        if (this.authUserId !== undefined) {
            return true;
        }

        try {
            const data = await this.fetch(Client.URL.LOGIN, {}, btoa(`${this.email}:${this.password}`));

            this.authUserId   = data.username;
            this.authPassword = data.password;
        }
        catch (error) {
            console.error(error);
            return false;
        }

        return true;
    }

    prepareUrl(url, parameters = {}, defaultParameters = {email: this.email, authUserId: this.authUserId}) {
        return Object.entries({...defaultParameters, ...parameters}).reduce((acc, [key, value]) => acc.replaceAll(`{${key}}`, encodeURIComponent(value)), url);
    }

    async toursMade({sortDirection = 'asc', sportTypes = undefined, startDate = undefined}) {
        let page  = 0;
        let count = 0;
        let tours = [];

        let url = Client.URL.TOURS_MADE;
        if (sportTypes !== undefined) {
            url += '&sport_types={sportTypes}';
        }

        if (startDate !== undefined) {
            url += '&start_date={startDate}';
        }

        do {
            const data = await this.fetch(url, {page, sortDirection, sportTypes, startDate});
            count      = data._embedded?.tours?.length ?? 0;
            tours      = tours.concat(data._embedded?.tours ?? []);
            page++;
        } while (count > 0);

        return tours.map((tour) => new Tour(tour, this));
    }
}