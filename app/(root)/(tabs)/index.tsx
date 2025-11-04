import { Card, FeaturedCard } from "@/Components/Cards";
import Filters from "@/Components/Filters";
import Search from "@/Components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useGlobalContext } from "@/lib/globalprovider";
import { Link } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  // getting real time user
  const {user} = useGlobalContext();
  console.log("Avatar data:", JSON.stringify(user?.avatar, null, 2));

  return (
    <SafeAreaView className="bg-white h-full">
      
      {/* FlatList */}
      <FlatList 
        data ={[1, 2, 3, 4]} 
        renderItem= {({item}) => <Card />}
        keyExtractor={(item) => item.toString()} // to convert number to string
        numColumns={2} // to show 2 cards in a row
        contentContainerClassName="pb-32" // to give padding at bottom
        columnWrapperClassName="flex gap-5 px-5 " // to give gap between 2 cards
        showsVerticalScrollIndicator={false} // to hide the scroll bar
        ListHeaderComponent={
          
          /* Header Implementation */
         <View className="px-5">
           {/* Avatar, Name, Good Morning */}
           <View className="flex flex-row items-center justify-between mt-5">
   
             <View className="flex flex-row">
               <Image source={{uri: user?.avatar}} className="size-12 rounded-full"/>
                 <View className="flex flex-col items-start ml-2 justify-center">
                   <Text className="text-xs font-rubik text-black-100">
                     Good Morning
                   </Text>
                   <Text className="text-base font-rubik-medium text-black-300">
                     {user?.name}
                   </Text>
                 </View>
             </View>
   
             {/* To show the number of notifications */}
             <Image source={icons.bell} className="size-6"/>
   
           </View>
            {/* Search Component importing from - Components->Search.tsx  */}
           <Search />
   
            {/* Featured Header */}
           <View className="my-5">
             <View className="flex flex-row items-center justify-between">
                 <Text className="text-xl font-rubik-bold text-black-300">
                   Featured
                 </Text>
                 <TouchableOpacity>
                   <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                 </TouchableOpacity>
             </View>

             {/* Another FlatList */}
             {/* Featured Card with horizontal  */}
             <FlatList 
                data={[1, 2, 3, 4]}
                renderItem={(item) => <FeaturedCard />} // Rendering Featured Card
                keyExtractor={(item) => item.toString()} // to convert number to string
                horizontal // to make it horizontal
                bounces={false} // to diable other scroll when we scroll horizontal
                showsHorizontalScrollIndicator={false} // to hide scroll bar
                contentContainerClassName="flex gap-5 mt-5"
             />
               
               {/* Featured Card Implementation from Components->Cards.tsx */}
               
           </View>
           {/* Our Recomendation Heading */}
           <View className="flex flex-row items-center justify-between">
                 <Text className="text-xl font-rubik-bold text-black-300">
                   Our Recomendation
                 </Text>
                 <TouchableOpacity>
                   <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                 </TouchableOpacity>
             </View>
             <Filters />
             
             
         </View>
         
         }
        />


     
    </SafeAreaView>
  );
};