import React from 'react';
import { Link } from 'react-router-dom';

function voteValueDescription(value) {
  switch (value) {
    case 1:
    return 'kyllä';
    case 0:
    return 'tyhjä';
    case -1:
    return 'ei';
  }
  return 'whatever';
}

export default function MotionCard({_case, totalCount, userVote}) {
  const userVoteSummary = (userVote !== undefined ? 'Äänestit ' + voteValueDescription(userVote).toUpperCase() : 'Äänestä');
  return (<article className="ba mb3 b--black-10 bg-white shadow-4">
              <a className="db pv3 ph3 no-underline black dim" href="#0">
                <div className="flex flex-column flex-row-ns">
                  <div className="pr3 w-40">
                    <img src="http://lorempixel.com/800/600/city" className="db" alt="Motion image thumbnail." />
                  </div>
                  <div className="w-60 pl3">
                    <h3 className="f5 gray mv0">{_case.number}/{totalCount}</h3>
                    <h1 className="f4 dark-gray mv2 ttu">{_case.title}</h1>
                    <Link to={`/motion/${_case.issue_id}`} className="f6 link dim br1 ph3 pt2 pb1 mb2 dib white bg-red" href="#0">{userVoteSummary}</Link>
                  </div>
                </div>
              </a>
            </article>);
}
