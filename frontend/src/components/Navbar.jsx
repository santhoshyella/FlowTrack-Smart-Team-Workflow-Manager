import { ClipboardList, LayoutDashboard, LogOut, PanelsTopLeft } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <NavLink className="brand-mark" to="/dashboard" aria-label="FlowTrack dashboard">
        <PanelsTopLeft size={24} />
        <span>FlowTrack</span>
      </NavLink>

      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/dashboard">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/tasks">
          <ClipboardList size={18} />
          <span>Task Board</span>
        </NavLink>
      </nav>

      <div className="user-strip">
        <span className="role-chip">{user?.role}</span>
        <span className="user-name">{user?.name}</span>
        <button className="icon-text-button subtle" type="button" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
