import React, { useState, useEffect } from 'react';
   import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
   import Login from './Login';
   import Dashboard from './Dashboard';
   import { auth } from './firebase';
   import { onAuthStateChanged } from 'firebase/auth';

   function App() {
     const [user, setUser] = useState(null);

     useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
       });
       return () => unsubscribe();
     }, []);

     return (
       <Router>
         <Routes>
           <Route path="/" element={<LoginWithRedirect user={user} />} />
           <Route path="/dashboard" element={<ProtectedRoute user={user} component={Dashboard} />} />
         </Routes>
       </Router>
     );
   }

   const LoginWithRedirect = ({ user }) => {
     const navigate = useNavigate();
     useEffect(() => {
       if (user) {
         navigate('/dashboard');
       }
     }, [user, navigate]);

     return <Login />;
   };

   const ProtectedRoute = ({ user, component: Component }) => {
     const navigate = useNavigate();
     useEffect(() => {
       if (!user) {
         navigate('/');
       }
     }, [user, navigate]);

     return user ? <Component /> : null;
   };

   export default App;