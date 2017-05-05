import React from 'react';


export default function PartyMatchViz({partyAbbr, partyFit, partyLogo}) {
  const indicatorStyle = {
    backgroundImage: `url(${partyLogo})`,
  };
  return (<div className="dib">
            <a className="link dim white dib br-100 mr1 pv3 w3 h3 ba b--black-10 tc lh-copy" href="#" title=""  style={indicatorStyle}>
              <span className="f7 ttu b">{partyAbbr}</span>
            </a>
            <div className="tc pa2 b gray">{partyFit}</div>
          </div>);
}
