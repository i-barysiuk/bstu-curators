import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Menu from './Components/Menu';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
<Router>
    <Route  path="/"         component={Menu}/>
    <Route  path="/home"     component={Menu}/>
    <Route  path="/profil"   component={Menu}/>
    <Route  path="/groups"   component={Menu}/>
    <Route  path="/other"    component={Menu}/>
    <Route  path="/calendar" component={Menu}/>
    <Route  path="/raports"  component={Menu}/>
    <Route  path="/settings" component={Menu}/>
</Router>
, document.getElementById('Menu'));

// component={Profil}  
// component={Home}    
// component={Groups}  
// component={Other}   
// component={Calendar}
// component={Raports} 
// component={Settings}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
