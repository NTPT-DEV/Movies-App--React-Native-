import { Link } from "expo-router";
import { Star } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
const MovieCard = ({
  id,
  title,
  poster_path,
  release_date,
  vote_average,
}: Movie) => {
  if (!poster_path) return null;
  const vote = Math.round(vote_average / 2);

  return (
    <>
      <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity className="w-[30%] h-auto gap-y-1">
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
            className="w-full h-[150px] rounded-lg aspect-auto"
            resizeMode="cover"
          />
          <View className="mt-1 gap-y-1 px-1">
            <Text
              numberOfLines={1}
              className="text-sm text-white font-[OutfitSemiBold]"
            >
              {title}
            </Text>
            <View className="flex-row gap-1 items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  color="orange"
                  fill={index < vote ? "orange" : "none"}
                  size={12}
                />
              ))}
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-xs text-white">
                {release_date?.split("-")[0]}
              </Text>
              <Text className="text-xs text-white font-[OutfitSemiBold]">
                MOVIE
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    </>
  );
};
export default MovieCard;
