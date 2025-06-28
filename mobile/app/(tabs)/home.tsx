import { fetchMovies } from "@/services/api";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import LogoMovie from "../../assets/images/LogoMovie.svg";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
const Home = () => {
  const [movie, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setquery] = useState<string>("");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const res = await fetchMovies({ query });
        console.log(res.results);
        setMovies(res.results);
        setError(null);
      } catch (err) {
        setError("Something went wrong");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [query]);

  const router = useRouter();
  return (
    <ImageBackground
      source={require("../../assets/images/BlackPaper_20.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
      className="w-full"
    >
      <View className="flex-1 w-full justify-center">
        <ScrollView
          className="flex-1 px-5"
          bounces={true}
          overScrollMode="auto"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            minHeight: "100%",
            paddingBottom: 280,
          }}
        >
          <StatusBar style="light" translucent={true} backgroundColor="black" />
          <View className="mt-12 items-center">
            <LogoMovie width={100} height={100} />
          </View>

          <View className="mt-2">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a Movies"
            />
          </View>
          <>
            <Text className="text-white text-lg font-bold mt-5 mb-3">Lastest Movies</Text>
            <FlatList
              data={movie}
              numColumns={3}
              keyExtractor={(item) => item.id.toString()}
              columnWrapperStyle={{
                justifyContent : 'center',
                gap : 20 , 
                paddingRight : 5 , 
                marginBottom : 10
              }}
              renderItem={({ item }: { item: Movie }) => (
                <MovieCard {...item} />
              )}
            />
          </>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};
export default Home;
