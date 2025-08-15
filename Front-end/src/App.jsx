import ContactList from "./Components/Pages/ContactList.jsx";
import Login from "./Components/Pages/login.jsx";
import AddNewContact from "./Components/Pages/AddNewCon.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserDetail from "./Components/Pages/User.Detail.jsx";
import Signup from "./Components/Pages/signup.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./Feature/userSlice";
import Update from "./Components/Pages/Update.jsx";
import UsersList from "./Components/Pages/userlist.jsx";
import AdminUserContacts from "./Components/Pages/adminUserContacts.jsx";

const ProtectedRoute = ({ children }) => {
  const id = useSelector((store) => store.user.id);
  return id ? children : <Navigate to="/" />;
};

const AdminProtected = ({ children }) => {
  const role = useSelector((store) => store.user.role);
  console.log(role);
  return role && role.toLowerCase() === "admin" ? (
    children
  ) : (
    <Navigate to="/Contacts" />
  );
};

const IsLoggedIn = ({ children }) => {
  const id = useSelector((store) => store.user.id);
  return id ? <Navigate to="/Contacts" /> : children;
};

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      dispatch(addUser(JSON.parse(userInfo)));
    }
  }, [dispatch]);
  return (
    <div className="bg-white h-screen max-w-full flex justify-center items-center ">
      <div className="relative bg- border-11  rounded-3xl border-black h-[520px] w-[270px]  justify-center items-center">
        <div className="absolute top-[5rem] left-[-15px] border-5 border-black h-1/7 rounded-3xl"></div>
        <div className="absolute top-[5rem] right-[-15px] border-5 border-black h-1/10 rounded-3xl"></div>
        <div className="absolute top-[-5px] bg-black left-[25%] border-black w-[8rem] h-[15px] rounded-[50px]"></div>
        <Routes>
          <Route
            index
            element={
              <IsLoggedIn>
                <Login />
              </IsLoggedIn>
            }
          />
          <Route
            path="/signup"
            element={
              <IsLoggedIn>
                <Signup />
              </IsLoggedIn>
            }
          />
          <Route
            path="/Contacts"
            element={
              <ProtectedRoute>
                <ContactList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/NewContact"
            element={
              <ProtectedRoute>
                <AddNewContact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/UserDetail/:id"
            element={
              <ProtectedRoute>
                <UserDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Update/:numberId"
            element={
              <ProtectedRoute>
                <Update />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user"
            element={
              // <ProtectedRoute>
              <AdminProtected>
                <UsersList />
              </AdminProtected>
              // </ProtectedRoute>
            }
          />
          <Route
            path="/AdminUserContacts/:id"
            element={
              // <ProtectedRoute>
              <AdminProtected>
                <AdminUserContacts />
              </AdminProtected>
              // </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
