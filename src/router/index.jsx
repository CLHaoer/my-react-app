import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from '../layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Articles from '../pages/Articles';
import ArticleDetail from '../pages/ArticleDetail';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'articles',
        element: <Articles />,
      },
      {
        path: 'articles/:id',
        element: <ArticleDetail />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
