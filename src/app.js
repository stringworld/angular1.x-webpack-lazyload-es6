import 'bootstrap/dist/css/bootstrap.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import routerextras from './app.routerextras'


import routing from './app.config';
import initial from './app.initial';

import home from './features/home';
import page1 from './pages/page1/page1';
import page2 from './pages/page2/page2';

angular.module('app', [uirouter,routerextras,home,page1,page2])
  .run(initial)
  .config(routing);
