import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
/* Version 6 use like this, No Switch, in Route use element instead of component */
import Home from "./Home";
import About from "./About";
class Body extends Component {
    state = {}
    render(){
        return(
        <Container>
            <Router>
            <Routes>

                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/about' element={<About/>}></Route>

            </Routes>
            </Router>
        </Container>
        );
    }
}
export default Body;