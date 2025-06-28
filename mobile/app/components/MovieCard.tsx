import { Link } from 'expo-router';
import { Image, Text, TouchableOpacity } from 'react-native';
const MovieCard = ({id , title , poster_path , release_date } : Movie) => {

  return (
    <Link href={`/movies/${id}`} asChild >
        <TouchableOpacity className='w-[30%] h-auto'>
            <Image
            source={{uri : `https://image.tmdb.org/t/p/w500${poster_path}`}}
            // style={{width : '100%', height : 150, borderRadius : 10}}
            className='w-full h-52 rounded-lg '
            resizeMode='cover'
            />
            <Text className='text-sm text-white'>{title}</Text>
            <Text className='text-sm text-white'>{release_date}</Text>
        </TouchableOpacity>
    </Link>
  )
}
export default MovieCard