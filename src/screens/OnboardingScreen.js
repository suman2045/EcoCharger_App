import React, { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../Assests/slide1.jpg"),
    title: "Welcome to EV Service",
    description: "The best place to maintain and service your electric vehicle."
  },
  {
    id: "2",
    image: require("../Assests/slide2.jpg"),
    title: "Reliable & Fast",
    description: "Get quick and reliable services with just a few taps."
  },
  {
    id: "3",
    image: require("../Assests/slide2.jpg"),
    title: "Eco-Friendly Solutions",
    description: "Join us in making the planet greener with our EV services."
  }
];

const OnbordingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      slideRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace("RegisterScreen");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ width, alignItems: "center", justifyContent: "center", padding: 20 }}>
            <Image source={item.image} style={{ width: width * 0.8, height: height * 0.4, resizeMode: "contain" }} />
            <Text style={{ fontSize: width * 0.07, color: "#1b4b23", fontWeight: "bold", marginVertical: 10 }}>{item.title}</Text>
            <Text style={{ fontSize: width * 0.045, color: "#6ebe46", textAlign: "center", paddingHorizontal: 20 }}>{item.description}</Text>
          </View>
        )}
        onScroll={(e) => {
          const contentOffsetX = e.nativeEvent.contentOffset.x;
          const newIndex = Math.round(contentOffsetX / width);
          setCurrentIndex(newIndex);
        }}
        ref={slideRef}
      />
      
      <TouchableOpacity onPress={handleNext} style={{ position: "absolute", bottom: height * 0.1, alignSelf: "center", backgroundColor: "#1b4b23", padding: 15, borderRadius: 10, width: "60%", alignItems: "center" }}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: width * 0.05 }}>{currentIndex === slides.length - 1 ? "Get Started" : "Next"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnbordingScreen;