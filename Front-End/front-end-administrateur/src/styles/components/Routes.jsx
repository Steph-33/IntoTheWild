import React from 'react';
import { Route, Switch } from 'react-router';
import ProtectedRoutes from '../../components/ProtectedRoutes';
import Login from '../../pages/Login';
import Home from '../../pages/Home';
import Member from '../../pages/Members/Member';

export default function Routes() {
    return (
        <Switch>
            <ProtectedRoutes exact path="/home" component={Home}/>
            <ProtectedRoutes exact path="/member" component={Member}/>
            <Route exact path="/" component={Login}/>
        </Switch>
    )
}
