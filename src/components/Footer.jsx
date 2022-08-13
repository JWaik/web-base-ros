import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
class Footer extends Component{
    state = { }
    render(){
        return(
        <Container className="text-center"> {/* Move text to center */}
        <p>JWaik &copy; 2022</p>
        </Container>
        );
    }
}
export default Footer;