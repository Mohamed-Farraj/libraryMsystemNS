// MainRouter.js

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { router } from '../router'; // Assuming your router file is located in the '../router' directory
import Liberarian from './Liberarian'; // Import the Liberarian component

const MainRouter = () => {
  return (
    <Router>
      {/* Include the router configuration directly */}
      {router.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={route.element}
        />
      ))}
      {/* Add a route for the Liberarian component */}
      <Route path="/liberarian" element={<Liberarian />} />
    </Router>
  );
};

export default MainRouter;
