import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './components/Body';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Login from './components/Login';
import Profile from './components/Profile';
import appStore from './utils/appStore';

const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route
                index
                element={
                  <>
                    <Hero />
                    <Footer />
                  </>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
