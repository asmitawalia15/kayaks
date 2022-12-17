import React, { Fragment, Component } from 'react';
import './App.css';
// import Home from './components/Home';
// import SingleProduct from './components/SingleProduct';
import Homenew from './components/Homenew';
import SingleProductNew from './components/SingleProductNew';
import UpdateProduct from './components/UpdateProduct';
import InnerLayout from './layout/InnerLayout';
import { RouteWithLayout } from './layout/RouteWithLayout';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <RouteWithLayout layout={InnerLayout}  exact={true} path="/" component={Homenew} />
        <RouteWithLayout layout={InnerLayout}  exact={true} path="/single/:id" component={SingleProductNew} />
        <RouteWithLayout layout={InnerLayout}  exact={true} path="/update-product/:id" component={UpdateProduct} />
      </Router>
    </div>
  );
}

export default App;
