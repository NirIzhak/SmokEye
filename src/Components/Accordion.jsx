import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";

const Accordion = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const toggleAccordion = () => {
    const toValue = expanded ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const icon = expanded ? "-" : "+";

  return (
    <View style={{ flexDirection: "column" }}>
      <TouchableOpacity onPress={toggleAccordion}>
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={{ textAlign: "right", fontSize: 20 }}>{title}</Text>
          <Animated.Text style={{ transform: [{ rotate }] }}>{icon}</Animated.Text>
        </View>
      </TouchableOpacity>
      {expanded && (
        <Animated.View
          style={{
            height: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 100],
            }),
          }}
        >
          <Text style={{ textAlign: "right" }}>{content}</Text>
        </Animated.View>
      )}
    </View>
  );
};

export default Accordion;
