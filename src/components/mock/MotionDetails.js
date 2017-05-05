import React from 'react';
import PartyMatchComparison from './PartyMatchComparison';
import { Link } from 'react-router-dom';
import { voteValueDescription } from '../../utils';

function clickHandler(castVote, issueId, value) {
  return function (e) {
    castVote(issueId, value);
    e.preventDefault();
  };
}

export default function MotionDetails({_case, castVote, nextCase, partyAgreements, userVote}) {
  var opaqueBackground = {
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    };
  let nextLink = null;
  let comparison = null;
  let voteButtons = null;

  const divStyle = {
    backgroundImage: `url(/img/motions/${_case.issue_id}.jpg)`
  };

  let userVoteView = null;
  if (userVote !== undefined) {
    userVoteView = <div className="absolute z-999 w-100 h-100 top-0 left-0 tc v-mid"><div className="dib f1 w5 white absolute bottom-2 pa3 bg-black ttu rotate-45">{ voteValueDescription(userVote)}</div></div>;
  }
  else {
    voteButtons = (
      <div className="flex items-center justify-center pa1">
              <a href="#!" onClick={clickHandler(castVote, _case.issue_id, -1)} className="f4 no-underline bg-animate hover-bg-light-red inline-flex items-center justify-center pa3 ba br-pill bw2 w4 mr1 dark-red">
                <span className="">EI</span>
              </a>
              <a href="#!"  onClick={clickHandler(castVote, _case.issue_id, 0)} className="f4 no-underline bg-animate hover-bg-light-blue inline-flex items-center justify-center pa3 ba br-pill bw2 w4 mr1 dark-blue">
                <span className="pr1">TYHJÄ</span>
              </a>
              <a href="#!"  onClick={clickHandler(castVote, _case.issue_id, 1)} className="f4 no-underline bg-animate hover-bg-light-green inline-flex items-center justify-center pa3 ba br-pill bw2 w4 dark-green">
                <span className="">JAA</span>
              </a>
      </div>
      );
  }
  if (nextCase !== _case.issue_id) {
    nextLink = (
      <div className="flex items-center justify-center pa1">
          <Link to={`/motion/${nextCase}`} className="f4 no-underline bg-animate hover-bg-light-green inline-flex items-center justify-center pa3 ba br-pill bw2 w4 mr1 dark-green">
            <span className="">Seuraava</span>
          </Link>
      </div>);
    comparison = <PartyMatchComparison agreements={partyAgreements}/>;
  }
  return (<div>
            <article className="bg-white center mw6 ba b--black-10 mv3 shadow-3">
              <div className="aspect-ratio aspect-ratio--7x5 mb">
                <div className="aspect-ratio--object cover bg-center z-1" style={divStyle}></div>
                <h1 className="absolute t-0 z-5 f4 dark-gray mv0 pa2" style={opaqueBackground}>{_case.user_question}</h1>
                { userVoteView }
              </div>
            </article>
            { voteButtons }
            { nextLink }
            { comparison }
          </div>);
}
