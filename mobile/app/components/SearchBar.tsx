
import { BlurView } from 'expo-blur'
import { Search } from 'lucide-react-native'
import { TextInput } from 'react-native'

interface Props {
    placeholder : string 
    onPress : () => void
}

const SearchBar = ({placeholder , onPress} : Props) => {
  return (
    <BlurView
    intensity={100}
    tint='systemMaterialDark'
    className='flex-row items-center overflow-hidden border border-gray-800  rounded-full px-5 py-2'>
        <Search color='tomato' size={28} 
        />
       <TextInput
       onPress={onPress}
       placeholder={placeholder}
       onChange={()=> {}}
       placeholderTextColor="gray"
       className='flex-1 ml-2 text-white'
       />
    </BlurView>
  )
}
export default SearchBar