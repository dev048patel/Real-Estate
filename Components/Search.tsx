import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import icons from '@/constants/icons';
import {useDebouncedCallback} from "use-debounce";


const Search = () => {
    const path = usePathname(); // returns on which route we are on
    const params = useLocalSearchParams<{query?: string}>(); //  gets the search query from the URL
    const [search, setSearch] = useState(params.query); // local state to manage teh search input dynamically 

    // Debounce Search - to limit the rate of function calls - setting it to 500ms
    const debounceSearch = useDebouncedCallback((text : string) => router.setParams({query: text}),500)


    const handleSearch = (text:string) =>{
        setSearch(text);
        debounceSearch(text); // calling the debounced function
    }
  return (
    <View className='flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2 '>
        <View className='flex-1 flex flex-row items-center  justify-start z-50'>
            <Image source={icons.search} className='size-5'/>
            {/* User Input */}
            <TextInput 
                value={search}
                onChangeText={handleSearch}
                placeholder='Search for anything'
                className='text-sm font-rubik text-black-200 ml-2 flex-1'        
            />
        </View>
        <TouchableOpacity>
            <Image source={icons.filter} className='size-5'/>
        </TouchableOpacity>

    </View>
  )
}

export default Search