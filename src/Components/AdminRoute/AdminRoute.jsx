import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem("logado") === "true";
  const usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual") || "{}");
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (usuarioAtual.tipo !== "admin") {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

export default AdminRoute; 