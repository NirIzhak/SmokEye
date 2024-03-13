import { View, Text, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import { APIContext } from "../Context/APIContext";

export default function Map() {
  const { allReports } = useContext(APIContext);
  const { currentLocation } = useContext(SmokeyeContext);
  const reportsData = allReports.map(({ _id, location, type, details }) => ({
    _id,
    coordinate: {
      latitude: location[0],
      longitude: location[1],
    },
    title: type == "Private" ? "אדם פרטי" : "עסק",
    description: details,
  }));

  return (
    <View>
      <MapView
        mapType="standard"
        style={{ width: "100%", height: "100%" }}
        region={{
          latitude: currentLocation[0],
          longitude: currentLocation[1],
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {reportsData.map((marker) => (
          <Marker
            key={marker._id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
}
