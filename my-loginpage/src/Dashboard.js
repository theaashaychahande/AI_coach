import React, { useState, useEffect } from 'react';
   import { useNavigate } from 'react-router-dom';
   import { auth } from './firebase';

   const Dashboard = () => {
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);
     const navigate = useNavigate();

     useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged((currentUser) => {
         setUser(currentUser);
         setLoading(false);
         if (!currentUser) {
           navigate('/');
         }
       });
       return () => unsubscribe();
     }, [navigate]);

     const handleSignOut = () => {
       auth.signOut()
         .then(() => {
           navigate('/');
         })
         .catch((error) => {
           console.error('Sign out error:', error);
         });
     };

     if (loading) {
       return (
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'white' }}>
           <p>Loading...</p>
         </div>
       );
     }

     return (
       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
         <h1 style={{ color: '#333' }}>Welcome, {user?.displayName || user?.email || 'User'}!</h1>
         <p style={{ color: '#555' }}>This is your dashboard.</p>
         <button
           style={{ margin: '10px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px' }}
           onClick={handleSignOut}
         >
           Sign Out
         </button>
       </div>
     );
   };

   export default Dashboard;