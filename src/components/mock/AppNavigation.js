import React from 'react';

export default function AppNavigation() {
  return (<header className="fixed w-100">
          <div className="header-content bg-black-90 ph1 pv3 ph4 mw7 center">
            <nav className="f7 fw6 ttu tracked">
              <a className="link dim white dib mr3" href="#" title="Home">Valtuustokone</a>
              <a className="link dim white dib mr3" href="#/motion/" title="Home">Äänestykset</a>
              <a className="link dim white dib mr3" href="#/party/" title="Home">Puolueet</a>
            </nav>
          </div>
        </header>);
}
