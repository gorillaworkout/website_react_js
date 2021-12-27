import React, { useState ,useEffect} from 'react'
import { Map, Draggable } from "pigeon-maps";
import Sealant from '../../Assets/icon_header/login.png'
import './map.css'
import Geocode from "react-geocode";
export default function PigeonMap(){

    const [anchor, setAnchor] = useState([-6.2448148, 106.7978526]);
    const [longlat,setLongLat]= useState([])
    const [longitude,setLongitude]=useState('')
    const [latitude,setLatitude]=useState('')
    const [isLoading,setIsLoading]=useState(true)
    const [address,setAddress]=useState('')
    Geocode.setApiKey("AIzaSyBQFCGbZcy-XyvOBd0fiQSFOVzrXnp63No");
    Geocode.setRegion("id");
    Geocode.setLocationType("ROOFTOP");

    // Enable or disable logs. Its optional.
    Geocode.enableDebug();
    // Get address from latitude & longitude.
    
    const find_address =()=>{
        Geocode.fromLatLng(`${latitude}`, `${longitude}`).then(
            (response) => {
                console.log(response)
              const address = response.results[0].formatted_address;
              console.log(address)
              setAddress(address)
              setIsLoading(false)
            },
            (error) => {
              console.error(error);
            }
        );

    }      
      useEffect(()=>{
          if(latitude === '' && longitude === ''){
              console.log('masuk ke if line 39')
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position)
                console.log(position.coords.longitude)
                console.log(position.coords.latitude)
                // find_address()
                setLongitude(position.coords.longitude)
                setLatitude(position.coords.latitude)
                setIsLoading(false)
                // console.log("Latitude is :", position.coords.latitude);
                // console.log("Longitude is :", position.coords.longitude);
                });
          }else {
              console.log('masuk ke else line 50')
          }
    })
    if(isLoading){
        return (
            <p>LOADING CK</p>
        )
    }
    return (
        <> 
         <Map height={300} defaultCenter={[-6.2448148, 106.7978526]} defaultZoom={11}>
            <Draggable offset={[60, 87]} anchor={anchor} onDragEnd={setAnchor}>
                <img src={Sealant} width={100} height={95} alt="Pigeon!" />
            </Draggable>
        </Map>

        <div className="box-longlat">
            {anchor}
            {address}
        </div>
        </>
    )
}