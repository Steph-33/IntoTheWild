import React from 'react';
import { Route, Switch } from 'react-router';
import ProtectedRoutes from '../../components/ProtectedRoutes';
import Login from '../../pages/Login';
import Home from '../../pages/Home';
import Member from '../../pages/Members/Member';
import Article from '../../pages/Articles/Article';
import Live from '../../pages/Lives/Live';
import Album from '../../pages/Albums/Album';

export default function Routes() {
    return (
        <Switch>
            <ProtectedRoutes exact path="/home" component={Home}/>
            <ProtectedRoutes exact path="/member" component={Member}/>
            <ProtectedRoutes exact path="/article" component={Article}/>
            <ProtectedRoutes exact path="/live" component={Live}/>
            <ProtectedRoutes exact path="/album" component={Album}/>
            <Route exact path="/" component={Login}/>
        </Switch>
    )
}
