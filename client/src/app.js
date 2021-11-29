import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom"
import { useContext } from 'react'
import { Context } from "./context/Context"
import TopBar from "./components/topbar"
import Home from "./pages/home"
import Single from "./pages/single"
import Write from "./pages/write"
import Settings from "./pages/settings"
import Login from "./pages/login"
import Register from "./pages/register"
import './app.css'

export default function App(params) {
    const { user } = useContext(Context)
    return(
        <Router>
            <TopBar/>
            <Switch>
                <Route exact path="/">
                    <Home/> 
                </Route>
                <Route path="/login">
                    {user ? <Home/> : <Login/>}
                </Route>
                <Route path="/register">
                    {user ? <Home/> : <Register/>}
                </Route>
                <Route path="/write">
                    {user ? <Write/> : <Login/>}
                </Route>
                <Route path="/settings">
                    {user ? <Settings/> : <Login/>}
                </Route>
                <Route path="/post/:postId">
                    <Single/>
                </Route>
            </Switch>
        </Router>
    )
}