import {
  fetchMovies,
  getMoviesUpcoming,
  getTrendAnimation,
} from "@/services/api";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import LogoMovie from "../../assets/images/LogoMovie.svg";
import MovieCard from "../components/MovieCard";
import MovieCardMediumSize from "../components/MovieCardMediumSize";
import MovieCardUpcoming from "../components/MovieCardUpcoming";
const screenWidth = Dimensions.get("window").width;

const Home = () => {
  const [movie, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [coming, setComing] = useState<Movie[]>([]);
  const [trendAnimation, setTrendAnimation] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [upcomingRes, trendRes, moviesRes] = await Promise.all([
          getMoviesUpcoming(),
          getTrendAnimation(),
          fetchMovies({}),
        ]);

        setComing(upcomingRes.filter((m: Movie) => m.poster_path));
        setTrendAnimation(trendRes.filter((m: Movie) => m.poster_path));
        setMovies(moviesRes.results.filter((m: Movie) => m.poster_path));
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Something went wrong");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };

    fetchAllData();
  }, []);

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);
  const textX = useSharedValue(20);
  const textOpacity = useSharedValue(20);


  const animateLogoEffect = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const animateText = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [{ translateX: textX.value }],
    };
  });

  useFocusEffect(
    useCallback(() => {
      opacity.value = 0;
      translateY.value = -20;
      textOpacity.value = 0;
      textX.value = 20;

      opacity.value = withDelay(
        300,
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      );
      translateY.value = withDelay(
        300,
        withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      );
      textX.value = withDelay(
        1000,
        withTiming(0, { duration: 2000 })
      );
      textOpacity.value = withDelay(
        1000,
        withTiming(1, { duration: 2000 })
      );
    }, [opacity, translateY, textX, textOpacity])
  );

  return (
    <ImageBackground
      source={require("../../assets/images/BlackPaper_20.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <StatusBar style="light" translucent />

      <View className="mt-7">
        <Animated.View className="items-center" style={animateLogoEffect}>
          <LogoMovie width={90} height={90} />
        </Animated.View>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator
            size="large"
            color="tomato"
            className="flex-1 items-center justify-center"
          />
          {error && (
            <Text className="text-white text-center mt-5">{error}</Text>
          )}
        </View>
      ) : (
        <FlatList
          className="mb-10"
          ListHeaderComponent={
            <View className="w-full">
              {coming?.length > 0 && (
                <>
                  <View className=" flex-col items-center justify-center px-2 pl-7 overflow-hidden">
                    <Carousel
                      loop={true}
                      width={screenWidth - 20}
                      height={300}
                      autoPlay={true}
                      snapEnabled={true}
                      autoPlayInterval={1500}
                      mode={"horizontal-stack"}
                      modeConfig={{
                        // parallaxScrollingScale: 1,
                        // parallaxScrollingOffset: 200,
                        snapDirection: "left",
                        stackInterval: 18,
                      }}
                      data={coming}
                      renderItem={({ item }: { item: Movie }) => (
                        <MovieCardUpcoming {...item} />
                      )}
                    />
                  </View>
                </>
              )}

              {trendAnimation?.length > 0 && (
                <View>
                  <Animated.Text
                    style={animateText}
                    className="text-white text-xl my-5 px-2 font-[OutfitSemiBold]"
                  >
                    Trend Animation
                  </Animated.Text>
                  <View className="px-2 overflow-hidden">
                    <Carousel
                      data={trendAnimation}
                      width={screenWidth}
                      renderItem={({ item }: { item: Movie }) => (
                        <MovieCardMediumSize {...item} />
                      )}
                      height={250}
                      autoPlay={true}
                      mode="parallax"
                      autoPlayInterval={1500}
                      snapEnabled={true}
                      loop={true}
                      modeConfig={{
                        parallaxScrollingScale: 1,
                        parallaxScrollingOffset: 270,
                      }}
                    />
                  </View>
                </View>
              )}

              {/* Latest Movies title */}
              {movie.length > 0 && (
                <Animated.Text 
                 style={animateText}
                className="text-white text-xl my-5 px-2 font-[OutfitSemiBold]">
                  Latest Movies
                </Animated.Text>
              )}
            </View>
          }
          data={movie}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "center",
            gap: 15,
            marginBottom: 10,
          }}
          contentContainerStyle={{
            paddingBottom: 80,
            paddingHorizontal: 5,
          }}
          renderItem={({ item }: { item: Movie }) => <MovieCard {...item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ImageBackground>
  );
};

export default Home;
