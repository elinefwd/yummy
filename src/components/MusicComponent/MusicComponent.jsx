import Audio from './Dinermusic.mp3'
import React from "react";
import  "./MusicComponent.css";

function Musicplayer() {

    const  [IsPlaying, setIsPlaying] = React.useState(false);

    const HandlePlay = () => {setIsPlaying (true);};
    const HandlePause =  () => {setIsPlaying (false);}

    return (
        <div>
            <audio src={Audio} controls={false} autoPlay={IsPlaying}/>
            <button onClick={HandlePlay}>Play</button>
            <button onClick={HandlePause}>Pause</button>
        </div>



)
}

export default Musicplayer;
;

