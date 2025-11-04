// THis is specific for 3 pages to navigate through tabs - property, favorites, profile

// It is like a shared piece of UI for these 3 pages

import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import icons from '@/constants/icons';

// Step - 2 - CREATE custom tab icons component (because we cannot fit the names in the tab bar)
// And also changing the Tint color of Image -> depend on focused or not
// Also a Dynamic state depends on Focused(Blue) or not(Black) -> and fixed text size irrespective of focused state
const TabIcon = ({focused, icon, title} :{focused: boolean; icon: any; title: string}) => (
    <View className='flex-1 mt-3 flex flex-col items-center'>
        <Image source={icon} tintColor={focused ? '#0061ff' : '#666876' } resizeMode='contain' className='size-6' />
       
        <Text className={`${focused ? 
            'text-primary-300 font-rubik-medium' :
            'text-black-200 font-rubik'}
            text-xs w-full text-center mt-1`}
        >
            {title}
        </Text>
    </View>
)



// Step-1 - CREATE Tabs Layout Component
const TabsLayout = () => {
  return (

    // Tabs component from expo-router
    // Have some options - screenOptions - to customize the tab bar
    // like activeTintColor, inactiveTintColor, style, labelStyle etc

    // We can create different screens by saying Tabs.Screen
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: 'white',
                position: 'absolute',
                borderTopColor: '#0061FF1A',
                borderTopWidth: 1,
                minHeight: 70,
            }
        }}
    >
        <Tabs.Screen 
            name="index"
            options = {{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon 
                        icon={icons.home}
                        focused={focused}
                        title = "Home"
                    />
                )
            }}
        />
         <Tabs.Screen 
            name="explore"
            options = {{
                title: 'Explore',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon 
                        icon={icons.search}
                        focused={focused}
                        title = "Explore"
                    />
                )
            }}
        />
         <Tabs.Screen 
            name="profile"
            options = {{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon 
                        icon={icons.person}
                        focused={focused}
                        title = "Profile"
                    />
                )
            }}
        />
      
    </Tabs>
  )
}

export default TabsLayout;
