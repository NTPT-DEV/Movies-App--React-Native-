import { Search } from 'lucide-react-native'
import { TextInput, View } from 'react-native'
const SearchBar = () => {
  return (
    <View className='flex-row items-center border border-gray-800 bg-zinc-900/80 drop-shadow-sm rounded-full px-5 py-4'>
        <Search color='tomato' size={28} />
       <TextInput
       onPress={()=>{}}
       placeholder='Search'
       onChange={()=> {}}
       placeholderTextColor="gray"
       className='flex-1 ml-2 text-white'
       />
    </View>
  )
}
export default SearchBar