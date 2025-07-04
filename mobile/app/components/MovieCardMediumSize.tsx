import { Link } from "expo-router";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

const MovieCardMediumSize = ({ id, title, poster_path, release_date }: Movie) => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <>
      <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity>
          <View style={{width: screenWidth * 0.3 }}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
              resizeMode="contain"
              style={{
                width: screenWidth * 0.3 ,
                height: 200,
                aspectRatio: 2 / 3,
                borderRadius : 12
              }}
            />
            <View className="mt-1 gap-y-1 px-2">
              <Text
                numberOfLines={1}
                className="text-sm text-white font-[OutfitSemiBold] text-wrap"
              >
                {title}
              </Text>
              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-white">
                  {release_date?.split("-")[0]}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    </>
  );
};
export default MovieCardMediumSize;
