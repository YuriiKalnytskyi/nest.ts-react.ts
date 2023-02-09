import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { APP_KEYS } from '../common/constants';

import ExampleModule from '../example-module/example-module';

const LOGIN = () => {
  return <div>LOGIN</div>;
};

export const MainRouter = () => {
  return (
    <Routes>
      <Route path={APP_KEYS.ROUTER_KEYS.LOGIN} element={<LOGIN />} />
      <Route path={APP_KEYS.ROUTER_KEYS.EXAMPLE} element={<ExampleModule />} />
      <Route path={'*'} element={<div>404 NOT Found</div>} />
    </Routes>
  );
};
