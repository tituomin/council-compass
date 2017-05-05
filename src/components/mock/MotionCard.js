import React from 'react';

export default function MotionCard() {
  return (<article className="ba mb3 b--black-10 bg-white shadow-4">
              <a className="db pv3 ph3 no-underline black dim" href="#0">
                <div className="flex flex-column flex-row-ns">
                  <div className="pr3 w-40">
                    <img src="http://lorempixel.com/800/600/city" className="db" alt="Motion image thumbnail." />
                  </div>
                  <div className="w-60 pl3">
                    <h3 className="f5 gray mv0">1/23</h3>
                    <h1 className="f4 dark-gray mv2 ttu">Ginza business class hub, soft power elegant Marylebone Comme des Garçons Winkreative flat white sophisticated K-pop conversation?</h1>
                    <a className="f6 link dim br1 ph3 pt2 pb1 mb2 dib white bg-red" href="#0">Äänestit EI</a>
                  </div>
                </div>
              </a>
            </article>);
}
