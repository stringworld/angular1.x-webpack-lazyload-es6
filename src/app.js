import 'bootstrap/dist/css/bootstrap.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import oclazyload from 'oclazyload';

import routing from './app.config';
import initial from './app.initial';

import home from './features/home';
import page1 from './pages/page1/page1';

angular.module('app', [uirouter,oclazyload,home,page1])
  .run(initial)
  .config(routing);
