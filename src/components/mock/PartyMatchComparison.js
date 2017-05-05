import React from 'react';
import PartyMatchViz from './PartyMatchViz';
import _ from 'lodash';

export default function PartyMatchComparison({agreements}) {
  const vizs = _.map(agreements, (a) => {
      return <PartyMatchViz key={a.party} partyLogo={a.partyLogo} partyAbbr={a.party} partyFit={Math.round(((a.agreement + 1)/2.0)*100) }/>;
  });
  return (<div className="mv4 bg-white pa2 cf tc">
          { vizs }
          </div>);
}
