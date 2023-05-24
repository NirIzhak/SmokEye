import { View, Text, StyleSheet, FlatList, Animated } from "react-native";
import React, { useState, useRef } from "react";
import Slides from "../Data/Slides";
import OnBoardingItem from "./OnBoardingItem";
import Paginator from "./Paginator";
import NextButton from "./NextButton";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function OnBoarding() {

  const [currentIndex, setCurrenIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrenIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = async()=>{
    if (currentIndex < Slides.length -1){
        slidesRef.current.scrollToIndex({index: currentIndex+1})
    } else{
       try{
        await AsyncStorage.setItem('@viewedOnboarding', JSON.stringify(true));
             }catch(err){
        console.log("SetItemError", err)
       }
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={Slides}
          renderItem={({ item }) => <OnBoardingItem item={item} />}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator = {false}
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
        />
      </View>

      <Paginator data={Slides} scrollX={scrollX}/>
      <NextButton scrollTo={scrollTo} percentage={(currentIndex+1) * (100/Slides.length)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
