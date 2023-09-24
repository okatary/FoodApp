import './App.css';
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import RequireAuth from './features/auth/RequireAuth'
import RequireNotAuth from './features/auth/RequireNotAuth'
import Login from './features/auth/Login.js'
import FoodItemsList from './features/foodItems/FoodItemsList.js'
import Order from './features/orders/Order.js'
import Register from './features/auth/Register.js'
import Container from '@mui/material/Container';

function App() {
  return (
    <Container maxWidth="xl">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}

          <Route element={<RequireNotAuth />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route index element={<FoodItemsList />} />
            <Route path="foodItems" element={<FoodItemsList />} />
            <Route path="currentOrder" element={<Order />} />
          </Route>

        </Route>
      </Routes>
    </Container>
  );
}

export default App;
