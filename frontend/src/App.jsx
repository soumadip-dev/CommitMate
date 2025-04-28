import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './components/Body';
import Feed from './components/Feed';
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
            {/* Hero page for root path */}
            <Route path="/" element={<Hero />} />

            {/* /app path with nested routes */}
            <Route path="/app" element={<Body />}>
              <Route index element={<Feed />} />
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
              <Route path="feed" element={<Feed />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
