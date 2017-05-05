import 'whatwg-fetch'
const parties = require('../importer/parties.json');


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
            parties.objects.forEach((partyData) => {
                this.parties.push(new Party(partyData));
            });
            resolve();
        });
        return promise;
    }
    getParty(abbrev) {
        if (abbrev[abbrev.length - 1] === '.') {
            abbrev = abbrev.slice(0, -1);
        }
        abbrev = abbrev.toLowerCase();
        switch (abbrev) {
            case 'sfp':
                abbrev = 'r';
                break;
            case 'sdp':
                abbrev = 'sd';
                break;
            case 'peruss':
                abbrev = 'ps';
                break;
            default:
                break;
        }
        let party = this.parties.find((party) => {
            return party.abbreviation === abbrev;
        });
        if (!party) {
            return null;
        }
        return party;
    }
}

export default PartyMap;
