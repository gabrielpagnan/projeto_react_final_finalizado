import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Servicos from "./Components/Servicos/Servicos";
import Profissionais from "./Components/Profissionais/Profissionais";
import Agendamentos from "./Components/Agendamentos/Agendamentos";
import NovoAgendamento from "./Components/Agendamentos/NovoAgendamento";
import Usuarios from "./Components/Usuarios/Usuarios";
import Layout from "./Components/Layout/Layout";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./Components/AdminRoute/AdminRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/profissionais" element={<Profissionais />} />
        
        {/* Protected routes - require authentication */}
        <Route 
          path="/agendamentos" 
          element={
            <ProtectedRoute>
              <Agendamentos />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/agendamentos/novo" 
          element={
            <ProtectedRoute>
              <NovoAgendamento />
            </ProtectedRoute>
          } 
        />

        {/* Admin routes - require admin authentication */}
        <Route 
          path="/usuarios" 
          element={
            <AdminRoute>
              <Usuarios />
            </AdminRoute>
          } 
        />
      </Route>

      {/* Redireciona rotas não encontradas para a home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 