import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";

import Layout from "@scenes/layout";
import Dashboard from "@scenes/dashboard";
import Addsupervisor from "@scenes/Addsupervisor";
import AuditLogging from "@scenes/AuditLogging";
import Login from "@scenes/Login";


// client
import Products from "@scenes/products";
import Customers from "@scenes/customers";


// sales
import Overview from "@scenes/overview";
import Daily from "@scenes/daily";
import Monthly from "@scenes/monthly";
import Breakdown from "@scenes/breakdown";

// management
import Admin from "@scenes/admin";
import Performance from "@scenes/performance";
import Weather from "@scenes/Weather";
import Forgot1 from "./components/Forget1"
import Forgot2 from "./components/Forget2"

import "./App.css";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/auditlogging" element={<AuditLogging />} />
              <Route path="/addsupervisor" element={<Addsupervisor />} />
              <Route path="/weatherdetails" element={<Weather/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/Forget" element={<Forgot1/>} />
              <Route path="/recoverpassword/:id/:token" element={<Forgot1/>} />
              
          
             
              

              {/*  client */}
              {/* <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} /> */}

              {/* sales */}
              {/* <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} /> */}

              {/* management */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
