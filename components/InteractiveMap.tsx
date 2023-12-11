import { Text, View, Dimensions, Image, ImageURISource, ImageSourcePropType } from "react-native";
import MapView, { Marker, LatLng, Region, MapOverlay, Overlay, Heatmap, MapMarker, MarkerPressEvent, MapPressEvent, LongPressEvent} from "react-native-maps";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchAndParseCSV } from './FetchParseCsv';
import punti from '../assets/data/valori_atlante_veneto.json'
import { wPoint } from "../assets/data/types";


const points = punti as wPoint[]


export type MarkerData = {
  marker: MapMarker
}

interface InteractiveMapProps {
  initialRegion: Region;
  markers: { id: number; coordinate: LatLng; title: string }[];
  onMarkerPress: (event: MarkerPressEvent) => void;
  onMapPress: (event: MapPressEvent) => void;
  onLongPress: (event: LongPressEvent) => void;

}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ initialRegion, markers, onMarkerPress, onMapPress, onLongPress }) => {
  
  type WeightedLatLng = {
    latitude: number;
    longitude: number;
    weight: number;
  };


  const weights: number[] = points.map((point) => point.Brightness); // Assuming weight is at index 2
  const minWeight: number = Math.min(...weights);
  const maxWeight: number = Math.max(...weights);

  //console.log('Minimum Weight:', minWeight);
  //console.log('Maximum Weight:', maxWeight);

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
    colorMapSize: 25,
    gradientSmoothing: 0,
  }
  console.log("interactiveMap: ")
  console.log(markers)
  return (
    <View style={styles.container}>
      <Text>{markers[0].coordinate.latitude}</Text>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
        showsCompass
        onMarkerPress={onMarkerPress}
        onPress={onMapPress}
        onLongPress={onLongPress}
      >

        <Marker
          key={markers[0].id}
          coordinate={markers[0].coordinate}
          title={"Hello"}
        />

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
                        opacity={0.5}
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