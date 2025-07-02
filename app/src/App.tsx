import { useEffect, useState } from 'react'
import { Avatar, Grid, Flex, Text,Box, Button, ScrollArea } from "@radix-ui/themes";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import NumberedDivIcon from './NumberedDivIcon';
import { SortableList } from "./components";
import './App.css'
import "@radix-ui/themes/styles.css";
import 'leaflet/dist/leaflet.css';
import './LeafletNumberedMarkers.css'

const zoom_default: number = 15

type PlaceInfo = {
  id: number;
  position: LatLngExpression;
  title: string;
  detail: string;
  src: string;
  address?: string;
  type?: string[];
};

function App() {
  const plc1: LatLngExpression = [13.754869105770162, 100.50415499999998]; //วัด​ราชนัดดา
  const plc2: LatLngExpression = [13.752178093933455, 100.50114226242297]; //Sao Chingcha
  const plc3: LatLngExpression = [13.750012107239836, 100.49151212225372]; //The Grand Palace
  const plc4: LatLngExpression = [13.742037768953724, 100.50960937724595]; //China Town

  const markers = [
    { id: 1, position: plc1, title:"Wat Ratchanatdaram Worawihan", detail:"วัด​ราชนัดดารามวรวิหาร​",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nocKS_n7LfYXrjscSLL_inNyakjdm3YMtFV0NZgHGQA0R2akgrcz3TrI-RrJxVAgVmdg7yAN8ywEZmYZK8UEff7q9cm4tUCWHoqp57KGA5c7Xsq8NnL3yOiLAe02Uz3GXDen0U=w408-h544-k-no"
      , address: ""
      , types: []
    },
    { id: 2, position: plc2, title:"Sao Chingcha", detail:"เสาชิงช้า",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4np6sSA4saMvYxbBlbZ0yvJC44Da6hz8DTkc44iGX8i8n1_XLQ_XVISvbJGLi_ayhY8k0gIX26qIl9M-__wTX_f5fohMH5DngaiQL9XTnWnIdwdi380JwPWJQ5nJ180F-mwoPvBxAw=w408-h725-k-no"
      , address: ""
      , types: []
    },
    { id: 3, position: plc3, title:"The Grand Palace", detail:"พระบรมมหาราชวัง",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nojNwN-9BoahfZK7mGGJh2pazTiENSQH06r2MiOlIfcmHOjCRU2CePZ-uIeUcT1CX1Jo9WDBzOdlFrMXakp1w82BRCPOHCh0hbCoYZyzOEX5VdVD_k5op2vTc29gahLzcM2bcRcjA=w408-h272-k-no"
      , address: ""
      , types: []
    },
    { id: 4, position: plc4, title:"China Town", detail:"ไชน่าทาวน์ (เยาวราช)",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nr3EvywM6eKq3FLgi19LxJ6PX8nR5BRAStTOHsJZszJzZ7dyIxkyRKVRjxwEl7cy5Ts4cYKy_ollUo1O2E1_nw3lr-s2QYh4diQ0PBS9Bt70g9sukwkKg4XJ-RY-O1K8kXwXFW5=w408-h306-k-no"
      , address: ""
      , types: []
    },
  ];
  const [items, setItems] = useState(markers);
  
  useEffect(() => {
    const fetchAllLocations = async () => {
      const updatedItems = await Promise.all(
        items.map(async (item) => {
          const [lat, lon] = item.position.toString().split(',');
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
              {
                headers: {
                  'User-Agent': 'Journi/1.0',
                },
              }
            );
            const data = await res.json();
            return {
              ...item,
              address: data.display_name as string,
              types: [...item.types, data.type] as  never[],
            };
          } catch (err) {
            console.error('Error fetching location:', err);
            return item; 
          }
        })
      );
      console.log(updatedItems)
      setItems(updatedItems);
    };

    fetchAllLocations();
  }, []);

  return (
    <>
    <Flex direction="column" gap="3">
      <Grid columns="2" gap="3" rows="1" width="auto">
        <Box>
          <MapContainer className="map" center={plc1} zoom={zoom_default} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map(({ id, position, title, detail }) => (
              <Marker key={id} position={position} icon={new NumberedDivIcon({number:id} as any)}>
                <Popup> 
                  {title} <br/> {detail} <br/>
                </Popup> 
              </Marker>
            ))}
          </MapContainer>
        </Box>
        <ScrollArea type="always" scrollbars="vertical" style={{ height: 400 }}>
          <Flex direction="column" gap="2">
            <SortableList
              items={items}
              onChange={setItems}
              renderItem={(item) => (
                <SortableList.Item id={item.id}>
                  <Flex direction="row" gap="3">
                    <div>
                      <img src={"./src/assets/map-pin.png"}/>
                      <div className="pin-on-card">
                        {item.id}
                      </div>
                    </div>
                    <Avatar size="3" src={item.src} radius="large" fallback="J" />
                    <Box>
                      <Text as="div" size="2" weight="bold" className="item-detail">
                        {item.title}
                      </Text>
                      <Text as="div" size="2" color="gray" className="item-detail">
                        {item.detail}
                      </Text>
                      <Text as="div" size="2" color="gray" className="item-detail">
                        <strong>Type:</strong> <br />
                        {item.types} <br />
                        {item.address}
                      </Text> 
                    </Box>
                  </Flex>
                  <SortableList.DragHandle />
                </SortableList.Item>
              )}
            />
          </Flex>
        </ScrollArea>
      </Grid>
      <Flex direction="column" gap="2">
        <Button>Plan it!</Button>
      </Flex>
    </Flex>
    </>
  )
}

export default App
