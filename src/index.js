import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import {Layout, Home, Login, ConferenceDashboard, UserDashboard, Conference} from "./components";

export default function App() {

  const AdminRoute = ({ element }) => {
    const isAdmin = localStorage.getItem('admin') === 'true';
    return isAdmin ? element : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="conference/:id" element={<Conference />} />
          <Route path="/admin/conference" element={<AdminRoute element={<ConferenceDashboard />} />} />
          <Route path="/admin/user" element={<AdminRoute element={<UserDashboard />} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);