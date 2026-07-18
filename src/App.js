import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import { PrivateRoute } from './components/PrivateRoute';
import { RestrictedRoute } from './components/RestrictedRoute';
import { refreshUser } from './redux/auth/operations';
import { selectIsRefreshing } from './redux/auth/selectors';

// Імпорт сторінок
import Login from './pages/Login';
import Register from './pages/Register';
import Contacts from './pages/Contacts';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      {/* Маршрут для реєстрації (тільки для неавторизованих) */}
      <Route
        path="/register"
        element={
          <RestrictedRoute redirectTo="/contacts" component={<Register />} />
        }
      />

      {/* Маршрут для логіну (тільки для неавторизованих) */}
      <Route
        path="/login"
        element={
          <RestrictedRoute redirectTo="/contacts" component={<Login />} />
        }
      />

      {/* Маршрут для контактів (тільки для авторизованих) */}
      <Route
        path="/contacts"
        element={
          <PrivateRoute redirectTo="/registr" component={<Contacts />} />
        }
      />

      {/* Редирект, якщо користувач зайшов на неіснуючу сторінку */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};