import React from 'react';


export default function PartyMatchViz({partyAbbr, partyFit, partyLogo}) {
  const indicatorStyle = {
    backgroundImage: `url(${partyLogo})`,
  };
  return (<div className="dib mb3">
            <a className="link dim white dib mh2 pv3 w2 h2 tc lh-copy cover bg-center" href="#" title={partyAbbr} style={indicatorStyle}>
            </a>
            <div className="tc b gray">{partyFit}</div>
          </div>);
}
