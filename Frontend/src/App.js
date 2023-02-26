import {Routes, Route, useNavigate} from 'react-router-dom';

import './App.css';
import GlobalStyles from './Components/GlobalStyles';
import { publicRoutes, privateRoutes } from './routes';
import { Fragment } from 'react';
import MainLayout from './Layout/MainLayout';
import Notification from './Components/Notification';
function App() {
  return (
    
    <GlobalStyles>
      <div className="App">
        <Routes>
          {publicRoutes.map((route,index) => {
            const Page = route.component;
            let Layout = MainLayout;

            if (route.layout) {
                Layout = route.layout;
            } else if (route.layout === null) {
                Layout = Fragment;
            }
            return <Route key={index} path={route.path} element={
              <Layout>
                {Page}
              </Layout>
            } />
          })}
          {privateRoutes.map((route,index) => {
              const Page = route.component;
              let Layout = route.layout;

              // if(route.layout === null){
              //   Layout = Fragment;
              // }

              // if (route.layout) {
              //     Layout = route.layout;
              // }
              // } else if (route.layout === null) {
              //     Layout = Fragment;
              // }
              return <Route key={index} path={route.path} element={
                <Layout>
                  {Page}
                </Layout>
              } />
            })}
          <Route path="*" element={<Notification message="Trang không tồn tại"/>} />
        </Routes>
      </div>
    </GlobalStyles>
  );
}

export default App;