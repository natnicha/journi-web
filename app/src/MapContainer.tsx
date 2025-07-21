import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import NumberedDivIcon from './NumberedDivIcon';
import type { PlaceInfo } from './PlaceInfo';
import { getMarkerSrc } from './Marker';
import './MapContainer.css'

interface MapContainerComponentProps {
  items: PlaceInfo[];
  setItems: React.Dispatch<React.SetStateAction<PlaceInfo[]>>;
  itemContainerscrollRef: React.RefObject<HTMLDivElement | null>;
  selectedDate: string;
  itinerary: String[];
}

const plc1: LatLngExpression = [13.754817011352124, 100.50415849532308]; //วัด​ราชนัดดา
const zoom_default: number = 15

function ReverseGeocodeMarker({ addNewPlace, selectedDate, itinerary, }: 
  { addNewPlace: (location: PlaceInfo) => void; selectedDate: string; itinerary: String[]}) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const plc: LatLngExpression = [lat, lng];
        var place = {
          day: itinerary.findIndex(obj => obj === selectedDate) + 1,
          date: selectedDate,
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

export function MapContainerComponent ({ items, setItems, itemContainerscrollRef, selectedDate, itinerary }: MapContainerComponentProps) {
  const [isAddNewItem, setIsAddNewItem] = useState<boolean|false>(false);

  const addNewPlace = (plc: any) => {
    plc.id = items.length + 1;
    plc.order = items.length + 1;
    setItems((prev) => [...prev, plc]);
    setIsAddNewItem(true);
  };

  // Auto-scroll to bottom when items change
  useEffect(() => {
    if (itemContainerscrollRef.current) {
      itemContainerscrollRef.current.scrollTo({ top: itemContainerscrollRef.current.scrollHeight, behavior: 'smooth' });
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
      <MapContainer className="map" center={plc1} zoom={zoom_default} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ReverseGeocodeMarker addNewPlace={addNewPlace} selectedDate={selectedDate} itinerary={itinerary}/>
        {items.map(({ day, order, position, title, detail }) => (
          <Marker key={day + "," + order} position={position} icon={new NumberedDivIcon({ number: order, iconUrl: getMarkerSrc(day) } as any)}>
            <Popup>
              {title} <br /> {detail} <br />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

export default MapContainerComponent;