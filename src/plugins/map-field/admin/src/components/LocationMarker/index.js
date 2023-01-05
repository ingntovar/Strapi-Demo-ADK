import React, {useState, useEffect} from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet'


const LocationMarker = ({iconMarker, position, setPosition, value}) => {  
  const map = useMapEvents({
    click(e){
      setPosition(e.latlng)
    }
  })

  return (!position || Object.keys(position).length === 0) ? null : (
    <Marker position={position} icon={iconMarker}>
      <Popup>Point selected</Popup>
    </Marker>
  )
}

export default LocationMarker
