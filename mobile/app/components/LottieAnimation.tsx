import LottieView from "lottie-react-native";

const LottieAnimation = () => {
  return (
    <LottieView
      source={require("../../assets/images/LogoAnimation.json")}
      autoPlay
      loop={true}
      style={{ width: 200, height: 200 }}
    />
  );
};
export default LottieAnimation;
