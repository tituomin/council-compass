import React from 'react';
import { Link } from 'react-router-dom';

import { voteValueDescription } from '../../utils';

export default function MotionCard({_case, totalCount, userVote, index}) {
  const userVoteSummary = (userVote !== undefined ? 'Äänestit ' + voteValueDescription(userVote).toUpperCase() : 'Äänestä');
  const motionImage = {
    backgroundImage: `url(/img/motions/${_case.issue_id}.jpg)`
  };
  return (<article className="ba mb3 b--black-10 bg-white shadow-4">
          <Link to={`/motion/${_case.issue_id}`} className="db pv3 ph3 no-underline black dim" href="#0">
                <div className="flex flex-column flex-row-ns">
                  <div className="pr3 mb2 mb0-ns w-40-ns">
                    <div className="aspect-ratio aspect-ratio--6x4 mb">
                      <div className="aspect-ratio--object cover bg-center z-1" style={motionImage}></div>
                    </div>
                  </div>
                  <div className="w-60-ns pl3-ns">
                    <h3 className="f6 f5-ns gray mv0">{index}/{totalCount}</h3>
                    <h1 className="f5 f4-ns dark-gray mv2 ttu">{_case.user_question}</h1>
                    <div className="f6 link dim br2 ph3 pv2 mb2 dib white bg-blue" href="#0">{userVoteSummary}</div>
                  </div>
                </div>
              </Link>
            </article>);
}
