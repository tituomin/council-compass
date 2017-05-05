import React from 'react';

const divStyle = {
  backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/4/4b/ProposedGuggenheimHelsinkiSite.jpg)',
};

function clickHandler(castVote, issueId, value) {
  return function (e) {
    castVote(issueId, value);
    e.preventDefault();
  };
}

export default function MotionDetails({_case, castVote}) {
  return (<div>
            <article className="bg-white center mw6 ba b--black-10 mv3 shadow-3">
              <div className="pv2 ph3">
               <h1 className="f4 dark-gray mv2 ttu">{_case.title}</h1>
              </div>
              <div className="aspect-ratio aspect-ratio--16x9 mb">
                <div className="aspect-ratio--object cover bg-center" style={divStyle}></div>
              </div>
              <div className="pa3">
                <small className="gray db pv2">Lisätietoja aiheesta</small>
              </div>
            </article>
            <div className="flex items-center justify-center pa1">
              <a href="#!" onClick={clickHandler(castVote, _case.issue_id, -1)} className="f4 no-underline bg-animate hover-bg-light-red inline-flex items-center justify-center pa3 ba br-pill bw2 w4 mr4 dark-red">
                <span className="">EI</span>
              </a>
              <a href="#!"  onClick={clickHandler(castVote, _case.issue_id, 1)} className="f4 no-underline bg-animate hover-bg-light-green inline-flex items-center justify-center pa3 ba br-pill bw2 w4 mr4 dark-green">
                <span className="">JAA</span>
              </a>
              <a href="#!"  onClick={clickHandler(castVote, _case.issue_id, 0)} className="f4 no-underline bg-animate hover-bg-light-blue inline-flex items-center justify-center pa3 ba br-pill bw2 w4 mr4 dark-blue">
                <span className="pr1">TYHJÄ</span>
              </a>
            </div>
          </div>);
}
