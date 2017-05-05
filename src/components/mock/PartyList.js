import React from 'react';
import classNames from 'classnames'
import analyzer from '../../lib/analysis';
import _ from 'lodash';

function PartySummary({fullName, abbreviation, percentage}) {
  return (
    <article className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
        <div className="dtc w2 w3-ns v-mid">
            <img src="http://img.clipartall.com/lady-bug-on-ladybugs-san-cute-ladybug-clipart-736_937.jpg" className="ba b--black-10 db br2 w2 w3-ns h2 h3-ns"/>
        </div>
        <div className="dtc v-mid pl3">
            <h1 className="f6 f5-ns fw6 lh-title black mv0">{abbreviation}</h1>
            <h2 className="f6 fw4 mt0 mb0 black-60">{fullName}</h2>
        </div>
        <div className="dtc v-mid tr">
            <span className="w-100 f3 green b">
                {`${percentage}%`}
            </span>
        </div>
    </article>
  );
}

export default class PartyList extends React.Component {
  constructor() {
    super();
    this.state = {
      agreements: []
    };
  }
  getUserPartyAgreements() {
    this.setState(
      (prevState) => {
        const agreements = _.filter(
          analyzer.get_user_party_agreements(this.props.voteData),
          (a) => { return a.party !== 'undefined';}
        );
        return Object.assign({}, {agreements});
      });
  }
  componentWillMount() {
    this.getUserPartyAgreements();
  }
  componentWillReceiveProps(nextProps) {
    console.log('partylist will receive props');
  }
  render() {
    console.log(this.state.agreements);
    const parties = _.map(this.state.agreements, (a) => {
      console.log(a);
      return <PartySummary key={a.party} fullName={a.party} abbreviation={a.party} percentage={a.agreement}/>;
    });
    return (
      <div>
          <article className="center mw5 mw6-ns hidden ba b--light-gray mv5">
              <h1 className="f4 bg-light-green dark-green mv0 pv2 ph3 ">Sinulle sopivimmat puolueet</h1>
              <div className="pa3 bg-white">
                  { parties }
              </div>
          </article>
      </div>);
  }
}
