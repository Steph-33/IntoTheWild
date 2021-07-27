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
import LivesList from '../../pages/Lives/LivesList';
import Member from '../../pages/Members/Member';
import MembersList from '../../pages/Members/MembersList';
import Picture from '../../pages/Pictures/Picture';
import PicturesList from '../../pages/Pictures/PicturesList';
import Video from '../../pages/Videos/Video';
import VideosList from '../../pages/Videos/VideosList';

export default function Routes() {
    return (
        <Switch>
            <ProtectedRoutes exact path="/home" component={Home}/>
            <ProtectedRoutes exact path="/album" component={Album}/>
            <ProtectedRoutes exact path="/albums" component={AlbumsList}/>
            <ProtectedRoutes exact path="/article" component={Article}/>
            <ProtectedRoutes exact path="/articles" component={ArticlesList}/>
            <ProtectedRoutes exact path="/live" component={Live}/>
            <ProtectedRoutes exact path="/lives" component={LivesList}/>
            <ProtectedRoutes exact path="/member" component={Member}/>
            <ProtectedRoutes exact path="/members" component={MembersList}/>
            <ProtectedRoutes exact path="/picture" component={Picture}/>
            <ProtectedRoutes exact path="/pictures" component={PicturesList}/>
            <ProtectedRoutes exact path="/video" component={Video}/>
            <ProtectedRoutes exact path="/videos" component={VideosList}/>
            <Route exact path="/" component={Login}/>
        </Switch>
    )
}
