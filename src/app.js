import 'bootstrap/dist/css/bootstrap.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import routerextras from './common/js/app.routerextras'
import ocLazyLoad from 'ocLazyLoad'


import routing from './app.config';
import initial from './app.initial';


//routers
import home from './features/home';
import routes from './pages/index';


let app = angular.module('app', [uirouter, routerextras, ocLazyLoad, home])
  .run(initial)
  .config(routing);

routes.forEach((ele, index) => {
  app.config(ele);
})



if (module.hot) {
  //module.hot.accept();
  module.hot.status(function (newStatus, oldStatus) {
    console.log('***' + newStatus)
    document.location.reload(true)
  });
}
