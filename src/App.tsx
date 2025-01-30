import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import * as DENTISTS from './assets/dentistas.json';
import { CustomMarkers } from './components/CustomMarkers';
import './main.css';
import { Dentist, parseDentists } from './types/dentist';

function App() {
  const [dentists, setDentists] = useState<Dentist[]>([]);

  useEffect(() => {
    // MARK: load a state with dentists
    setDentists(parseDentists(DENTISTS));
  }, []);

  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          id="odontoprev-map"
          mapId="odontoprev-map"
          style={{ width: '100vw', height: '100vh' }}
          defaultCenter={{
            lat: -30.0299892,
            lng: -51.2121252
          }}
          defaultZoom={14}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
        >
          <CustomMarkers data={dentists} />
        </Map>
      </APIProvider>
    </>
  );
}

export default App;
