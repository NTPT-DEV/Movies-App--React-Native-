import { fetchMovies } from "@/services/api";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
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
  const [query, setQuery] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const res = await fetchMovies({ query });
        setMovies(res.results);
        setError(null);
      } catch (err) {
        setError("Something went wrong");
        console.log(err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000)
      }
    };
    loadMovies();
  }, [query]);

  return (
    <ImageBackground
      source={require("../../assets/images/BlackPaper_20.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
      className="w-full"
    >
      <FlatList
        ListHeaderComponent={
          <>
            <StatusBar style="light" translucent />
            <View className="mt-12 items-center">
              <LogoMovie width={90} height={90} />
            </View>

            <View className="mt-2 px-5">
              <SearchBar
                onPress={() => router.push("/search")}
                placeholder="Search for a Movies"
              />
            </View>

            <Text className="text-white text-lg font-bold mt-5 mb-3 px-5">
              Latest Movies
            </Text>
          </>
        }
        contentContainerStyle={{
          paddingBottom: 110,
          paddingHorizontal: 5,
        }}
        data={movie.filter((m) => m.poster_path)}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 15,
          marginBottom: 10,
        }}
        renderItem={({ item }: { item: Movie }) => <MovieCard {...item} />}
      />
      {loading && <ActivityIndicator size="large" color="tomato" />}
    </ImageBackground>
  );
};

export default Home;
