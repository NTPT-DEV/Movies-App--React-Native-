import { getMoviebyID, getVideobyID } from "@/services/api";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Star } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

const screenWidth = Dimensions.get("window").width;
const YOUTUBE_BASE_URL = "https://www.youtube.com/embed";

const MovieDetails = () => {
  const [movie, setMovies] = useState<MovieDetails>();
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMovie, setErrorMovie] = useState<string | null>(null);

  const [tailer, setTailer] = useState<TailerMoviesProps[]>([]);
  // const [loadingTailer, setLoadingTailer] = useState<boolean>(true);
  // const [errorTailer, setErrorTailer] = useState<string | null>(null);
  const { id } = useLocalSearchParams();

  // fetch Movies Details
  useEffect(() => {
    let isMounted = true;

    const getMovieDetails = async () => {
      try {
        if (isMounted) setLoading(true);
        const parsedId = Array.isArray(id) ? id[0] : id;
        const res = await getMoviebyID({ id: parsedId });

        if (!res) {
          if (isMounted) {
            setMovies(undefined);
            setErrorMovie("Movie not found");
          }
        } else {
          if (isMounted) {
            setMovies(res);
            setErrorMovie(null);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getMovieDetails();
    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log(JSON.stringify(movie, null, 2));

  ///  FetchVideo
  useEffect(() => {
    let isMounted = true;

    const getTailers = async () => {
      try {
        if (isMounted) setLoading(true);
        const parsedId = Array.isArray(id) ? id[0] : id;
        const res = await getVideobyID({ id: parsedId });

        if (!res) {
          if (isMounted) {
            setTailer([]);
            // setErrorTailer("Video not found");
          }
        } else {
          if (isMounted) {
            if (res && res.results) {
              const filterTailer = res.results.slice(0, 3);
              setTailer(filterTailer);
              // setErrorTailer(null);
            }
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getTailers();
    return () => {
      isMounted = false;
    };
  }, [id]);


  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="tomato" />
      ) : (
        <>
          {errorMovie ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-red-500 text-center text-3xl font-[OutfitSemiBold]">
                {errorMovie}
              </Text>
            </View>
          ) : (
            <View className="flex-1 w-full bg-black ">
              <StatusBar hidden={true} />
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerClassName="w-full  pb-[40px]"
              >
                <View
                  className="relative rounded-xl overflow-hidden"
                  style={{ width: screenWidth, height: screenWidth * 1.5 }}
                >
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/original${movie?.poster_path}`,
                    }}
                    style={{
                      width: screenWidth,
                      height: screenWidth * 1.5,
                      position: "absolute",
                    }}
                    resizeMode="contain"
                  />
                  <LinearGradient
                    colors={["rgba(0,0,0,1)", "transparent"]}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 120,
                      zIndex: 10,
                    }}
                  />
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,1)"]}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 120,
                      zIndex: 10,
                    }}
                  />
                </View>
                <ImageBackground
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`,
                  }}
                  blurRadius={3}
                  imageStyle={{
                    opacity: 0,
                    zIndex: -10,
                    transform: [{ translateY: -150 }],
                  }}
                  resizeMode="cover"
                >
                  <View className="flex-1 w-full p-5 flex-col gap-2 ">
                    <Text className="text-white text-3xl font-[OutfitBold]">
                      {movie?.title}
                    </Text>
                    <View className="flex-row items-center gap-2 my-1">
                      <Text className="text-white text- font-bold font-[OutfitBold]">
                        {`${movie?.release_date}  -`}
                      </Text>
                      <Text className="text-white text- font-bold font-[OutfitBold]">
                        {`${movie?.runtime} min  -`}
                      </Text>

                      <Text className="text-white">
                        Country : {`${movie?.origin_country}`}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Text className="text-white text-sm">Rating :</Text>
                      <View className="flex-row items-center border border-[tomato] px-3 py-1 rounded-lg gap-1">
                        <Text className="text-[tomato] text-sm font-[OutfitBold]">
                          {movie?.vote_average &&
                            Math.round(movie?.vote_average)}{" "}
                          / 10
                        </Text>
                        <Star color="orange" fill={"orange"} size={12} />
                      </View>
                      <View className="flex-row items-center gap-1">
                        <Text className="text-white text-sm">Vote :</Text>
                        <Text className="text-[tomato] text-lg font-[OutfitBold]">
                          {movie?.vote_count}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text className="text-white text-xl font-[OutfitSemiBold] ">
                        Overview
                      </Text>
                      <Text className="text-white text-md font-[OutfitRegular]">
                        {movie?.overview}
                      </Text>
                      <View className="flex-row justify-between items-center my-3">
                        <View className="gap-1">
                          <Text className="text-white text-md font-bold">
                            {`Status :`}
                          </Text>
                          <Text className="text-[tomato] text-md font-bold border border-[tomato] px-3 py-1 rounded-lg">
                            {`${movie?.status}`}
                          </Text>
                        </View>
                        <Text className="text-white text-md font-bold">
                          {`Realease : ${movie?.release_date} ( Worldwide )`}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-col gap-1">
                      {movie && movie?.production_companies?.length > 0 ? (
                        <View className="flex-col gap-1">
                          <Text className="text-white text-lg font-bold">
                            Production Companies
                          </Text>
                          <View className="flex-row items-center gap-2 flex-wrap">
                            {movie?.production_companies?.map(
                              (item, index: number) => (
                                <Text
                                  key={index}
                                  className="text-black bg-[tomato] px-3 py-0.5 rounded-lg text-sm font-[OutfitSemiBold]"
                                >
                                  {item.name}
                                </Text>
                              )
                            )}
                          </View>
                        </View>
                      ) : (
                        <View className="flex-col gap-1">
                          <Text className="text-white text-lg font-bold">
                            Production Companies : 
                          </Text>
                          <View className="flex-row items-center gap-2 flex-wrap">
                            <Text className="text-black bg-[tomato] px-3 py-0.5 rounded-lg text-sm font-[OutfitSemiBold]">
                              N/A
                            </Text>
                          </View>
                        </View>
                      )}


                     { movie  && movie?.genres?.length > 0 ? 
                     ( 
                      <View>
                        <Text className="text-white text-lg font-bold">
                          Genres
                        </Text>
                        <View className="flex-row items-center gap-2 flex-wrap">
                          {movie?.genres.map((item, index: number) => (
                            <Text
                              key={index}
                              className="text-black bg-[tomato] px-3 py-1 rounded-lg text-sm font-[OutfitSemiBold]"
                            >
                              {item.name}
                            </Text>
                          ))}
                        </View>
                      </View>
                      ) 
                     : 
                      (
                      <View>
                        <Text className="text-white text-lg font-bold">
                          Genres : 
                        </Text>
                        <View className="flex-row items-center gap-2 flex-wrap">
                          <Text
                            className="text-black bg-[tomato] px-3 py-1 rounded-lg text-sm font-[OutfitSemiBold]"
                          >
                            N/A
                          </Text>
                        </View>
                      </View>
                      )
                     }                         
                    </View>

                    {/* Tailer Section */}

                    {tailer && tailer.length > 0 && (
                      <View className="mt-5 flex-col w-full gap-2 pb-4">
                        <Text className="text-2xl font-[OutfitBold] text-white">
                          Official Tailer
                        </Text>
                        <View className="items-center">
                          <FlatList
                            data={
                              Array.isArray(tailer)
                                ? tailer
                                : tailer
                                  ? [tailer]
                                  : []
                            }
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            snapToAlignment="center"
                            snapToInterval={screenWidth * 0.8 + 15}
                            decelerationRate="fast"
                            contentContainerStyle={{
                              paddingHorizontal: 15,
                            }}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                              <View
                                className="bg-red-800 rounded-xl overflow-hidden"
                                style={{
                                  width: screenWidth * 0.8,
                                  aspectRatio: 16 / 9,
                                  marginRight: 10,
                                  overflow: "hidden",
                                  borderRadius: 12,
                                }}
                              >
                                <WebView
                                  source={{
                                    uri: `${YOUTUBE_BASE_URL}/${item.key}`,
                                  }}
                                  style={{ flex: 1 }}
                                  javaScriptEnabled
                                  domStorageEnabled
                                  allowsFullscreenVideo
                                  startInFullscreen
                                />
                              </View>
                            )}
                          />
                        </View>
                      </View>
                    )}

                    {movie?.homepage && (
                      <View className="flex-1 flex-row w-full gap-2">
                        <TouchableOpacity
                          onPress={() => Linking.openURL(movie?.homepage!)}
                          className="bg-[tomato] w-[70%] justify-center items-center py-3 rounded-xl my-3"
                        >
                          <Text className="text-black text-lg font-[OutfitBold]">
                            Official Home Page
                          </Text>
                        </TouchableOpacity>
                        <Link href='/search' asChild>
                        <TouchableOpacity
                          className="border-2 border-[tomato] flex-auto justify-center items-center py-3 rounded-xl my-3"
                        >
                          <Text className="text-[tomato] text-lg font-[OutfitBold]">
                            Back
                          </Text>
                        </TouchableOpacity>
                        </Link>
                      </View>
                    )}
                  </View>
                </ImageBackground>
              </ScrollView>
            </View>
          )}
        </>
      )}
    </>
  );
};
export default MovieDetails;
