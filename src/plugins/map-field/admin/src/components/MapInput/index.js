import { TextInput } from '@strapi/design-system/TextInput';
import React, {useState, useEffect} from 'react';
import { Field, FieldHint, FieldError, FieldLabel, FieldInput } from '@strapi/design-system/Field';
import { useIntl } from 'react-intl';
import L from 'leaflet'
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'Leaflet/dist/leaflet.css';
import '../assets/leaflet.css'
import theIcon from 'leaflet/dist/images/marker-icon.png'

import LocationMarker from '../LocationMarker';


const MapInput = ({
  attribute,
  description,
  disabled,
  error,
  intlLabel,
  labelAction,
  name,
  onChange,
  required,
  value
}) => {
  
  const [position, setPosition] = useState(
    (!value) ? '' : JSON.parse(value)
  )
  const [centerPos, setCenterPos] = useState(
    (!position || Object.keys(position).length === 0) ? [51.505, -0.09] : [position.lat, position.lng]
  )
  const [markerIcon, setMarkerIcon] = useState('')
  
  console.log('getting', JSON.parse(null))
  useEffect(() => {
    const Licon = L.icon({iconUrl: theIcon})
    setMarkerIcon(Licon)
  }, [])

  useEffect(()=>{
    const positionJSON = JSON.stringify({...position});
    onChange({ target: { name, value: positionJSON }})
  }, [position])

  const { formatMessage } = useIntl();
  
  return (
    <Field
      name={name}
      id={name}
      error = {error}
      hint={description}
      required = {required}
    >
      <FieldLabel action={labelAction}>{formatMessage(intlLabel)}</FieldLabel>
      <MapContainer center={centerPos} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker iconMarker={markerIcon} position={position} setPosition={setPosition} value={value} />
      </MapContainer>
      <FieldInput
        id="map-value"
        value={value}
        placeholder="{json}"
        onChange={onChange}
        className = "mapInput"
      />
      <FieldHint />
      <FieldError />

    </Field>
  );
}

export default MapInput;