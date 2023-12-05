import { View, Dimensions, Image, ImageURISource, ImageSourcePropType } from "react-native";
import MapView, { Marker, LatLng, Region, MapOverlay, Overlay} from "react-native-maps";
import { StyleSheet } from "react-native";
import React from "react";

interface InteractiveMapProps {
  initialRegion: Region;
  markers: { id: number; coordinate: LatLng; title: string }[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ initialRegion, markers }) => {


  //const ImageOverlayUri = 'image.png'
  const ImageOverlayUri = require('../assets/images/image.png');
  const imgObj: ImageURISource = {uri:ImageOverlayUri}
 /*const imgProp: ImageSourcePropType = {uri: ImageOverlayUri}
  const img = <Image
    source = {imgProp}
  />*/
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