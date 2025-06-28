import { BlurView } from "expo-blur";
import { Search } from "lucide-react-native";
import { TextInput } from "react-native";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, value, onChangeText }: Props) => {
  return (
    <BlurView
      intensity={100}
      tint="systemMaterialDark"
      className={`relative flex-row items-center overflow-hidden border border-gray-800  rounded-full px-5 py-2`}
    >
      <Search color="tomato" size={28} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="gray"
        className="flex-1 ml-2 text-white"
      /> 
        
    </BlurView>
  );
};
export default SearchBar;
