import { useRef, useState } from 'react'
import { Avatar, Flex, Text,Box, Badge, TextArea } from '@radix-ui/themes';
import type { LatLngExpression } from 'leaflet';
import { ScrollArea } from 'radix-ui';
import type { PlaceInfo } from './PlaceInfo';
import { TripDatePicker } from './TripDatePicker';
import { SortableList } from './components';
import { MapContainerComponent } from './MapContainer';
import { ItemContentSkeleton } from './ItemContentSkeleton';
import { getMarkerSrc } from './Marker';
import '@radix-ui/themes/styles.css';
import 'react-day-picker/dist/style.css';
import 'leaflet/dist/leaflet.css';
import './App.css'
import './styles.css';
import './LeafletNumberedMarkers.css'

function getBadgeClassName(content: string) {
  if ((content.length)%5 == 0) return 'badge-mango';
  if ((content.length)%5 == 1) return 'badge-lagoon';
  if ((content.length)%5 == 2) return 'badge-palm';
  if ((content.length)%5 == 3) return 'badge-sunset';
  if ((content.length)%5 == 4) return 'badge-orchid';
  return 'gray'; // default
}

function App() {
  const plc1: LatLngExpression = [13.754817011352124, 100.50415849532308]; //วัด​ราชนัดดา
  const plc2: LatLngExpression = [13.7517728082884, 100.50127363590416]; //Sao Chingcha
  const plc3: LatLngExpression = [13.750012107239836, 100.49151212225372]; //The Grand Palace
  const plc4: LatLngExpression = [13.742037768953724, 100.50960937724595]; //China Town
  const plc5: LatLngExpression = [13.725474885078526, 100.5338972116344]; //Restaurant
  const plc6: LatLngExpression = [13.733148327431199, 100.5271507885528]; //Hotel
  const plc7: LatLngExpression = [13.735912709116183, 100.52462681828554]; //Cafe
  const plc8: LatLngExpression = [13.741696859976935, 100.4963759526378]; //Pak Khlong Talat (Flower Market)
  const plc9: LatLngExpression = [13.737331527286672, 100.49547754359172]; //Wat Prayurawongsawas Worawihan
  const plc10: LatLngExpression = [13.736647292410602, 100.49946429489435]; //Princess Mother Memorial Park
  const plc11: LatLngExpression = [13.737392014744712, 100.50011779614503]; //Guan Yu Shrine (Khlong San)

  const markers: PlaceInfo[] = [
    { day: 1, date: '7/1/2025', isStartSection:true, id: 1, order:1, position: plc1, title:"Wat Ratchanatdaram Worawihan", detail:"วัด​ราชนัดดารามวรวิหาร​",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nocKS_n7LfYXrjscSLL_inNyakjdm3YMtFV0NZgHGQA0R2akgrcz3TrI-RrJxVAgVmdg7yAN8ywEZmYZK8UEff7q9cm4tUCWHoqp57KGA5c7Xsq8NnL3yOiLAe02Uz3GXDen0U=w408-h544-k-no"
    },
    { day: 1, date: '7/1/2025', id: 2, order:2, position: plc2, title:"Sao Chingcha", detail:"เสาชิงช้า",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4np6sSA4saMvYxbBlbZ0yvJC44Da6hz8DTkc44iGX8i8n1_XLQ_XVISvbJGLi_ayhY8k0gIX26qIl9M-__wTX_f5fohMH5DngaiQL9XTnWnIdwdi380JwPWJQ5nJ180F-mwoPvBxAw=w408-h725-k-no"
    },
    { day: 1, date: '7/1/2025', id: 3, order:3, position: plc3, title:"The Grand Palace", detail:"พระบรมมหาราชวัง",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nojNwN-9BoahfZK7mGGJh2pazTiENSQH06r2MiOlIfcmHOjCRU2CePZ-uIeUcT1CX1Jo9WDBzOdlFrMXakp1w82BRCPOHCh0hbCoYZyzOEX5VdVD_k5op2vTc29gahLzcM2bcRcjA=w408-h272-k-no"
    },
    { day: 1, date: '7/1/2025', id: 4, order:4, position: plc4, title:"China Town", detail:"ไชน่าทาวน์ (เยาวราช)",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nr3EvywM6eKq3FLgi19LxJ6PX8nR5BRAStTOHsJZszJzZ7dyIxkyRKVRjxwEl7cy5Ts4cYKy_ollUo1O2E1_nw3lr-s2QYh4diQ0PBS9Bt70g9sukwkKg4XJ-RY-O1K8kXwXFW5=w408-h306-k-no"
    },
    { day: 1, date: '7/1/2025', id: 5, order:5, position: plc5, title:"EAT ME RESTAURANT", detail:"อีทมี เรสเตอรองท์",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nr0wwWWc8ZaFMwX6ol5XZmGjeS179fZldbEsY-G18DwHQB5bCG_b-sdlk41HViEk9ZdTu_HHQkxYjURMCROPBNp8gKPyTpusxmaqdfVGyhACAMR99967uuMq9RDztMt9gvHk3XRaw=w408-h306-k-no"
    },
    { day: 1, date: '7/1/2025', id: 6, order:6, position: plc6, title:"Mandarin Hotel Bangkok, managed by Centre Point", detail:"โรงแรมแมนดาริน กรุงเทพฯ",
      src: "https://lh3.googleusercontent.com/p/AF1QipO47M8DCVLRu67siHMq6UHgX7DixyMI_iAIr4fE=w408-h279-k-no"
    },
    { day: 1, date: '7/1/2025', id: 7, order:7, position: plc7, title:"White Flower Cafe", detail:"ครัวดอกไม้ขาว",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq5c2znLp8Y7yfXYB-lTB2x2KRnXFcBKV8nmbEEDfPOQsYWYskOE6aWe287ZyI8T-YShGihssVCc_7BqzHto-eSPyfhox2WacVs1AhzNAyc1Rl5_brDKPw-_mEh7a6a60qgMXTa=w408-h544-k-no"
    },
    { day: 2, date: '7/2/2025', isStartSection:true, id: 8, order:1, position: plc8, title:"Pak Khlong Talat (Flower Market)", detail:"ปากคลองตลาด",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq5c2znLp8Y7yfXYB-lTB2x2KRnXFcBKV8nmbEEDfPOQsYWYskOE6aWe287ZyI8T-YShGihssVCc_7BqzHto-eSPyfhox2WacVs1AhzNAyc1Rl5_brDKPw-_mEh7a6a60qgMXTa=w408-h544-k-no"
    },
    { day: 2, date: '7/2/2025', id: 9, order:2, position: plc8, title:"Pak Khlong Talat (Flower Market)", detail:"ปากคลองตลาด",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq5c2znLp8Y7yfXYB-lTB2x2KRnXFcBKV8nmbEEDfPOQsYWYskOE6aWe287ZyI8T-YShGihssVCc_7BqzHto-eSPyfhox2WacVs1AhzNAyc1Rl5_brDKPw-_mEh7a6a60qgMXTa=w408-h544-k-no"
    },
    { day: 2, date: '7/2/2025', id: 10, order:3, position: plc8, title:"Pak Khlong Talat (Flower Market)", detail:"ปากคลองตลาด",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq5c2znLp8Y7yfXYB-lTB2x2KRnXFcBKV8nmbEEDfPOQsYWYskOE6aWe287ZyI8T-YShGihssVCc_7BqzHto-eSPyfhox2WacVs1AhzNAyc1Rl5_brDKPw-_mEh7a6a60qgMXTa=w408-h544-k-no"
    },
    { day: 2, date: '7/2/2025', id: 11, order:4, position: plc8, title:"Pak Khlong Talat (Flower Market)", detail:"ปากคลองตลาด",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq5c2znLp8Y7yfXYB-lTB2x2KRnXFcBKV8nmbEEDfPOQsYWYskOE6aWe287ZyI8T-YShGihssVCc_7BqzHto-eSPyfhox2WacVs1AhzNAyc1Rl5_brDKPw-_mEh7a6a60qgMXTa=w408-h544-k-no"
    },
    { day: 3, date: '7/3/2025', isStartSection:true, id: 12, order:1, position: plc9, title:"Wat Prayurawongsawas Worawihan", detail:"วัดประยุรวงศาวาสวรวิหาร",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq5c2znLp8Y7yfXYB-lTB2x2KRnXFcBKV8nmbEEDfPOQsYWYskOE6aWe287ZyI8T-YShGihssVCc_7BqzHto-eSPyfhox2WacVs1AhzNAyc1Rl5_brDKPw-_mEh7a6a60qgMXTa=w408-h544-k-no"
    },
    { day: 3, date: '7/3/2025', id: 13, order:2, position: plc9, title:"Wat Prayurawongsawas Worawihan", detail:"วัดประยุรวงศาวาสวรวิหาร",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq5c2znLp8Y7yfXYB-lTB2x2KRnXFcBKV8nmbEEDfPOQsYWYskOE6aWe287ZyI8T-YShGihssVCc_7BqzHto-eSPyfhox2WacVs1AhzNAyc1Rl5_brDKPw-_mEh7a6a60qgMXTa=w408-h544-k-no"
    },
    { day: 3, date: '7/3/2025', id: 14, order:3, position: plc9, title:"Wat Prayurawongsawas Worawihan", detail:"วัดประยุรวงศาวาสวรวิหาร",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq5c2znLp8Y7yfXYB-lTB2x2KRnXFcBKV8nmbEEDfPOQsYWYskOE6aWe287ZyI8T-YShGihssVCc_7BqzHto-eSPyfhox2WacVs1AhzNAyc1Rl5_brDKPw-_mEh7a6a60qgMXTa=w408-h544-k-no"
    },
    { day: 4, date: '7/4/2025', isStartSection:true, id: 15, order:1, position: plc10, title:"Princess Mother Memorial Park", detail:"อุทยานเฉลิมพระเกียรติสมเด็จพระศรีนครินทราบรมราชชนนี",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq5c2znLp8Y7yfXYB-lTB2x2KRnXFcBKV8nmbEEDfPOQsYWYskOE6aWe287ZyI8T-YShGihssVCc_7BqzHto-eSPyfhox2WacVs1AhzNAyc1Rl5_brDKPw-_mEh7a6a60qgMXTa=w408-h544-k-no"
    },
    { day: 4, date: '7/4/2025', id: 16, order:2, position: plc10, title:"Princess Mother Memorial Park", detail:"อุทยานเฉลิมพระเกียรติสมเด็จพระศรีนครินทราบรมราชชนนี",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq5c2znLp8Y7yfXYB-lTB2x2KRnXFcBKV8nmbEEDfPOQsYWYskOE6aWe287ZyI8T-YShGihssVCc_7BqzHto-eSPyfhox2WacVs1AhzNAyc1Rl5_brDKPw-_mEh7a6a60qgMXTa=w408-h544-k-no"
    },
    { day: 4, date: '7/4/2025', id: 17, order:3, position: plc10, title:"Princess Mother Memorial Park", detail:"อุทยานเฉลิมพระเกียรติสมเด็จพระศรีนครินทราบรมราชชนนี",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq5c2znLp8Y7yfXYB-lTB2x2KRnXFcBKV8nmbEEDfPOQsYWYskOE6aWe287ZyI8T-YShGihssVCc_7BqzHto-eSPyfhox2WacVs1AhzNAyc1Rl5_brDKPw-_mEh7a6a60qgMXTa=w408-h544-k-no"
    },
    { day: 4, date: '7/4/2025', id: 18, order:4, position: plc10, title:"Princess Mother Memorial Park", detail:"อุทยานเฉลิมพระเกียรติสมเด็จพระศรีนครินทราบรมราชชนนี",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq5c2znLp8Y7yfXYB-lTB2x2KRnXFcBKV8nmbEEDfPOQsYWYskOE6aWe287ZyI8T-YShGihssVCc_7BqzHto-eSPyfhox2WacVs1AhzNAyc1Rl5_brDKPw-_mEh7a6a60qgMXTa=w408-h544-k-no"
    },
    { day: 5, date: '7/5/2025', isStartSection:true, id: 19, order:1, position: plc11, title:"Guan Yu Shrine (Khlong San)", detail:"ศาลเจ้ากวนอู (คลองสาน)",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq5c2znLp8Y7yfXYB-lTB2x2KRnXFcBKV8nmbEEDfPOQsYWYskOE6aWe287ZyI8T-YShGihssVCc_7BqzHto-eSPyfhox2WacVs1AhzNAyc1Rl5_brDKPw-_mEh7a6a60qgMXTa=w408-h544-k-no"
    },
    { day: 5, date: '7/5/2025', id: 20, order:2, position: plc11, title:"Guan Yu Shrine (Khlong San)", detail:"ศาลเจ้ากวนอู (คลองสาน)",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq5c2znLp8Y7yfXYB-lTB2x2KRnXFcBKV8nmbEEDfPOQsYWYskOE6aWe287ZyI8T-YShGihssVCc_7BqzHto-eSPyfhox2WacVs1AhzNAyc1Rl5_brDKPw-_mEh7a6a60qgMXTa=w408-h544-k-no"
    },
    { day: 5, date: '7/5/2025', id: 21, order:3, position: plc11, title:"Guan Yu Shrine (Khlong San)", detail:"ศาลเจ้ากวนอู (คลองสาน)",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq5c2znLp8Y7yfXYB-lTB2x2KRnXFcBKV8nmbEEDfPOQsYWYskOE6aWe287ZyI8T-YShGihssVCc_7BqzHto-eSPyfhox2WacVs1AhzNAyc1Rl5_brDKPw-_mEh7a6a60qgMXTa=w408-h544-k-no"
    },
  ];

  const [itinerary, setItinerary] = useState<String[]>(['7/1/2025', '7/2/2025', '7/3/2025', '7/4/2025', '7/5/2025']);
  const [selectedDate, setSelectedDate] = useState<string>('7/5/2025');
  const [items, setItems] = useState<PlaceInfo[]>(markers);
  const itemContainerscrollRef = useRef<HTMLDivElement | null>(null);
  const navSideBarScrollRef = useRef<HTMLDivElement | null>(null);
  const daySectionScrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const removeItemById = (idToRemove: number) => {
    const filteredItems = items.filter(item => item.id !== idToRemove);
    setItems(reorderItems(filteredItems));
  };

  const reorderItems = (items: PlaceInfo[]) => {
    let newId = 1;
    const reordered = items.map((item) => ({
      ...item,
      id: newId,
      order: newId++,
    }));
    return reordered;
  };

  const formatNumber = (value: string) => {
    const clean = value.replace(/,/g, "");
    const num = Number(clean);
    if (isNaN(num)) 
      return "";
    else 
      return new Intl.NumberFormat("en-US").format(num);
  };

  const handleChange = (id: number, items: PlaceInfo[], value: string) => {
    const updatedItem = items.map(item =>
      item.id === id ? { ...item, cost: value.replace(/,/g, "") } : item
    ) as PlaceInfo[];
    setItems(updatedItem);
  };

  const handleBlur = (id: number, items: PlaceInfo[]) => {
    const updatedItem = items.map(item =>
      item.id === id ? { ...item, cost: formatNumber(String(item.cost)) } : item
    ) as PlaceInfo[];
    setItems(updatedItem);
  };
  
  const handleScrollTo = (date: string) => {
    if (itemContainerscrollRef.current && daySectionScrollRefs.current[date]) {
      if (daySectionScrollRefs.current[date]) {
        itemContainerscrollRef.current.scrollTo({ top: daySectionScrollRefs.current[date]!.offsetTop, behavior: 'smooth' });
        setSelectedDate(date);
      }
    }
  };

  const getCostColorBG = (day: number) => {
    if (day%4 == 0) return 'var(--color-tropical-sunset-sorbet-Mist)';
    else if (day%4 == 1) return 'var(--color-tropical-palm-misty-palm)';
    else if (day%4 == 2) return 'var(--color-tropical-lagoon-whisper)';
    else return 'var(--color-tropical-mango-tin)';
  };
  
  
  return (
    <>
    <Flex direction="row" gap="1" style={{ height: "100vh", width: "100vw" }}>
       <Box className="map-container">
        <MapContainerComponent items={items} setItems={setItems} itemContainerscrollRef={itemContainerscrollRef} selectedDate={selectedDate} itinerary={itinerary}/>
      </Box>
      <Box width="40vw" height="100vh" className="item-container">
        <ScrollArea.Root className="ScrollAreaRoot">
          <ScrollArea.Viewport ref={itemContainerscrollRef}  className="ScrollAreaViewport">
          <Flex direction="column" gap="2">
            <TripDatePicker setItinerary={setItinerary} />
            <SortableList
              items={items}
              onChange={setItems}
              renderItem={(item) => (
                <SortableList.Item id={item.id}>
                  <Flex direction="row" gap="1">
                    {item.isStartSection === true ? (
                      <div 
                        key={item.date}
                        ref={el => { daySectionScrollRefs.current[item.date.toString()] = el; }}
                        className={"start-section-" + item.date.toString()}
                      />
                    ) : (null)}
                    <div>
                      <img className='bin' src={"./src/assets/bin.png"} onClick={() => removeItemById(item.id)}/>
                    </div>
                    <div>
                      <img src={getMarkerSrc(item.day)} />
                      <div className="pin-on-card">
                        {item.order}
                      </div>
                    </div>
                    <Avatar size="3" src={item.src} radius="large" fallback="J" />
                    
                    <Flex direction="row" gap="1">
                    {item.title === "" ? (
                      <ItemContentSkeleton/>
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
                      <TextArea className="user-notes" size="1" radius="large" placeholder="What to do, see, or things to avoid?…"/>
                    </Box>
                    )}
                  </Flex>
                    <input className="cost" style={{ backgroundColor: getCostColorBG(item.day) }}  pattern='^-?(?:0|[1-9]\d{0,2}(?:,?\d{3})*)(?:\.\d+)?$'  placeholder="$" value={item.cost} onChange={(e) =>
                handleChange(item.id, items as PlaceInfo[], e.target.value)} onBlur={() => handleBlur(item.id, items as PlaceInfo[])}/>
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
      </Box>
      <Box className="nav-side-bar">
        <ScrollArea.Root className="ScrollAreaRoot">
          <ScrollArea.Viewport ref={navSideBarScrollRef}  className="ScrollAreaViewport">
          <Flex direction="column" gap="2" className="NavSideBarContent">
            <Text className="nav-title">
              Itinerary
            </Text>
            {itinerary.map((date) =>
                <Text className={date === selectedDate? ("itinerary-item-bold") : ("itinerary-item")} 
                key={date.toString()} onClick={() => {handleScrollTo(date.toString());}}>
                  {date}
                </Text>
            )}
          </Flex>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical" >
            <ScrollArea.Thumb className="ScrollAreaThumb" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Box>
      </Flex>
    </>
  )
}

export default App
