import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '@/constants/icons'

import { settings } from '@/constants/data'
import { logout } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/globalprovider'



// Step - 3 - Settings Item Props
interface SettingsItemProps{
  icon:ImageSourcePropType;
  title: string;
  onPress?: () => void; // This is an optional call back function which returns nothing 
  textStyle?: string;  // Is is an optional prop
  showArrow?: boolean;  // Is is an optional prop
}



// Step - 2 - Settings Item Component - Reusable Component
  // Making it onPress 
const SettingsItem = ({icon, title, onPress, textStyle, showArrow = true} : SettingsItemProps) => (
  <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3 '>
    <View className='flex flex-row items-center gap-3'>
      {/* We will pass icon which we can deside on the below Code */}
      <Image source = {icon} className='size-6'/>
      {/* Make the text CSS dynamic */}
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
    </View>

    {/* ShowArrow is true or false */}
    {showArrow && <Image source={icons.rightArrow} className='size-5'/> }
  </TouchableOpacity>
)



// Step - 1 - Create the Profile Screen
const Profile = () => {
  
  // Step - 5 - Get the user and refetch from Global Context
  const {user, refetch} = useGlobalContext();

  

  // Step - 4 -  Handle Logout Function
  const handleLogout = async () => {
  const result = await logout();
    if(result){
      Alert.alert("Success", "Logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "Falied to Logout");
    }
  }

  return (
    // To have the text in safe area
    // ScroolView -> so that we can scroll the phone if the context are not been able to shown in the mobile screen
    <SafeAreaView className='h-full bg-white'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        {/* Profile Name and Bell Icon */}
        <View className='flex flex-row items-center justify-between mt-5'>
          <Text className="text-xl font-rubik-bold">
            Profile
          </Text>
          <Image source={icons.bell} className='size-5'/>
        </View>

        {/* Profile Avatar Section */}
        <View className='flex-row justify-center flex mt-5'>
            <View className='flex flex-col items-center relative mt-5'>
              {/* Getting real time image */}
              <Image source ={{uri: user?.avatar}}  className='size-44 relative rounded-full'/>
              {/* Button -> icons.edit to allow the user to edit the icon */}
              <TouchableOpacity className='absolute bottom-11 right-2'>
                <Image source={icons.edit} className='size-9'/>
              </TouchableOpacity>
              <Text className='text-2xl font-rubik-bold mt-2'>
                {user?.name}
              </Text>
            </View>
          
        </View>


        {/* Settings */}
          {/* Settings Item Component Usage */}
        <View className='flex flex-col mt-10'>
        <SettingsItem icon={icons.calendar} title="My Bookings"/>
        <SettingsItem icon={icons.wallet} title="Payments"/>
        </View>

        {/* Other Settings - to get from constants->data.ts */}
          {/* We have made the first 2 (My Bookings, Payment) above we will skip them and will get the others from data.ts */}
          {/* Using .map() to loop over each remaining element to process or render it*/}
        <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
        {settings.slice(2).map((item,index)=>(
          <SettingsItem key={index} {...item}/>
        ))}
        </View>

        {/* LOGOUT */}
        <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
          <SettingsItem icon={icons.logout} title="Logout" textStyle='text-danger' showArrow={false} onPress={handleLogout}/>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile