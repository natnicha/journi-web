import { useState } from 'react'
import './App.css'
import { Flex, Text,Box, Button} from "@radix-ui/themes";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "@radix-ui/themes/styles.css";
import 'leaflet/dist/leaflet.css';
import type { LatLngExpression } from 'leaflet';

const center: LatLngExpression = [13.7563, 100.5018];
const center2: LatLngExpression = [13.754869105770162, 100.50415499999998];
const zoom_default: number = 14
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Flex direction="column" gap="2">
      <Box>
        <MapContainer className="map" center={center} zoom={zoom_default} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker position={center2}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </Box>
    </Flex>
    <Flex direction="column" gap="2">
      <Text>Hello from Radix Themes :)</Text>
      <Button>Let's go</Button>
    </Flex>
    </>
  )
}

export default App
