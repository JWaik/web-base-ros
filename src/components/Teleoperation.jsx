import React, {Component} from "react";
import { Joystick } from "react-joystick-component";
import ROSLIB from "roslib";
import Config from "../scripts/config";

class Teleoperation extends Component{

    state = { 
        ros: new ROSLIB.Ros()
    }
    // var from different files are independent, so must initialize again (or using advance tecnique)
    // using from Connection.jsx
    constructor(){
        super(); //ros handler
        this.init_connection();
        //must bind "this" to handle.Move
        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }
    
    init_connection(){
        this.state.ros.on("connection", ()=>{
            console.log("connection establish TELE");
            //console.log(ros);
            this.setState({connected: true});
        });
        this.state.ros.on("close", () => {
            console.log("connection closed");
            this.setState({connected: false});

            setTimeout(() => {
                try {
                    this.state.ros.connect("ws://" + Config.ROSBRIDGE_IP_server + ":" + Config.ROSBRIDGE_server_PORT);
                } catch(error) {
                    console.log("Connection Problem");
                }
            }, Config.RECONNECTION_TIMER);
        });
        try {
            this.state.ros.connect("ws://" + Config.ROSBRIDGE_IP_server + ":" + Config.ROSBRIDGE_server_PORT);
        } catch(error) {
            console.log("Connection Problem");
        }
    }
    //input event
    handleMove(event) {
        //console.log(this.state.ros);
        
        //Create Ros publisher on topic cmd_vel
        var cmd_vel = new ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: "geometry_msgs/Twist",
        });
        //console.log(this.state.ros);
        //Create payload Twist message to be sent to ROS
        var twist = new ROSLIB.Message({
            linear:{
                x: event.y/25,
                y: 0,
                z: 0,
            },
            angular:{
                x: 0,
                y: 0,
                z: -event.x/25,
            }
        });

        //Publish cmd_vel
        cmd_vel.publish(twist);
        
    }
    handleStop(){
        console.log("Stop");
        var cmd_vel = new ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: "geometry_msgs/Twist",
        });
        //console.log(this.state.ros);
        //Create payload Twist message to be sent to ROS
        var twist = new ROSLIB.Message({
            linear:{
                x: 0,
                y: 0,
                z: 0,
            },
            angular:{
                x: 0,
                y: 0,
                z: 0,
            }
        });

        //Publish cmd_vel
        cmd_vel.publish(twist);
    }

    render(){
        return(
            <div>
                <Joystick 
                size={100} 
                sticky={false} 
                baseColor="#EEEEEE" 
                stickColor="#BBBBBB" 
                move={this.handleMove} 
                stop={this.handleStop}>
                  </Joystick>
            </div>
        );
    }
}
export default Teleoperation;
/* edit "main" in index.css */