import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

export default function FrontPage({nextVote}) {
  let caseLink = null;
  if (nextVote) {
    caseLink = <Link to={`/motion/${nextVote}`} className="f4 b link dim br-pill ph3 pv3 dib white bg-purple mt3 mt4-ns" href="#0">Aloitetaan äänestäminen!</Link>;
  }
  return (<div>
            <article className="center mw7 hidden ba b--light-gray mv4">
                <div className="pa3 bg-white">
                  <h1 className="f3 f2-ns tc ttu tracked">Partisipaattori</h1>
                  <hr className="mw3 bb bw1 b--black-10" />
                  <h2 className="f4 f3-ns  gray tc">Tarkastele ja kerro mielipiteesi Helsingin kaupunginvaltuuston tehdyistä päätöksistä.</h2>
                  <p className="lh-copy tc">Partisipaattorin avulla voit tarkastella kaupunginvaltuustossa käsiteltyjä asioita ja tarkastella, miten niistä on äänestetty ehdokkaiden, puolueiden ja kaupunkilaisten toimesta. Saat itse kysymystä äänestettyäsi näkyviin omaa kantaasi parhaiten vastaavat edustajat kustakin asiasta. </p>
                  <p className="tc">
                    { caseLink }
                  </p>
                </div>
            </article>
          </div>);
}
