import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import App from './App';
import Admin from './admin';
import Common from './common';
import Login from './pages/login';
import Home from './pages/home';
import NoMatch from './pages/nomatch';

import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notifications from './pages/ui/notification';
import Message from './pages/ui/messages';
import Tab from './pages/ui/tab';
import Gallery from './pages/ui/gallery';
import Carousel from './pages/ui/carousel';

import FormLogin from './pages/form/login';
import Register from './pages/form/register';

import TableBasic from './pages/table/basic';
import TableHigh from './pages/table/high';

import City from './pages/city';
import Order from './pages/order';
import OrderDetail from './pages/order/detail';
import User from './pages/user';
import BikeMap from './pages/map';

import Bar from './pages/charts/bar';
import Pie from './pages/charts/pie';
import Line from './pages/charts/line';

import Permission from './pages/permission';
import Rich from './pages/rich';

class IRouter extends Component {

  getAdminRouter = () => {
    return (
      <Admin>
        <Switch>
          <Route path="/admin/home" component={Home} />
          <Route path="/admin/ui/buttons" component={Buttons} />
          <Route path="/admin/ui/modals" component={Modals} />
          <Route path="/admin/ui/loadings" component={Loadings} />
          <Route path="/admin/ui/notification" component={Notifications}/>
          <Route path="/admin/ui/messages" component={Message}/>
          <Route path="/admin/ui/tabs" component={Tab}/>
          <Route path="/admin/ui/gallery" component={Gallery}/>
          <Route path="/admin/ui/carousel" component={Carousel}/>

          <Route path="/admin/form/login" component={FormLogin}/>
          <Route path="/admin/form/reg" component={Register}/>
          
          <Route path="/admin/table/basic" component={TableBasic}/>
          <Route path="/admin/table/high" component={TableHigh}/>
          <Route path="/admin/city" component={City}/>
          <Route path="/admin/order" component={Order}/>
          <Route path="/admin/user" component={User}/>
          <Route path="/admin/bikeMap" component={BikeMap}/>

          <Route path="/admin/charts/bar" component={Bar}/>
          <Route path="/admin/charts/pie" component={Pie} />
          <Route path="/admin/charts/line" component={Line} />

          <Route path="/admin/permission" component={Permission}/>
          <Route path="/admin/rich" component={Rich}/>

          <Route path="*" component={NoMatch} />
          <Redirect to="/admin/home"/>
        </Switch>
      </Admin>
    )
  }

  render () {
    let AdminRouter = this.getAdminRouter();

    return (
      <LocaleProvider locale={zh_CN}>
        <HashRouter>
          <App>
            <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/common" render={() => 
                <Common>
                  <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
                </Common>
              }/>

              <Route path="/admin" render={() => 
                {
                  return AdminRouter
                }
              }></Route>

              <Redirect to="/admin/home"/>
            </Switch>
          </App>
        </HashRouter>
      </LocaleProvider>
    )
  }
};

export default IRouter;
