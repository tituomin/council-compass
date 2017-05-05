import React from 'react';
import PartyMatchViz from './PartyMatchViz'

export default function PartyMatchComparison() {
  return (<div className="mv4 bg-white pa2 cf tc">
            <PartyMatchViz partyAbbr='KOK' partyFit='100'/>
            <PartyMatchViz partyAbbr='VAS' partyFit='90'/>
            <PartyMatchViz partyAbbr='RKP' partyFit='80'/>
            <PartyMatchViz partyAbbr='VIH' partyFit='70'/>
            <PartyMatchViz partyAbbr='PS' partyFit='60'/>
            <PartyMatchViz partyAbbr='KES' partyFit='50'/>
            <PartyMatchViz partyAbbr='SDP' partyFit='40'/>
            <PartyMatchViz partyAbbr='KD' partyFit='30'/>
            <PartyMatchViz partyAbbr='SKP' partyFit='10'/>
          </div>);
}