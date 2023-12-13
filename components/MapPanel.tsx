import React, { useRef, useState } from 'react';
import { 
  Text, Platform, StatusBar, Animated,
  ScrollView, StyleSheet, useWindowDimensions,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { MarkerData } from './InteractiveMap';
import { LatLng } from 'react-native-maps';
import MapLocationModal from './common/MapLocationModal';
//import MarkerDisplay from './MarkerDisplay';
//import PanelHandle from './PanelHandle';

const ios = Platform.OS === 'ios';

interface IMapPanelProps {
  marker: LatLng | undefined
}

const MapPanel: React.FunctionComponent<IMapPanelProps> = ({ marker }) => {
  const deviceHeight = useWindowDimensions().height;
  const insets = useSafeAreaInsets();
  const statusBarHeight: number = ios ? insets.bottom : StatusBar.currentHeight as number;
  const draggableRange = {
    top: deviceHeight - statusBarHeight,
    bottom: deviceHeight / 2.8
  };

  const snappingPoints = [
    draggableRange.top,
    draggableRange.bottom
  ];

  const panelRef = useRef<SlidingUpPanel | null>(null);
  const [panelPositionVal] = useState(new Animated.Value(draggableRange.bottom));

  return (
    <View>
      <MapLocationModal
                    isVisible
                    locationName="Vittorio veneto"
                    mapsURL="https://google.com"
                    coords={{ x: 21312.232, y: 23432.123 }}
                    pollutionRate={21.08}
                    weatherURL="https://google.com"
                    togglePin={() => {
                        console.log("handle toggle pin from modal");
                    }}
        />
    </View>
    
  );
};

const styles = StyleSheet.create({
  panelContent: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  }
});

export default MapPanel;