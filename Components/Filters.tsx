import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { categories } from '@/constants/data';

const Filters = () => {

    const params = useLocalSearchParams<{filter?: string}>();
    const [selectedCategory, setSelectedCategory] = useState(params.filter || 'All'); // Default to 'All' if no filter parameter

    // Function to handle Category
    const handleCategoryPress = (category: string) => {
            if(selectedCategory === category){             
                // make the setSelectedCategory to 'All' as Default
                setSelectedCategory('All'); 
                router.setParams({filter: 'All'}); // Update the URL parameter to 'All'
                return ;
            }
            setSelectedCategory(category); // if user selects a different category
            router.setParams({filter: category}); // Update the URL parameter
    }

  return (
    // Horizontal ScrollView for Categories - from constants -> data.ts
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-3 mb-2'>
        {categories.map((item, index)=> (
            // Each Category Button - onPress, we will call handleCategoryPress function - to set the selected category blue
            <TouchableOpacity onPress={()=> handleCategoryPress(item.category)} 
                className={
                    `flex flex-col items-start mr-4 px-4 py-2 rounded-full 
                    ${selectedCategory === item.category ? 'bg-primary-300' : 'bg-primary-100 border border-primary-200' } 
                    `}>
                {/* Dynamic text when selected color change */}
                <Text className={`text-sm ${selectedCategory === item.category ? 'text-white font-rubik-bold mt-0.5' : 'text-black-300 font-rubik' }`}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        ))}
    </ScrollView>
  )
}

export default Filters