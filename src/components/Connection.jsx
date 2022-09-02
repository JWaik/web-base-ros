import React, {Component} from "react";
import Alert from "react-bootstrap/Alert";
import ROSLIB from "roslib";
import Config from "../scripts/config";

class Connection extends Component{
    state = {connected: false }

    constructor(){
        super(); //ros handler
        this.init_connection();
    }

    init_connection(){
        var ros = new ROSLIB.Ros();
        console.log(ros);
        ros.on("connection", ()=>{
            console.log("connection establish");
            this.setState({connected: true});
        });

        ros.on("close", () => {
            console.log("connection closed");
            this.setState({connected: false});

            // Try to reconnect every 3 second
            setTimeout(() => {
                try {
                    ros.connect("ws://" + Config.ROSBRIDGE_IP_server + ":" + Config.ROSBRIDGE_server_PORT);
                } catch(error) {
                    console.log("Connection Problem");
                }
            }, Config.RECONNECTION_TIMER);
        });

        try {
            ros.connect("ws://" + Config.ROSBRIDGE_IP_server + ":" + Config.ROSBRIDGE_server_PORT);
        } catch(error) {
            console.log("Connection Problem");
        }
        /*
        //this.setState({ros: new ROSLIB.Ros()});
        //this.state.ros = new ROSLIB.Ros();
        //console.log(this.state.ros);
        

        
        this.state.ros.on("connection", ()=>{
            console.log("connection establish");
            this.setState({connected: true});
        });

        this.state.ros.on("close", () => {
            console.log("connection closed");
            this.setState({connected: false});
        });

        try {
            this.state.ros.connect("ws://192.168.78.129:9090");
        } catch(error) {
            console.log("Connection Problem");
        }
        */
        
    }
    render(){
        return(
            <div>
                <Alert className="text-center m-3" variant={this.state.connected? "success": "danger"}>
                    {this.state.connected? "Robot Connected": "Robot Disconnected"}
                    </Alert>
            </div>
        );
    }
}
export default Connection;