import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function Map() {
  return (
    <View>
      <MapView
        mapType="satellite"
        style={{ width: '100%', height: '100%' }}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="עסק"
          description="סיגריות חשופות לציבור"
        />
         <Marker
          coordinate={{
            latitude: 37.78625,
            longitude: -122.4324,
          }}
          title="אחר"
          description="בן אדם מעשן בקניון סגור"
        />

{/* to many markers */}
{/* {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))} */}


      </MapView>
    </View>
  );
}
