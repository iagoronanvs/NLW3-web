import L from 'leaflet';
import mapMarkerImg from '../images/local.svg';

const mapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 0]
})

export default mapIcon;