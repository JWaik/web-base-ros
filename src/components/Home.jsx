import React, {Component} from "react";
import {Button} from "react-bootstrap"

class Home extends Component{
    state = { 
        /* "counter" variable 
        to use variable use >> {this.state.countercounter}
        */
        counter: 1,
    }

    /* button function that use in render() */
    increment_counter(){
        //this.state.counter = this.state.counter +1;
        //use this.setState to set state variable
        this.setState({counter:this.state.counter+1})
        console.log(this.state.counter);
    }

    render(){
        return(
        <main> 
        <h1 className="text-center mt-3">Robot Control Page</h1>
        <h5>Counter:
        <span>{this.state.counter}</span> 
        </h5>
        {/* span = same line
            Create button that use function increment_counter() when press it
        */}
        <Button onClick={() => this.increment_counter()}>Increment</Button>
        </main>
        );
    }
}
export default Home;
/* edit "main" in index.css */