import { getMoviebyID } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const MovieDetails = () => {
  const [movie, setMovies] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        const parsedId = Array.isArray(id) ? id[0] : id;
        const res = await getMoviebyID({ id: parsedId });

        if (!res) {
          setMovies(undefined);
          setError("Movie not found");
        } else {
          setMovies(res);
          setError(null);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [id]);

  //  console.log(JSON.stringify(movie, null, 2));

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="tomato" />
      ) : (
        <>
          {error ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-red-500 text-center text-3xl font-[OutfitSemiBold]">
                {error}
              </Text>
            </View>
          ) : (
            <View className="flex-1 justify-center items-center bg-black">
              <Text className="text-white text-2xl font-bold">
                {movie?.title.toLocaleUpperCase()}
              </Text>
            </View>
          )}
        </>
      )}
    </>
  );
};
export default MovieDetails;
