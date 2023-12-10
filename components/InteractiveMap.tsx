import { View, Dimensions, Image, ImageURISource, ImageSourcePropType } from "react-native";
import MapView, { Marker, LatLng, Region, MapOverlay, Overlay, Heatmap} from "react-native-maps";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchAndParseCSV } from './FetchParseCsv';
import punti from '../assets/data/valori_atlante_veneto.json'
import { wPoint } from "../assets/data/types";

const points = punti as wPoint[]

  

interface InteractiveMapProps {
  initialRegion: Region;
  markers: { id: number; coordinate: LatLng; title: string }[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ initialRegion, markers }) => {
  
  
  
  type WeightedLatLng = {
    latitude: number;
    longitude: number;
    weight: number;
  };


  const weights: number[] = points.map((point) => point.Brightness); // Assuming weight is at index 2
  const minWeight: number = Math.min(...weights);
  const maxWeight: number = Math.max(...weights);

  console.log('Minimum Weight:', minWeight);
  console.log('Maximum Weight:', maxWeight);

  const adj_points: WeightedLatLng[]  = points.map(p => ({latitude: p.Y,
                                                          longitude: p.X, 
                                                          weight: (p.Brightness-minWeight)/(maxWeight-minWeight)}))
  

  const ImageOverlayUri = require('../assets/images/image.png')
  const imgObj: ImageURISource = {uri:ImageOverlayUri}

  const heatmapGradient = {
    colors: ['rgb(100, 0, 100)',
             'rgb(0, 0, 200)',
             'rgb(0, 100, 100)',
             'rgb(0, 200, 0)',
             'rgb(200, 0, 0)',
             'rgb(200, 200, 200)'], // Da trasparente a blu
    startPoints: [0, 0.05, 0.15, 0.3, 0.6, 0.8],
    colorMapSize: 256,
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
        showsCompass
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
          />
        ))}

       
        <Overlay
          image={ImageOverlayUri}
          bounds={[
            [initialRegion.latitude - 0.001, initialRegion.longitude - 0.001],
            [initialRegion.latitude + 0.001, initialRegion.longitude + 0.001],
          ]}
          opacity={0.5} // Set opacity as needed (0 to 1)
        />
        <Heatmap points={adj_points}
                        opacity={0.6}
                        radius={20}
                        gradient={heatmapGradient}
                         /*maxIntensity={}
                         gradientSmoothing={10}
                         heatmapMode={"POINTS_DENSITY"}*/
                         />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default InteractiveMap;