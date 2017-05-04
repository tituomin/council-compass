import React from 'react';
import classNames from 'classnames'

export default function PartyList() {
  return (<div>
            <article className="center mw5 mw6-ns hidden ba b--light-gray mv5">
                <h1 className="f4 bg-light-green dark-green mv0 pv2 ph3 ">Sinulle sopivimmat puolueet</h1>
                <div className="pa3 bg-white">
                <article className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
                  <div className="dtc w2 w3-ns v-mid">
                    <img src="http://img.clipartall.com/lady-bug-on-ladybugs-san-cute-ladybug-clipart-736_937.jpg" className="ba b--black-10 db br2 w2 w3-ns h2 h3-ns"/>
                  </div>
                  <div className="dtc v-mid pl3">
                    <h1 className="f6 f5-ns fw6 lh-title black mv0">RKP</h1>
                    <h2 className="f6 fw4 mt0 mb0 black-60">Ruotsalainen kansanpuolue</h2>
                  </div>
                  <div className="dtc v-mid tr">
                    <span className="w-100 f3 green b">
                      60%
                    </span>
                  </div>
                </article>
                <article className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
                  <div className="dtc w2 w3-ns v-mid">
                    <img src="https://c1.staticflickr.com/9/8026/7651519236_a44df467ce_b.jpg" className="ba b--black-10 db br2 w2 w3-ns h2 h3-ns"/>
                  </div>
                  <div className="dtc v-mid pl3">
                    <h1 className="f6 f5-ns fw6 lh-title black mv0">Kokoomus</h1>
                    <h2 className="f6 fw4 mt0 mb0 black-60">Kansallinen kokoomus</h2>
                  </div>
                  <div className="dtc v-mid tr">
                    <span className="w-100 f3 green b">
                      50%
                    </span>
                  </div>
                </article>
                <article className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
                  <div className="dtc w2 w3-ns v-mid">
                    <img src="http://www.publicdomainpictures.net/pictures/140000/velka/rainbow-1445337690d8q.jpg" className="ba b--black-10 db br2 w2 w3-ns h2 h3-ns"/>
                  </div>
                  <div className="dtc v-mid pl3">
                    <h1 className="f6 f5-ns fw6 lh-title black mv0">Vasemmisto</h1>
                    <h2 className="f6 fw4 mt0 mb0 black-60">Vasemmistoliitto</h2>
                  </div>
                  <div className="dtc v-mid tr">
                    <span className="w-100 f3 green b">
                      40%
                    </span>
                  </div>
                </article>
              </div>
            </article>
          </div>);
}
