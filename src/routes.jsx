'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/pages/IndexPage';
import ContactPage from './components/pages/ContactPage';
import ContactListPage from './components/pages/ContactListPage';
import ContactEditPage from './components/pages/ContactEditPage';
import LoginPage from './components/pages/LoginPage';
import ProviderPage from './components/pages/ProviderPage';
import ProviderListPage from './components/pages/ProviderListPage';
import ProviderEditPage from './components/pages/ProviderEditPage';
import NotFoundPage from './components/pages/NotFoundPage';
import RegistrationPage from './components/pages/RegistrationPage';
import TabsPage from './components/pages/TabsPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="contacts" component={ContactListPage}/>
    <Route path="contacts/view/:contactId" component={ContactPage}/>
    <Route path="contacts/create" component={ContactEditPage}/>
    <Route path="contacts/edit/:contactId" component={ContactEditPage}/>
	<Route path="login" component={LoginPage}/>
    <Route path="providers" component={ProviderListPage}/>
	<Route path="providers/view/:providerId" component={ProviderPage}/>
	<Route path="providers/create" component={ProviderEditPage}/>
	<Route path="providers/edit/:providerId" component={ProviderEditPage}/>
	<Route path="register" component={RegistrationPage}/>
	<Route path="tabs" component={TabsPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
