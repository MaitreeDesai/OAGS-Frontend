import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ArtistRegister } from "./components/ArtistRegistration";
import  {Home}  from "./components/Home";
import { UserLayout } from "./layout/UserLayout";
import { ToastContainer, toast } from 'react-toastify';
import  ChangePassword  from './components/ChangePassword';
import ProfileView from "./components/ProfileView";
import { ForgotPassword } from './components/ForgotPassword';
import { ResetPassword } from './components/ResetPassword';
import CategoryBanner from "./components/CategoryBanner";
import ExploreCategory from "./components/ExploreCategory"; 
import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";
import 'react-toastify/dist/ReactToastify.css';
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import ArtistDashboard from "./components/ArtistDashboard";
import Dashboard from "./pages/admin/Dashboard";
import ProductInsert from "./pages/admin/ProductInsert";
import CategoriesView from './pages/admin/CategoriesView';
import UserManagement from './pages/admin/UserManagement';
import OrderView from './pages/admin/OrderView';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/artistreg" element={<ArtistRegister/>} />
        <Route path="/ChangePassword" element={<UserLayout><ChangePassword/></UserLayout>}/>  
        <Route path="/ProfileView" element={<UserLayout><ProfileView/></UserLayout>}/>  
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
        <Route path="/reset-password/:token" element={<ResetPassword />} /> 
        <Route path="/listCategory" element={<CategoryBanner/>} />
        <Route path="/exploreProduct/:category_id" element={<ExploreCategory />} />
        <Route path="/Cart" element={<Cart/>} />
        <Route path="/checkout" element={<CheckOut/>} />
        <Route path="/" element={<UserLayout><Home/></UserLayout>} />
        <Route path="/artistdashboard" element={<ArtistDashboard/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/insert-product" element={<ProductInsert />} />
        <Route path="/categories" element={<CategoriesView />} />
        <Route path="/userManagement" element={<UserManagement />} />
        <Route path="/orderView" element={<OrderView />} />
      </Routes>
    </div>
  );
}

export default App;
