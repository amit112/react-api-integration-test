import React, { lazy, Suspense } from 'react';

const LazyArticles = lazy(() => import('./Articles'));

const Articles = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyArticles {...props} />
  </Suspense>
);

export default Articles;
