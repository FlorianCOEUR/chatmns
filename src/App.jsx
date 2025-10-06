import { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router";
import { Toaster, toast } from 'react-hot-toast';
import AuthProvider from './context/AuthProvider.jsx';
import AppRoutes from './Routes'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}