import { useEffect, useRef, useState } from 'react'
import { Avatar, Grid, Flex, Text,Box, Button, Badge, Skeleton, TextArea } from '@radix-ui/themes';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import NumberedDivIcon from './NumberedDivIcon';
import { SortableList } from './components';
import { ScrollArea } from 'radix-ui';
import '@radix-ui/themes/styles.css';
import 'leaflet/dist/leaflet.css';
import './App.css'
import './styles.css';
import './LeafletNumberedMarkers.css'

const zoom_default: number = 15

type PlaceInfo = {
  id: number;
  position: LatLngExpression;
  title: string;
  detail: string;
  src: string;
  address?: string;
  tags?: string[];
};

function getBadgeClassName(content: string) {
  if ((content.length)%5 == 0) return 'badge-mango';
  if ((content.length)%5 == 1) return 'badge-lagoon';
  if ((content.length)%5 == 2) return 'badge-palm';
  if ((content.length)%5 == 3) return 'badge-sunset';
  if ((content.length)%5 == 4) return 'badge-orchid';
  return 'gray'; // default
}

function ReverseGeocodeMarker({ addNewPlace }: { addNewPlace: (location: PlaceInfo) => void }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const plc: LatLngExpression = [lat, lng];
        var place = {
          id: 0,
          position: plc,
          title: "",
          detail: "",
          src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nocKS_n7LfYXrjscSLL_inNyakjdm3YMtFV0NZgHGQA0R2akgrcz3TrI-RrJxVAgVmdg7yAN8ywEZmYZK8UEff7q9cm4tUCWHoqp57KGA5c7Xsq8NnL3yOiLAe02Uz3GXDen0U=w408-h544-k-no",
        }
        addNewPlace(place)
      } catch (error) {
        console.error('Reverse geocoding failed:', error);
      }
    },
  });

  return null;
}

