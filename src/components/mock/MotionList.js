import React from 'react';
import MotionCard from './MotionCard';
import _ from 'lodash';

export default function MotionList({cases, userVotes, emptyVotes}) {
  const cards = _.map(cases, (_case, index) => {
    const userVote = userVotes[_case.issue_id];
    return <MotionCard key={_case.issue_id} index={index+1} _case={_case} totalCount={cases.length} userVote={userVote}/>;
  });
  return(
    <div>
      <article className="center bg-white br3 pa3 mv3 ba b--black-10">
          <div className="tc">
            <img src="http://tachyons.io/img/avatar_1.jpg" className="br-100 h3 w3 dib" title="Photo of a kitty staring at you" />
            <h1 className="f4">Omat äänestykset</h1>
            <hr className="mw3 bb bw1 b--black-10" />
          </div>
          <p className="lh-copy tc f6 black-70">
            <a href="#!" onClick={(e) => { emptyVotes(); e.preventDefault(); }} className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-gray" href="#0">Tyhjennä äänestyksesi</a>
          </p>
        </article>
        { cards }
    </div>
  );
}
