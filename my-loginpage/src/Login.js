import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Signed up with Google:', result.user);
        setError('');
        setSuccess('');
        window.location.href = 'http://localhost:8000/static/dashboard.html';
      })
      .catch((error) => {
        setError(error.message);
        setSuccess('');
      });
  };

  const emailSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed in with email:', userCredential.user);
        setError('');
        setSuccess('');
        navigate('/dashboard');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-credential') {
          setError('Invalid email or password. Please check your credentials or sign up.');
        } else if (error.code === 'auth/wrong-password') {
          setError('Incorrect password. Please try again.');
        } else {
          setError(error.message);
        }
        setSuccess('');
      });
  };

  const emailSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed up with email:', userCredential.user);
        setError('');
        setSuccess('');
        window.location.href = 'http://localhost:8000/static/dashboard.html';
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setError('This email is already registered. Try signing in or using a different email.');
        } else if (error.code === 'auth/weak-password') {
          setError('Password is too weak. Use at least 6 characters.');
        } else {
          setError(error.message);
        }
        setSuccess('');
      });
  };

  const resetPassword = () => {
    if (!email) {
      setError('Please enter your email address to reset your password.');
      setSuccess('');
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess('Password reset email sent. Check your inbox or spam folder.');
        setError('');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          setError('Invalid email address. Please enter a valid email.');
        } else if (error.code === 'auth/user-not-found') {
          setError('No account found with this email. Please sign up.');
        } else {
          setError(error.message);
        }
        setSuccess('');
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Login Page</h2>
      <button
        style={{ margin: '10px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#4285F4', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px' }}
        onClick={googleSignIn}
      >
        Sign in with Google
      </button>
      <hr style={{ width: '300px', margin: '20px 0' }} />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: '10px', padding: '10px', width: '300px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: '10px', padding: '10px', width: '300px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
      />
      <button
        style={{ margin: '10px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px' }}
        onClick={emailSignIn}
      >
        Sign In
      </button>
      <button
        style={{ margin: '10px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px' }}
        onClick={emailSignUp}
      >
        Sign Up
      </button>
      <button
        style={{ margin: '10px', padding: '10px 20px', cursor: 'pointer', background: 'none', border: 'none', color: '#007bff', fontSize: '14px' }}
        onClick={resetPassword}
      >
        Forgot Password?
      </button>
      {error && <p style={{ color: 'red', margin: '10px', fontSize: '14px' }}>{error}</p>}
      {success && <p style={{ color: 'green', margin: '10px', fontSize: '14px' }}>{success}</p>}
    </div>
  );
};

export default Login;