import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'
import { isAdmin } from "../../services/user"
import "./Layout.css"
export function Layout() {
  const token = localStorage.getItem("token");
  const [isAdminUser, setIsAdminUser] = useState(false)

  const location = useLocation();

  async function checkAdminStatus() {
    const admin = await isAdmin(token);
    setIsAdminUser(admin);
  }

  useEffect(() => {
    checkAdminStatus();
  }, [token]);

  useEffect(() => {
    if (location.state?.newLogin) {
      checkAdminStatus();
    }
  }, [location]);



  return (
    <>
      <nav>

        <div className="nav-element">
          <Link to="/">Home</Link>
        </div>

        <div className="nav-element">
          <Link to="/login">Login</Link>
        </div>

        {isAdminUser && (
          <>
            <div className="nav-element">
              <Link to="/admin/conference">Dashboard Conference</Link>
            </div>
            <div className="nav-element">
              <Link to="/admin/user">Dashboard Users</Link>
            </div>
          </>
        )}

      </nav>

      <Outlet />
    </>
  )
};