// THis is a special layout - for property and tabs - all the pages the user have to be authenticated

import { useGlobalContext } from "@/lib/globalprovider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout(){

    // get access to loading state and isLoggedIn from global context
    const {loading, isLoggedIn} = useGlobalContext();

    // This is like a loader - while checking auth state
    if(loading){
        return(
            <SafeAreaView className="bg-white h-full fkex justify-center items-center ">
                
                <ActivityIndicator className="text-primary-300" size="large" />
            </SafeAreaView>
        )
    }

    // If not logged in - redirect to sign-in page 
    if(!isLoggedIn )return <Redirect href="/sign-in" /> 


    // If we are not loading and user is logged in return Slots - mean current screen
    return <Slot />;

}