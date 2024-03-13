import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Colors } from "../style/AllStyels"

const Accordion = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const handleContentLayout = (event) => {
    setContentHeight(event.nativeEvent.layout.height);
  };

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
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleAccordion}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{title}</Text>
          <Animated.Text style={[styles.icon, { transform: [{ rotate }] }]}>
            {icon}
          </Animated.Text>
        </View>
      </TouchableOpacity>
      {expanded && (
        <Animated.View
          style={[
            styles.contentContainer,
            {
              height: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 250],
              }),
            },
          ]}
        >
          <Text style={styles.content}>{content}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = {
  container: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginBottom: 10,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
  title: {
    textAlign: "right",
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  icon: {
    fontSize: 20,
    color: "#666666",
  },
  contentContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    overflow: "hidden",
  },
  content: {
    fontSize: 16,
    color: "#555555",
    textAlign: "left"
  },
};

export default Accordion;
