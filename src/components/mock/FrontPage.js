import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

export default function FrontPage({nextVote}) {
  let caseLink = null;
  if (nextVote) {
    caseLink = <Link to={`/motion/${nextVote}`} className="f4 b link dim br-pill ph4 pv3 mb2 dib white bg-dark-pink mv4" href="#0">Aloitetaan äänestäminen!</Link>;
  }
  return (<div>
            <article className="center mw7 hidden ba b--light-gray mv4">
                <div className="pa3 bg-white">
                  <h1 className="f2 tc ttu tracked">Partisipaattori</h1>
                  <hr className="mw3 bb bw1 b--black-10" />
                  <h2 className="f3 gray tc">Tarkastele ja kerro mielipiteesi kaupunginvaltuuston tehdyistä päätöksistä.</h2>
                  <p className="lh-copy tc">Partisipaattorin avulla voit tarkastella kaupunginvaltuustossa käsiteltyjä asioita ja tarkastella, miten niistä on äänestetty ehdokkaiden, puolueiden ja kaupunkilaisten toimesta. Saat itse kysymystä äänestettyäsi näkyviin omaa kantaasi parhaiten vastaavat edustajat kustakin asiasta. </p>
                  <p className="tc">
                    { caseLink }
                  </p>
                </div>
            </article>
          </div>);
}
