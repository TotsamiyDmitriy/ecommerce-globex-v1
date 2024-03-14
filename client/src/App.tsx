import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { About, Catalog, Home, Product, Profile, Cart } from './pages';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import Header from './components/Header';
import './app.scss';
import { Footer } from './components';
import PrivateRoute from './pages/PrivateRoute';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />}>
              <Route path=":id" element={<Catalog />} />
            </Route>
            <Route path="/about-us" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<Product />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
