import 'whatwg-fetch'


class Party {
    constructor(data) {
        Object.assign(this, data);
    }
    get logoThumbnailURL() {
        let url = 'http://www.kansanmuisti.fi' + this.logo_128x128;
        return url;
    }
}


class PartyMap {
    fetch() {
        this.parties = [];
        let promise = new Promise((resolve, reject) => {
            fetch('http://kansanmuisti.fi/api/v1/party/').then((response) => {
                response.json().then((data) => {
                    data.objects.forEach((partyData) => {
                        this.parties.push(new Party(partyData));
                    });
                    resolve();
                });
            });
        });
        return promise;
    }
    getParty(abbrev) {
        return this.parties.find((party) => {
            return party.abbreviation === abbrev;
        });
    }
}

export default PartyMap;
