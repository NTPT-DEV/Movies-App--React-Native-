import { fetchMovies } from "@/services/api";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Text,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import LogoMovie from "../../assets/images/LogoMovie.svg";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

const Search = () => {
  const [movie, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");

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

    if (query.trim() !== "") {
      loadMovies();
    } else {
      setMovies([]);
      setError(null);
      setLoading(false);
    }
  }, [query]);

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);
  const textOpacity = useSharedValue(0);
  const textY = useSharedValue(5);

  const animateLogoEffect = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const animateText = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [{ translateY: textY.value }],
    };
  });

  useFocusEffect(
    useCallback(() => {
      opacity.value = 0;
      translateY.value = -20;
      textOpacity.value = 0;
      textY.value = 5;

      opacity.value = withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      });
      translateY.value = withTiming(0, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      });
      textOpacity.value = withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      });
      textY.value = withTiming(0, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      });
    }, [opacity, translateY, textOpacity, textY])
  );

  return (
    <ImageBackground
      source={require("../../assets/images/BlackPaper_20.jpg")}
      style={{ flex: 1, backgroundColor: "#000" }}
      resizeMode="cover"
      className="w-full"
    >
      <View className="mt-7 justify-center items-center ">
        <Animated.View className="items-center" style={animateLogoEffect}>
          <LogoMovie width={90} height={90} />
        </Animated.View>
      </View>
      {error ? (
        <View className="flex-1 items-center justify-center">
          <View className="flex-1 items-center justify-center">
            <View className="flex-1 px-5 w-full">
              <Animated.Text
                style={animateText}
                className="text-white text-center text-2xl font-bold  px-5"
              >
                Search Movie
              </Animated.Text>
              <Animated.View style={animateText}>
                <SearchBar
                  onChangeText={(text: string) => setQuery(text)}
                  placeholder="Search for a Movies"
                  value={query}
                />
              </Animated.View>
            </View>
            <View className="flex-1 pb-28 justify-center items-center">
              <Text className="text-red-500 text-center text-3xl font-[OutfitSemiBold]">
                {error}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View className="flex-1">
          <FlatList
            className="flex-1 gap-3"
            ListHeaderComponent={
              <>
                <StatusBar style="light" translucent />
                <View className="mb-4 gap-5">
                  <View className="flex-1 px-5 w-full">
                    <Animated.Text
                      style={animateText}
                      className="text-white text-center text-2xl font-bold  px-5"
                    >
                      Search Movie
                    </Animated.Text>
                  </View>
                  <Animated.View style={animateText}>
                <SearchBar
                  onChangeText={(text: string) => setQuery(text)}
                  placeholder="Search for a Movies"
                  value={query}
                />
              </Animated.View>
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
        </View>
      )}
    </ImageBackground>
  );
};
export default Search;
