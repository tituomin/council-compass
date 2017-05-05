import React from 'react';
import MotionCard from './MotionCard';
import _ from 'lodash';

export default function MotionList({cases, userVotes, emptyVotes}) {
  const cards = _.map(cases, (_case) => {
    const userVote = userVotes[_case.issue_id];
    return <MotionCard key={_case.issue_id} _case={_case} totalCount={cases.length} userVote={userVote}/>;
  });
  return(
    <div>
        <div>
            <a href="#!" onClick={(e) => { emptyVotes(); e.preventDefault(); }}>Tyhjennä äänestyksesi</a>
        </div>
        { cards };
    </div>
  );
}
