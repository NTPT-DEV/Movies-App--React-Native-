import {
  fetchMovies,
  getMoviesUpcoming,
  getTrendAnimation,
} from "@/services/api";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  View,
} from "react-native";
import LogoMovie from "../../assets/images/LogoMovie.svg";
import MovieCard from "../components/MovieCard";
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
        setComing(res);
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
        setTrendAnimation(res);
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
        setMovies(res.results);
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
      style={{ flex: 1, backgroundColor: "red" }}
      resizeMode="cover"
      className="w-full"
    >
      <StatusBar style="light" translucent />
      {error ? (
        <View>
          <Text className="text-[tomato] text-2xl text-center font-[OutfitBold]">
            {error}
          </Text>
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              <View className="mt-10 items-center">
                <LogoMovie width={90} height={90} />
              </View>

              <FlatList
                contentContainerStyle={{
                  marginHorizontal: 10,
                  marginBottom: 15,
                }}
                data={coming.filter((m) => m.poster_path)}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                snapToInterval={screenWidth / 2 + 5}
                decelerationRate="fast"
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }: { item: Movie }) => (
                  <MovieCardUpcoming {...item} />
                )}
              />
              { movie && movie.length > 0 && (
                <Text className="text-white text-xl mb-3 px-2 font-[OutfitSemiBold]">
                Latest Movies
              </Text>
              )}
            </>
          }
          ListFooterComponent={
            <View>
            <FlatList
                contentContainerStyle={{
                  paddingRight: 70,
                  marginHorizontal: 10,
                  marginBottom: 15,
                }}
                data={trendAnimation}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                snapToInterval={screenWidth / 2 + 5}
                decelerationRate="fast"
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }: { item: Movie }) => (
                  <MovieCardUpcoming {...item} />
                )}
              />
            </View>
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
      {loading && <ActivityIndicator size="large" color="tomato" />}
    </ImageBackground>
  );
};

export default Home;
