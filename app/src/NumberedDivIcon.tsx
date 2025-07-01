import L, { Icon, type IconOptions, Point } from 'leaflet';

// Extend IconOptions to include 'number'
interface NumberedDivIconOptions extends IconOptions {
  number?: string;
  shadowUrl?: string; // accept null too
}

// Check if NumberedDivIcon already exists to avoid overwriting
if (!(L as any).NumberedDivIcon) {
  const NumberedDivIcon = Icon.extend({
    options: {
      iconUrl: './src/assets/map-pin.png',
      number: '',
      id: 1,
      shadowUrl: undefined,
      iconSize: new Point(48, 48),
      iconAnchor: new Point(24, 48),
      popupAnchor: new Point(0, -33),
      className: 'leaflet-div-icon',
    } as NumberedDivIconOptions,
    

    createIcon() {
      const div = document.createElement('div');
      const img = this._createImg(this.options.iconUrl || '');
      const numDiv = document.createElement('div');
      numDiv.className = 'number';
      numDiv.innerHTML = this.options.number || '';
      div.appendChild(img);
      div.appendChild(numDiv);
      this._setIconStyles(div, 'icon');
      return div;
    },

    createShadow() {
      return null;
    },
  });

  // Attach to Leaflet namespace with typing cast
  (L as any).NumberedDivIcon = NumberedDivIcon;
}

export default (L as any).NumberedDivIcon as typeof Icon;