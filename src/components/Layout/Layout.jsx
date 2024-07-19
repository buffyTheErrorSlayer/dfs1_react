import { Outlet, Link } from "react-router-dom";
import { useState, useEffect} from 'react'
import { isAdmin } from "../../services/user"
import "./Layout.css"
export function Layout() {
  const token = localStorage.getItem("token");
  const [isAdminUser, setIsAdminUser] = useState(false)

  useEffect(() => {
    const checkAdminStatus = async () => {
      const admin = await isAdmin(token);
      setIsAdminUser(admin);
    };

    checkAdminStatus();
  }, [token]);


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