import 'bootstrap/dist/css/bootstrap.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import routerextras from './app.routerextras'
import ocLazyLoad from 'ocLazyLoad'


import routing from './app.config';
import initial from './app.initial';


//routers
import home from './features/home';


angular.module('app', [uirouter, routerextras,ocLazyLoad, home])
  .run(initial)
  .config(routing);

if (module.hot) {
  //module.hot.accept();
  module.hot.status(function (newStatus, oldStatus) {
    console.log('***'+newStatus)
    document.location.reload(true)   
  });
}