function App() {
  const plc1: LatLngExpression = [13.754817011352124, 100.50415849532308]; //วัด​ราชนัดดา
  const plc2: LatLngExpression = [13.7517728082884, 100.50127363590416]; //Sao Chingcha
  const plc3: LatLngExpression = [13.750012107239836, 100.49151212225372]; //The Grand Palace
  const plc4: LatLngExpression = [13.742037768953724, 100.50960937724595]; //China Town
  const plc5: LatLngExpression = [13.725474885078526, 100.5338972116344]; //Restaurant
  const plc6: LatLngExpression = [13.733148327431199, 100.5271507885528]; //Hotel
  const plc7: LatLngExpression = [13.735912709116183, 100.52462681828554]; //Cafe

  const markers: PlaceInfo[] = [
    { id: 1, position: plc1, title:"Wat Ratchanatdaram Worawihan", detail:"วัด​ราชนัดดารามวรวิหาร​",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nocKS_n7LfYXrjscSLL_inNyakjdm3YMtFV0NZgHGQA0R2akgrcz3TrI-RrJxVAgVmdg7yAN8ywEZmYZK8UEff7q9cm4tUCWHoqp57KGA5c7Xsq8NnL3yOiLAe02Uz3GXDen0U=w408-h544-k-no"
    },
    { id: 2, position: plc2, title:"Sao Chingcha", detail:"เสาชิงช้า",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4np6sSA4saMvYxbBlbZ0yvJC44Da6hz8DTkc44iGX8i8n1_XLQ_XVISvbJGLi_ayhY8k0gIX26qIl9M-__wTX_f5fohMH5DngaiQL9XTnWnIdwdi380JwPWJQ5nJ180F-mwoPvBxAw=w408-h725-k-no"
    },
    { id: 3, position: plc3, title:"The Grand Palace", detail:"พระบรมมหาราชวัง",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nojNwN-9BoahfZK7mGGJh2pazTiENSQH06r2MiOlIfcmHOjCRU2CePZ-uIeUcT1CX1Jo9WDBzOdlFrMXakp1w82BRCPOHCh0hbCoYZyzOEX5VdVD_k5op2vTc29gahLzcM2bcRcjA=w408-h272-k-no"
    },
    { id: 4, position: plc4, title:"China Town", detail:"ไชน่าทาวน์ (เยาวราช)",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nr3EvywM6eKq3FLgi19LxJ6PX8nR5BRAStTOHsJZszJzZ7dyIxkyRKVRjxwEl7cy5Ts4cYKy_ollUo1O2E1_nw3lr-s2QYh4diQ0PBS9Bt70g9sukwkKg4XJ-RY-O1K8kXwXFW5=w408-h306-k-no"
    },
    { id: 5, position: plc5, title:"EAT ME RESTAURANT", detail:"อีทมี เรสเตอรองท์",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nr0wwWWc8ZaFMwX6ol5XZmGjeS179fZldbEsY-G18DwHQB5bCG_b-sdlk41HViEk9ZdTu_HHQkxYjURMCROPBNp8gKPyTpusxmaqdfVGyhACAMR99967uuMq9RDztMt9gvHk3XRaw=w408-h306-k-no"
    },
    { id: 6, position: plc6, title:"Mandarin Hotel Bangkok, managed by Centre Point", detail:"โรงแรมแมนดาริน กรุงเทพฯ",
      src: "https://lh3.googleusercontent.com/p/AF1QipO47M8DCVLRu67siHMq6UHgX7DixyMI_iAIr4fE=w408-h279-k-no"
    },
    { id: 7, position: plc7, title:"White Flower Cafe", detail:"ครัวดอกไม้ขาว",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq5c2znLp8Y7yfXYB-lTB2x2KRnXFcBKV8nmbEEDfPOQsYWYskOE6aWe287ZyI8T-YShGihssVCc_7BqzHto-eSPyfhox2WacVs1AhzNAyc1Rl5_brDKPw-_mEh7a6a60qgMXTa=w408-h544-k-no"
    },
  ];
  const [items, setItems] = useState<PlaceInfo[]>(markers);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isAddNewItem, setIsAddNewItem] = useState<boolean|false>(false);
  
  const addNewPlace = (plc: any) => {
    plc.id = items.length+1
    setItems((prev) => [...prev, plc]); 
    setIsAddNewItem(true);
  };

  const removeItemById = (idToRemove: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== idToRemove));
  };

  // Auto-scroll to bottom when items change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [isAddNewItem]);

  useEffect(() => {
    const fetchAllLocations = async () => {
      var item = items[items.length-1]; 
      var updatedItem = null;
      const [lat, lon] = item.position.toString().split(',');
      try {
        const userAgent = { 'User-Agent': 'Journi/1.0',  };
        const acceptLangAll = { 'Accept-Language': '*' };
        const acceptLangEn = { 'Accept-Language': 'en' };
        const resEn = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`, 
          { headers: {...acceptLangEn, ...userAgent} },
        );
        const data = await resEn.json();
        
        const resLocal = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
          { headers: {...acceptLangAll, ...userAgent} },
        );
        const dataLocal = await resLocal.json();
        updatedItem = {
          ...item,
          title: (data.name ? data.name : "Untitled") as string,
          detail: (dataLocal.name === "" ? data.name : dataLocal.name) as string,
          address: data.display_name as string,
          tags: [data.type, data.class] as never[],
        };
      } catch (err) {
        console.error('Error fetching location:', err);
        updatedItem = item; 
      }

    items[items.length-1] = updatedItem as PlaceInfo;
    setItems([...items]);

    }
    fetchAllLocations();
    setIsAddNewItem(false);
  }, [isAddNewItem]);
  
  return (
    <>
      <Grid columns="2" gap="0" rows="1" width="auto">
          <MapContainer className="map" center={plc1} zoom={zoom_default} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ReverseGeocodeMarker addNewPlace={addNewPlace} />
            {items.map(({ id, position, title, detail }) => (
              <Marker key={id} position={position} icon={new NumberedDivIcon({number:id} as any)}>
                <Popup> 
                  {title} <br/> {detail} <br/>
                </Popup> 
              </Marker>
            ))}
          </MapContainer>
          <ScrollArea.Root className="ScrollAreaRoot">
          <ScrollArea.Viewport ref={scrollRef}  className="ScrollAreaViewport">
          <Flex direction="column" gap="2">
            <SortableList
              items={items}
              onChange={setItems}
              renderItem={(item) => (
                <SortableList.Item id={item.id}>
                  <Flex direction="row" gap="1">
                    <div className='bin' onClick={() => removeItemById(item.id)}>
                      <img src={"./src/assets/bin.png"}/>
                    </div>
                    <div>
                      <img src={"./src/assets/map-pin.png"}/>
                      <div className="pin-on-card">
                        {item.id}
                      </div>
                    </div>
                    <Avatar size="3" src={item.src} radius="large" fallback="J" />
                    
                    {item.title === "" ? (
                    <Box className="item-content">
                      <Text as="div" size="2" className="item-title">
                        <Skeleton  className="item-title">
                          Lorem ipsum dolor sit amet,<br/>
                        </Skeleton>
                      </Text>

                      <Text as="div" size="2" className="item-detail">
                        <Skeleton>
                          consectetur adipiscing elit.<br/>
                        </Skeleton>
                      </Text>

                      <Text as="div" size="1" className="item-address">
                        <Skeleton className="item-address">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque felis 
                          erat, fringilla sed commodo sed, aliquet nec magna.
                        </Skeleton>
                        </Text>
                      <Skeleton>
                        <TextArea className="user-notes" size="1" radius="large" placeholder="What to do, see, or things to avoid?…" />
                      </Skeleton>
                    </Box>
                    ) : (
                    <Box className="item-content">
                      <Text as="div" className="item-title">
                        {item.title}
                      </Text>
                      <Text as="div" className="item-detail">
                        {item.detail}
                      </Text>
                        <Flex gap="2">
                          {(item.tags ?? []).map(( tag ) => (
                            <Badge className={getBadgeClassName(tag.replaceAll("_", " ") )} key={tag}>
                              {tag.replaceAll("_", " ")}
                            </Badge>
                          ))}
                        </Flex>
                        <Text as="div" size="1" className="item-address">
                          {item.address}
                        </Text>                        
                      <TextArea className="user-notes" size="1" radius="large" placeholder="What to do, see, or things to avoid?…" />
                    </Box>
                    )}
                  </Flex>
                  <SortableList.DragHandle />
                </SortableList.Item>
              )}
            />
          </Flex>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical" >
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal" >
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
      </Grid>
    </>
  )
}

export default App
