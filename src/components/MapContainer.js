import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  state = {
    currentPosition: null,
    watchId: null // Pour stocker l'ID de la fonction de surveillance
  };

  componentDidMount() {
    // Vérifie si la géolocalisation est disponible dans le navigateur
    if (navigator.geolocation) {
      // Commence à surveiller les modifications de position
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.setState({
            currentPosition: { lat: latitude, lng: longitude }
          });
        },
        (error) => {
          console.error('Erreur lors de la récupération de la position :', error);
        }
      );
      this.setState({ watchId });
    } else {
      console.error("La géolocalisation n'est pas disponible.");
    }
  }

  componentWillUnmount() {
    // Arrête de surveiller la position lorsque le composant est démonté
    const { watchId } = this.state;
    navigator.geolocation.clearWatch(watchId);
  }

  render() {
    const { currentPosition } = this.state;
    return (
      <div style={{ height: '300px', position: 'relative' }}>
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={{ lat: -21.46362822372044, lng: 47.10991501011692 }}
        >
          {currentPosition && (
            <Marker
              title="Votre position"
              position={currentPosition}
            />
          )}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyALTIsj-we8DvDsZQ61K7bEmZokFhwLyD8"
})(MapContainer);
