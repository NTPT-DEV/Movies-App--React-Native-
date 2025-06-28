import { useRouter } from "expo-router";
import { ImageBackground, ScrollView, View } from "react-native";
import LogoMovie from "../../assets/images/LogoMovie.svg";
import SearchBar from "../components/SearchBar";
const Home = () => {

  const router = useRouter()
  return (
    <ImageBackground 
    source={require(("../../assets/images/Black Paper_20.jpg"))}
    style={{flex : 1}}
    resizeMode="cover"
    className="opacity-95 w-full">
      <View className="flex-1 w-full">
        <ScrollView className="flex-1 px-5"
        bounces={true}
        overScrollMode="auto"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight : "100%" , 
          paddingBottom : 1000
        }}
        >
          <View className="mt-12 items-center">
            <LogoMovie width={100} height={100} />
          </View>

        <View className="flex-1 mt-5">
          <SearchBar />
        </View>
  
        </ScrollView>
    </View>
    </ImageBackground>
  );
};
export default Home;
