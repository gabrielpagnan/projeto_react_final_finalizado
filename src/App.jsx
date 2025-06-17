import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Servicos from "./Components/Servicos/Servicos";
import Usuarios from "./Components/Usuarios/Usuarios";
import Agendamentos from "./Components/Agendamentos/Agendamentos";
import Profissionais from "./Components/Profissionais/Profissionais";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./Components/AdminRoute/AdminRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/agendamentos"
          element={
            <ProtectedRoute>
              <Layout>
                <Agendamentos />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profissionais"
          element={
            <AdminRoute>
              <Layout>
                <Profissionais />
              </Layout>
            </AdminRoute>
          }
        />
        <Route
          path="/servicos"
          element={
            <AdminRoute>
              <Layout>
                <Servicos />
              </Layout>
            </AdminRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <AdminRoute>
              <Layout>
                <Usuarios />
              </Layout>
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
