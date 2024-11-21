import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../../pages/Admin/Dashboard/Dashboard'; // Ensure correct casing
import Inventory from '../../../pages/Admin/Inventory/Inventory'; // Ensure correct casing
import Orders from '../../../pages/Admin/Orders/Orders'; // Ensure correct casing
import Customers from '../../../pages/Admin/Customers/Customers'; // Ensure correct casing

export const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/customers' element={<Customers />} />
      </Routes>
    </div>
  );
};

// Add the default export
export default AppRoutes;
