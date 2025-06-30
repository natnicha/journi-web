import { useState } from 'react'
import './App.css'
import { Card, Avatar, Grid, Flex, Text,Box, Button} from "@radix-ui/themes";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "@radix-ui/themes/styles.css";
import 'leaflet/dist/leaflet.css';
import type { LatLngExpression } from 'leaflet';

const center2: LatLngExpression = [13.754869105770162, 100.50415499999998]; 
const center: LatLngExpression = [13.752178093933455, 100.50114226242297]; //Sao Chingcha
const gradePalace: LatLngExpression = [13.750012107239836, 100.49151212225372]; //The Grand Palace

const zoom_default: number = 15
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Flex direction="column" gap="3">
      <Grid columns="2" gap="3" rows="1" width="auto">
        <Box>
          <MapContainer className="map" center={center} zoom={zoom_default} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center}>
              <Popup>
                Wat Ratchanatdaram Worawihan <br /> วัด​ราชนัดดารามวรวิหาร​
              </Popup>
            </Marker>
            <Marker position={center2}>
              <Popup>
                Sao Chingcha (the Giant Swing) <br /> เสาชิงช้า
              </Popup>
            </Marker>
            <Marker position={gradePalace}>
              <Popup>
                The Grand Palace <br /> พระบรมมหาราชวัง
              </Popup>
            </Marker>
          </MapContainer>
        </Box>
        <Flex direction="column" gap="2">
          <Card size="1">
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nocKS_n7LfYXrjscSLL_inNyakjdm3YMtFV0NZgHGQA0R2akgrcz3TrI-RrJxVAgVmdg7yAN8ywEZmYZK8UEff7q9cm4tUCWHoqp57KGA5c7Xsq8NnL3yOiLAe02Uz3GXDen0U=w408-h544-k-no"
                radius="full"
                fallback="T"
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  Wat Ratchanatdaram Worawihan
                </Text>
                <Text as="div" size="2" color="gray">
                  วัด​ราชนัดดารามวรวิหาร​
                </Text>
              </Box>
            </Flex>
          </Card>
          <Card size="1">
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4np6sSA4saMvYxbBlbZ0yvJC44Da6hz8DTkc44iGX8i8n1_XLQ_XVISvbJGLi_ayhY8k0gIX26qIl9M-__wTX_f5fohMH5DngaiQL9XTnWnIdwdi380JwPWJQ5nJ180F-mwoPvBxAw=w408-h725-k-no"
                radius="full"
                fallback="T"
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  Sao Chingcha
                </Text>
                <Text as="div" size="2" color="gray">
                  เสาชิงช้า
                </Text>
              </Box>
            </Flex>
          </Card>
          <Card size="1">
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nojNwN-9BoahfZK7mGGJh2pazTiENSQH06r2MiOlIfcmHOjCRU2CePZ-uIeUcT1CX1Jo9WDBzOdlFrMXakp1w82BRCPOHCh0hbCoYZyzOEX5VdVD_k5op2vTc29gahLzcM2bcRcjA=w408-h272-k-no"
                radius="full"
                fallback="T"
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  The Grand Palace
                </Text>
                <Text as="div" size="2" color="gray">
                  พระบรมมหาราชวัง
                </Text>
              </Box>
            </Flex>
          </Card>
          <Card size="1">
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nojNwN-9BoahfZK7mGGJh2pazTiENSQH06r2MiOlIfcmHOjCRU2CePZ-uIeUcT1CX1Jo9WDBzOdlFrMXakp1w82BRCPOHCh0hbCoYZyzOEX5VdVD_k5op2vTc29gahLzcM2bcRcjA=w408-h272-k-no"
                radius="full"
                fallback="T"
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  The Grand Palace
                </Text>
                <Text as="div" size="2" color="gray">
                  พระบรมมหาราชวัง
                </Text>
              </Box>
            </Flex>
          </Card>
        </Flex>
      </Grid>
      <Flex direction="column" gap="2">
        <Button>Plan it!</Button>
      </Flex>
    </Flex>
    </>
  )
}

export default App
