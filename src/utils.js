
export function voteValueDescription(value) {
  switch (value) {
    case 1:
    return 'kyllä';
    case 0:
    return 'tyhjä';
    case -1:
    return 'ei';
  }
  return 'whatever';
}

export function populatePartyLogos(partyAgreements, partyMap) {
  partyAgreements = partyAgreements.filter((pa) => {
    let party = partyMap.getParty(pa.party);
    if (party) {
      pa.partyLogo = party.logoThumbnailURL;
      pa.partyName = party.name;
      return true;
    } else {
      return false;
    }
  });
}

