import React from 'react';
import PartyMatchViz from './PartyMatchViz';
import _ from 'lodash';
import { roundAgreement } from '../../utils';

export default function PartyMatchComparison({agreements}) {
  const vizs = _.map(agreements, (a) => {
      return <PartyMatchViz key={a.party} partyLogo={a.partyLogo} partyAbbr={a.party} partyFit={roundAgreement(a.agreement)}/>;
  });
  return (<div className="mv1 bg-white cf tc pb1">
          <h3 className="mt0 mb3 f5 white bg-green pv2 pb1">Samaa mieltä kanssasi</h3>
          { vizs }
          </div>);
}
