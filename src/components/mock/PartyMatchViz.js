import React from 'react';


export default function PartyMatchViz({partyAbbr, partyFit, partyLogo}) {
  const indicatorStyle = {
    backgroundImage: `url(${partyLogo})`,
  };
  return (<div className="dib">
            <a className="link dim white dib ma2 pv3 w2 h2 tc lh-copy cover bg-center" href="#" title="{partyAbbr}" style={indicatorStyle}>
            </a>
            <div className="tc pa2 b gray">{partyFit}</div>
          </div>);
}
