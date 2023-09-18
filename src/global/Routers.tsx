import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Basics from '../pages/Basics/index.tsx'

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/Basics' />} />
      <Route path='/Basics' element={<Basics />} />
    </Routes>
  );
};
export default Routers;
