import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Send from './components/Send';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { UsersContext } from './context/UsersContext';
import { useState } from 'react';
import { Toaster } from 'sonner';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  return (
    <>
      <Toaster richColors position='top-right' expand={false} />
      <UsersContext.Provider
        value={{
          users,
          setUsers,
          userDetails,
          setUserDetails,
        }}
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Auth />} />
            <Route
              path='/dashboard'
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path='/send'
              element={<ProtectedRoute element={<Send />} />}
            />
            <Route path='*' element={<Auth />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UsersContext.Provider>
    </>
  );
}

export default App;
