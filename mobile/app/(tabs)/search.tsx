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
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
const Search = () => {
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
        if (res.results.length === 0) {
          setMovies([]);
          setError("Movie not found");
        } else {
          setMovies(res.results);
          setError(null);
        }
      } catch (err) {
        setError("Movie not found!!");
        console.log(err);
      } finally {
        setLoading(false);
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
      {error ? (
        <>
          <View className="mt-16 mb-5 px-5">
            <Text className="text-white text-center text-2xl font-bold mt-5 mb-3 px-5">
              Search Movie
            </Text>
            <SearchBar
              onChangeText={(text: string) => setQuery(text)}
              placeholder="Search for a Movies"
              value={query}
            />
          </View>
          <View className="flex-1 pb-28 justify-center items-center">
            <Text className="text-red-500 text-center text-3xl font-[OutfitSemiBold]">{error}</Text>
          </View>
        </>
      ) : (
        <FlatList
          className="flex-1 gap-3"
          ListHeaderComponent={
            <>
              <StatusBar style="light" translucent />
              <View className="mt-16 mb-5 px-5">
                <Text className="text-white text-center text-2xl font-bold mt-5 mb-3 px-5">
                  Search Movie
                </Text>
                <SearchBar
                  onChangeText={(text: string) => setQuery(text)}
                  placeholder="Search for a Movies"
                  value={query}
                />
              </View>
              {loading && (
                <ActivityIndicator
                  size="large"
                  color="tomato"
                  style={{ marginVertical: 20 }}
                />
              )}
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
      )}
    </ImageBackground>
  );
};
export default Search;
