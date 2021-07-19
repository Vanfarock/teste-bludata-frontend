import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import NavbarComponent from './components/navbar';
import ProvidersList from './pages/providersList/index';
import ProviderForm from './pages/providerForm/index';
import CompanyForm from './pages/companyForm/index';
import CompaniesList from './pages/companiesList/index';

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Switch>
        <Route path="/fornecedores/:id" component={ProviderForm} />
        <Route path="/fornecedores" component={ProvidersList} />

        <Route path="/empresas/:id" component={CompanyForm} />
        <Route path="/empresas" component={CompaniesList} />

        <Redirect to="/fornecedores" />
      </Switch>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
