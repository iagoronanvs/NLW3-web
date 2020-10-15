import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import '../styles/pages/orphanages-map.css';

import api from '../services/api';
import mapIcon from '../utils/mapIcon';

import localImg from '../images/local.svg';

interface OrphanageData {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<OrphanageData[]>([]);

  useEffect(() => {
    async function loadOrphanages() {
      const response = await api.get('orphanages');

      setOrphanages(response.data);
    }

    loadOrphanages();
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={localImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Maceió</strong>
          <span>Alagoas</span>
        </footer>
      </aside>

      <Map
        center={[-9.5578549, -35.7297673]}
        zoom={15}
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

        {orphanages.map(({ id, name, latitude, longitude }) => (
          <Marker key={id} icon={mapIcon} position={[latitude, longitude]}>
            <Popup closeButton={false} minWidth={240} className="map-popup">
              {name}
              <Link to={`/orphanages/${id}`}>
                <FiArrowRight size={20} color="#fff" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  )
}

export default OrphanagesMap;