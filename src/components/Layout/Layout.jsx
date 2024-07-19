import { Outlet, Link } from "react-router-dom";
import "./Layout.css"
export function Layout () {
  return (
    <>
      <nav>
            
            <div className="nav-element">
                <Link to="/">Home</Link>
            </div>
 
            <div className="nav-element">
                <Link to="/login">Login</Link>
            </div>

      </nav>

      <Outlet />
    </>
  )
};