import React from 'react';
import { Route, Switch } from 'react-router';
import ProtectedRoutes from '../../components/ProtectedRoutes';
import Login from '../../pages/Login';
import Home from '../../pages/Home';
import Album from '../../pages/Albums/Album';
import AlbumsList from '../../pages/Albums/AlbumsList';
import Article from '../../pages/Articles/Article';
import ArticlesList from '../../pages/Articles/ArticlesList';
import Live from '../../pages/Lives/Live';
import Member from '../../pages/Members/Member';
import Picture from '../../pages/Pictures/Picture';
import Video from '../../pages/Videos/Video';

export default function Routes() {
    return (
        <Switch>
            <ProtectedRoutes exact path="/home" component={Home}/>
            <ProtectedRoutes exact path="/album" component={Album}/>
            <ProtectedRoutes exact path="/albums" component={AlbumsList}/>
            <ProtectedRoutes exact path="/article" component={Article}/>
            <ProtectedRoutes exact path="/articles" component={ArticlesList}/>
            <ProtectedRoutes exact path="/live" component={Live}/>
            <ProtectedRoutes exact path="/member" component={Member}/>
            <ProtectedRoutes exact path="/picture" component={Picture}/>
            <ProtectedRoutes exact path="/video" component={Video}/>
            <Route exact path="/" component={Login}/>
        </Switch>
    )
}
