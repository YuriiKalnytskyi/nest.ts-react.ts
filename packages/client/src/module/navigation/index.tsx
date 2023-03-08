import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../auth/component/login';
import { APP_KEYS } from '../common/constants';
import ExampleModule from '../example-module/example-module';

export const MainRouter = () => {
  return (
    <Routes>
      <Route path={APP_KEYS.ROUTER_KEYS.LOGIN} element={<Login />} />
      <Route path={APP_KEYS.ROUTER_KEYS.EXAMPLE} element={<ExampleModule />} />
      <Route path={'*'} element={<div>404 NOT Found</div>} />
    </Routes>
  );
};
