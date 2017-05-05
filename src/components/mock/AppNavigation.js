import React from 'react';

export default function AppNavigation() {
  return (<header className="fixed w-100 z-max">
          <div className="header-content bg-black-90 ph3 pv3 mw7 center">
            <nav className="f7 fw6 ttu tracked">
              <div className="nowrap overflow-x-auto">
                <a className="link dim light-green dib mr3 ba ph2 pv1" href="#" title="Home">Partisipaattori</a>
                <a className="link dim white dib mr3" href="#/motion/" title="Home">Äänestykset</a>
                <a className="link dim white dib mr3" href="#/party/" title="Home">Puolueet</a>
              </div>
            </nav>
          </div>
        </header>);
}
