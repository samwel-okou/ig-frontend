import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="Nav">
      <NavLink to="/" exact>
        Home
      </NavLink>

      {user && (
        <NavLink style={{ padding: '1rem' }} to="create" exact>
          Create
        </NavLink>
      )}

      {!user && (
        <>
          <NavLink style={{ padding: '1rem' }} to="login" exact>
            login
          </NavLink>
          <NavLink style={{ padding: '1rem' }} to="/signup" exact>
            Signup
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Nav;
