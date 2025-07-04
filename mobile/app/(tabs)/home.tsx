import {
  fetchMovies,
  getMoviesUpcoming,
  getTrendAnimation,
} from "@/services/api";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  View
} from "react-native";
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
    const fetchMoviesUpcoming = async () => {
      try {
        const res = await getMoviesUpcoming();
        setComing(res.filter((m: Movie) => m.poster_path)); // ✅ filter ล่วงหน้า
      } catch (err) {
        setError("Something went wrong");
        console.log(err);
      }
    };
    fetchMoviesUpcoming();
  }, []);

  useEffect(() => {
    const fetchTrendAnimation = async () => {
      try {
        const res = await getTrendAnimation();
        setTrendAnimation(res.filter((m: Movie) => m.poster_path));
      } catch (err) {
        setError("Something went wrong");
        console.log(err);
      }
    };
    fetchTrendAnimation();
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const res = await fetchMovies({});
        setMovies(res.results.filter((m: Movie) => m.poster_path));
        setError(null);
      } catch (err) {
        setError("Something went wrong");
        console.log(err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };
    loadMovies();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/BlackPaper_20.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <StatusBar style="light" translucent />

      {error ? (
        <View>
          <Text className="text-[tomato] text-2xl text-center font-[OutfitBold]">
            {error}
          </Text>
        </View>
      ) : (
        <FlatList className="mb-10"
          ListHeaderComponent={
            <View>
              {/* Logo */}
              <View className="items-center">
                <LogoMovie width={90} height={90} />
              </View>

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
                  <Text className="text-white text-xl my-5 px-2 font-[OutfitSemiBold]">
                    Trend Animation
                  </Text>
                  <FlatList
                    horizontal
                    data={trendAnimation}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }: { item: Movie }) => (
                      <MovieCardMediumSize {...item} />
                    )}
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment="center"
                    decelerationRate="fast"
                    contentContainerStyle={{
                      paddingHorizontal: 10,
                      gap: 20,
                      marginBottom: 15,
                    }}
                  />
                </View>
              )}

              {/* Latest Movies title */}
              {movie.length > 0 && (
                <Text className="text-white text-xl my-5 px-2 font-[OutfitSemiBold]">
                  Latest Movies
                </Text>
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
