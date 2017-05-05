import React from 'react';
import PartyMatchComparison from './PartyMatchComparison';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { voteValueDescription } from '../../utils';
import classNames from 'classnames';

function clickHandler(isSequence, castVote, issueId, value) {
  return function (e) {
    castVote(issueId, value);
    if (isSequence) {
      e.preventDefault();
    }
  };
}

export default function MotionDetails({_case, castVote, nextCase, partyAgreements, userVote, caseCount, readyCount, isSequence}) {
  var opaqueBackground = {
      backgroundColor: 'rgba(255, 255, 255, 0.7)'
    };
  let nextLink = null;
  let comparison = null;
  let voteButtons = null;

  const divStyle = {
    backgroundImage: `url(/img/motions/${_case.issue_id}.jpg)`
  };

  let userVoteView = null;
  if (isSequence && nextCase !== undefined && userVote !== undefined) {
    const labelClass = classNames("dib f1 w5 absolute top-2 left-1 pa2 ba br4 bw3 ttu rotate-45 b shadow-3",
                            {'b--red red': (userVote === -1),
                            'b--green green': (userVote === 1),'b--blue blue': (userVote === 0)});
    userVoteView = <div className="absolute z-999 w-100 h-100 top-0 left-0 tc v-mid"><div className={labelClass}>{ voteValueDescription(userVote)}</div></div>;
  }
  else {
    voteButtons = (
      <div className="flex items-center justify-center pa1 mb5">
              <Link to="/motion" onClick={clickHandler(isSequence, castVote, _case.issue_id, -1)} className="f4 no-underline bg-animate hover-bg-light-red inline-flex items-center justify-center pa3 ba br-pill bw2 w4 mr1 dark-red">
                <span className="">EI</span>
              </Link>
              <Link to="/motion"  onClick={clickHandler(isSequence, castVote, _case.issue_id, 0)} className="f4 no-underline bg-animate hover-bg-light-blue inline-flex items-center justify-center pa3 ba br-pill bw2 w4 mr1 dark-blue">
                <span className="pr1">OHITA</span>
              </Link>
              <Link to="/motion"  onClick={clickHandler(isSequence, castVote, _case.issue_id, 1)} className="f4 no-underline bg-animate hover-bg-light-green inline-flex items-center justify-center pa3 ba br-pill bw2 w4 dark-green">
                <span className="">KYLLÄ</span>
              </Link>
      </div>
      );
  }
  if (isSequence && nextCase !== undefined && nextCase !== _case.issue_id) {
    nextLink = (
      <div className="flex items-center justify-center pa1">
          <Link to={`/motion/${nextCase}`} className="f4 no-underline bg-animate hover-bg-light-green inline-flex items-center justify-center pa3 ba br-pill bw2 w-60 mb2 dark-green">
            <span className="">Seuraava</span>
          </Link>
      </div>);
    if (userVote !== 0) {
      comparison = <PartyMatchComparison agreements={partyAgreements}/>;
    }
  }

  const counter = (isSequence && nextCase === _case.issue_id) ? <div className="dib absolute top-0 right-0 bg-black white z-4 b pa2">{readyCount + 1 + '/' + caseCount}</div> : null;
  return (<div className="pb4">
            <article className="bg-white center mw6 mv3 shadow-3 pa2">
              <div className="aspect-ratio aspect-ratio--7x5 mb">
                <div className="aspect-ratio--object cover bg-center z-1" style={divStyle}></div>
                { counter }
                <h1 className="absolute bottom-0 left-0 right-0 z-5 f4 f2-ns dark-gray mv0 pa2" style={opaqueBackground}>{_case.user_question}</h1>
                { userVoteView }
              </div>
            </article>
            { voteButtons }
            { nextLink }
            { comparison }
          </div>);
}
