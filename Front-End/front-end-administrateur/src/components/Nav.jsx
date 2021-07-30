import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav() {
  const [firstname, setFirstname] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const getUserSession = () => {
    const firstname = localStorage.getItem('firstname');
    setFirstname(firstname);
  };

  useEffect(() => {
    getUserSession();
    setRefresh(true);
    if (refresh) {
      window.location = '/';
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setRefresh(true);
    if (refresh) {
      window.location = '/';
    }
  };

  return (
    <nav>
      <div className="box-links">
        {firstname ? (
          <div className="box-session">
            <NavLink to="/home">
              <img
                className="logo"
                src="assets/images/coyote_blanc.png"
                alt="logo"
              />
            </NavLink>

            <img
              onClick={logout}
              className="sign-out"
              src="/assets/images/deconnection.png"
              alt="deconnexion"
            />
          </div>
        ) : null}
      </div>
    </nav>
  );
}
