import React, { lazy, Suspense } from 'react';

const LazyUsers = lazy(() => import('./Users'));

const Users = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyUsers {...props} />
  </Suspense>
);

export default Users;
