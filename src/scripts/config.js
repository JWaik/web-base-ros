//Use to define parameters
//To use this config,use  "import Config object from ...." 
const Config ={
    ROSBRIDGE_IP_server: "192.168.78.129",
    ROSBRIDGE_server_PORT: "9090",
    RECONNECTION_TIMER: 3000,
    CMD_VEL_TOPIC: "/turtle1/cmd_vel"
}

export default Config; //Must export