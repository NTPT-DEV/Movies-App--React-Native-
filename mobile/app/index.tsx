import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import LottieAnimation from "./components/LottieAnimation";

const Index = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home")
    }, 1000)
    return () => clearTimeout(timer);
  }, []);

  
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <LottieAnimation />
    </View>
  );
};

export default Index;
