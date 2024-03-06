import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { About, Catalog, Home, Product, Profile } from './pages';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Header from './components/Header';
import './app.scss';
import { Footer } from './components';
import PrivateRoute from './pages/PrivateRoute';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />}>
            <Route path=":id" element={<Catalog />} />
          </Route>
          <Route path="/about-us" element={<About />} />

          <Route path="/product/:id" element={<Product />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
