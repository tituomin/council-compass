import React from 'react';
import MotionCard from './MotionCard';
import _ from 'lodash';

export default function PartyDetails({}) {

  return(
    <div>
      <article className="center bg-white br3 pa3 mv3 ba b--black-10">
        <div className="tc">
          <img src="http://tachyons.io/img/avatar_1.jpg" className="h3 w3 dib" title="Party logo here" />
          <h1 className="f4">Puolueen nimi</h1>
          <hr className="mw3 bb bw1 b--black-10" />
        </div>
      </article>
      <div className="mw6 center bg-white mb4">
        <h1 className="f6 pa2 bg-green white">Sinulle sopivimmat ehdokkaat tästä puolueesta</h1>
        <article className="dt w-100 bb b--black-05 pa2 mt2" href="#0">
          <div className="dtc w2 w3-ns v-mid">
            <img src="http://mrmrs.io/photos/p/2.jpg" className="ba b--black-10 db br2 w2 w3-ns h2 h3-ns"/>
          </div>
          <div className="dtc v-mid pl3">
            <h1 className="f6 f5-ns fw6 lh-title black mv0">Edustajan nimi</h1>
            <h2 className="f6 fw4 mt0 mb0 black-60">Puolue</h2>
          </div>
          <div className="dtc v-mid">
            <span>50%</span>
          </div>
        </article>
        <article className="dt w-100 bb b--black-05 pa2 mt2" href="#0">
          <div className="dtc w2 w3-ns v-mid">
            <img src="http://mrmrs.io/photos/p/2.jpg" className="ba b--black-10 db br2 w2 w3-ns h2 h3-ns"/>
          </div>
          <div className="dtc v-mid pl3">
            <h1 className="f6 f5-ns fw6 lh-title black mv0">Edustajan nimi</h1>
            <h2 className="f6 fw4 mt0 mb0 black-60">Puolue</h2>
          </div>
          <div className="dtc v-mid">
            <span>50%</span>
          </div>
        </article>
      </div>
    </div>
  );
}
