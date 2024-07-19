import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { isAdmin } from "../../services/user"
import "./Layout.css"
export function Layout() {
  const token = localStorage.getItem("token");
  const [isAdminUser, setIsAdminUser] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  async function checkAdminStatus() {
    try{
      if(token){
        const admin = await isAdmin(token);
        setIsAdminUser(admin);
      } else {
        setIsAdminUser(false); 
      }
    } catch (error){
      console.error("Error checking admin status:", error);
    }

  }

  const logout = () => {
    localStorage.removeItem("token");
    setIsAdminUser(false); // Optionally update state to reflect logout
    navigate("/"); // Redirect to login or homepage
  };

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

        

        {!localStorage.getItem("token") && (
          <div className="nav-element">
            <Link to="/login">Login</Link>
          </div>
        )}

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

        {localStorage.getItem("token") && (
          <div className="nav-element end">
            <button className="logout" onClick={logout}>Logout</button>
          </div>
        )}

      </nav>

      <Outlet />
    </>
  )
};