import React from 'react';
import PartyMatchViz from './PartyMatchViz';
import _ from 'lodash';
import { roundAgreement } from '../../utils';

export default function PartyMatchComparison({agreements}) {
  const vizs = _.map(agreements, (a) => {
      return <PartyMatchViz key={a.party} partyLogo={a.partyLogo} partyAbbr={a.party} partyFit={roundAgreement(a.agreement)}/>;
  });
  return (<div className="mv4 bg-white pa2 cf tc">
          <h3>Samaa mieltä kanssasi</h3>
          { vizs }
          </div>);
}
