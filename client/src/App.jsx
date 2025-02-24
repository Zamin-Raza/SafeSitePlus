// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter , Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
// import { useSelector } from "react-redux";
import { useMemo } from "react";

import Layout from "@scenes/layout";
import Dashboard from "@scenes/dashboard";
import Addsupervisor from "@scenes/Addsupervisor";
import AuditLogging from "@scenes/AuditLogging";
import Login from "@scenes/Login";
import RegisterSite from "@scenes/RegisterSite";
import UpdateSupervisor from "@scenes/UpdateSupervisor";
import EditInfoForm from "@scenes/EditInfo";
import Video from "@scenes/SiteFootage";



// client
import Products from "@scenes/products";
import Customers from "@scenes/customers";


// sales
import Overview from "@scenes/overview";

import SystemConfiguration   from "@scenes/monthly";
import GetAllsites   from "@scenes/GetAllsites";
import Stats   from "@scenes/stats";
import SupDash  from "@scenes/SupDash";
// import FileViewer  from "@scenes/Video";
import Breakdown from "@scenes/breakdown";

import Site from "@scenes/Site";
import SiteFootage from "@scenes/SiteFootage";

import Search from "@scenes/Search";
import Listing from "@scenes/Listing"
import UpdateSite  from "@scenes/UpdateSite"

import NotesComponent from "@scenes/Notes";


// management
import Admin from "@scenes/admin";
import Performance from "@scenes/performance";
import Weather from "@scenes/Weather";
import Updateprofile from "@scenes/UpdateProfile";
import Forgot1 from "./components/Forget1"
import Forgot2 from "./components/Forget2"
import NotificationModal from "./components/NotificationModal"
import NewHeader from "./components/Newheader"
import NotificationsPage from "@scenes/NotificationPage";
import LandingPage from "@scenes/LandingPage";
import DetailedAlert from "@scenes/DetailedAlert";




import "./App.css";
import { elements } from "chart.js";

function App() {
  const mode = useSelector((state) => state.global.mode);
    const userId = useSelector((state) => state.global.userId);
    const UserType = useSelector((state) => state.global.type);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


  return (
    <div className="app">
      <BrowserRouter>
    

      <Routes>
      <Route path="/Notes" element={<NotesComponent/>} />
     
        
      <Route path="/forgot-password" element={<Forgot1/>} />
      <Route path="/recoverpassword/:id/" element={<Forgot2/>} />
    
      </Routes>
      
          <Routes>
          <Route path="/home" element={<LandingPage />} />
        
          </Routes>
      
     
        <ThemeProvider theme={theme}>
        <CssBaseline />
         
       

          <Routes>
          <Route path='/Updateprofile/:id' element={<Updateprofile/>} />
          <Route path='/notification' element={<NotificationsPage />} />
       
         
    
          <Route path="/login/:type" element={<Login/>} />
       
          {/* <Route
          path="/dashboard/:type"
         element={
            userId && UserType 
            ? <Dashboard /> 
          : <Navigate to={`/login/supervisor`} replace />
           }
          /> */}

          {/* <Route
          path="/login/:type"
         element={
            userId && UserType
            ? <Dashboard /> 
          : <Login />
           }
          /> */}
          
          <Route path='/supervisor' element={<SupDash/>} />
         
          
          {/* <Route path="/login/admin" element={<Login/>} /> */}
         
            <Route path='/search' element={<Search />} />
            <Route path='/Footage' element={<SiteFootage />} />
            {/* <Route path='/listing/:listingId' element={<Listing />} /> */}
            <Route path='/listing/:siteId' element={<Listing />} />
            <Route path='/site' element={<Site />} />
            {/* <Route path='/dashboard/supervisor/anomalyparameters' element={<UpdateSite/>} /> */}
        
        
       

         
          {/* <Route path="/video" element={<FileViewer/>} /> */}
          <Route path="/dashboard/:type/viewsites" element={<Video/>} />
          {/* <Route path="/dashboard/supervisor/viewalerts" element={<NotificationModal/>} /> */}
       
         
            <Route element={<Layout />}>
            <Route path="/dashboard/supervisor/viewalerts" element={<NotificationsPage/>} />
            <Route path="detailAlerts/:id" element={<DetailedAlert/>} />
            {/* <Route
           path="/dashboard/:type"
           element={
            userId && UserType == 'supervisor' 
            ? <Navigate to={`/dashboard/${UserType}/dashboard`} replace /> 
            : <Navigate to="/login/supervisor" replace />
            }
            /> */}

<Route
  path="/dashboard/:type"
  element={
    userId && UserType === 'admin' ? (
      <Dashboard />
    ) : userId && UserType === 'supervisor' ? (
      <SupDash />
    ) : (
      <Navigate to={`/login/supervisor`} replace />
    )
  }
/>

{/* 
<Route
          path="/dashboard/:type"
         element={
            userId && UserType 
            ? <Dashboard /> 
          : <Navigate to={`/login/supervisor`} replace />
           }
          /> */}
           <Route path='/dashboard/supervisor/siteview' element={<Site/>}/>
           <Route path='/dashboard/supervisor/anomalyparameters' element={<UpdateSite/>} />
        
           

     

         


                {/* <Route
              path="/login/:type"
              element={userId && UserType ==='admin' ? <Navigate to = "dashboard/admin/admindashboard"/> : <Navigate to="/login/admin" replace />}
            />
               <Route
              path="/login/supervsior"
              element={userId && UserType ==='supervisor' ? <Navigate to = "dashboard/supervisor/dashboard"/> : <Navigate to="/login/" replace />}
            /> */}
            {/* <Route
              path="/dashboard/:type"
              element={userId ? <Dashboard /> : <Navigate to="/login" replace />}
            /> */}
              {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
          
              {/* <Route path="dashboard/:type" element={<Dashboard/>}/> */}
              {/* <Route path="/dashboard/supervisor/" element={<Dashboard/>}/> */}
             <Route path="/dashboard/:type/admindashboard" element={<Navigate to="/dashboard/admin" replace />} />
             <Route path="/dashboard/supervisor/dashboard" element={<Navigate to="/dashboard/supervsior" replace />} />
              <Route path="/dashboard/:type/auditlogging" element={<AuditLogging />} />
              <Route path="/dashboard/:type/addsupervisor" element={<Addsupervisor />} />
              <Route path="/dashboard/:type/weatherdetails" element={<Weather/>} />
              
              {/* <Route path="/recoverpassword/:id/:token" element={<Forgot2/>} /> */}
            
              <Route path="/dashboard/:type/registersite" element={<RegisterSite/>} />
              <Route path="/dashboard/:type/updatesupervisor" element={<UpdateSupervisor/>} />
              <Route path="/dashboard/:type/updatesupervisor/editsupervisor/:id" element={<EditInfoForm/>} />
              <Route path="/dashboard/:type/systemconfiguration" element={<SystemConfiguration/>} />
              <Route path="/dashboard/:type/getallsites" element={<GetAllsites />} />
              <Route path="/dashboard/:type/stats" element={<Stats />} />
        
          
              
          
             
              

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
