import { Link } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";

const MovieCardUpcoming = ({ id, title, poster_path, release_date }: Movie) => {

  return (
    <>
      <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity>
          <View style={{ width: "100%" }}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 290,
                aspectRatio: 0.7,
                borderRadius : 12
              }}
            />
            {/* <View className="mt-1 gap-y-1 ">
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
            </View> */}
          </View>
        </TouchableOpacity>
      </Link>
    </>
  );
};
export default MovieCardUpcoming;
