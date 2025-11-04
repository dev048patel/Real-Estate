import {Account, Avatars, Client, Databases,Storage, OAuthProvider} from 'react-native-appwrite';
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';

export const config = {
    platform : 'com.dev.real-estate',
    endpoint : process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
}

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform)

// this will genereate avatar using users first and last name
export const avatar = new Avatars(client);
// Create new user account
export const account = new Account(client);
// Database 
export const databases = new Databases(client);

// implementing functionality to authenticate user
export async function login(){
    try {
        const redirectUri = Linking.createURL('/')

        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);

        // if faild to login 
        if(!response) throw new Error('Failed to login');

        // open the auth session in the browser - if not working try with expo-web-browser
        const browserResult = await openAuthSessionAsync(response.toString(), redirectUri);

      if(browserResult.type != 'success') throw new Error('Failed to login');

        // if everything goes fine then we will get the url 
        const url = new URL(browserResult.url);

        // get secret from the url
        const secret = url.searchParams.get('secret')?.toString();
        // also for user id
        const userId = url.searchParams.get('userId')?.toString();
        
        // if not secret or user ID then throw error
        if(!secret || !userId) throw new Error('Failed to login');

        // But if we pass
        // crate new account session
        const session = await account.createSession(userId, secret);

        // if no session exists then throw error
        if(!session) throw new Error('Failed to login');

        return true;

    } catch (error) {
        console.error(error);
        return false;
    }
}

// // Implementhig CHATGPT suggested fix for login functionality
// export async function login() {
//     try {
//       const redirectUri = Linking.createURL('/');
//       const authURL = account.createOAuth2Token(OAuthProvider.Google, redirectUri);
  
//       // Wait for Appwrite to generate the URL (it’s usually immediate)
//       const browserResult = await openAuthSessionAsync(authURL.href, redirectUri);
  
//       if (browserResult.type !== 'success') throw new Error('Failed to login');
  
//       const url = new URL(browserResult.url);
//       const secret = url.searchParams.get('secret');
//       const userId = url.searchParams.get('userId');
  
//       if (!secret || !userId) throw new Error('Invalid callback params');
  
//       const session = await account.createSession(userId, secret);
//       if (!session) throw new Error('Failed to create session');
  
//       return true;
//     } catch (error) {
//       console.error('Login error:', error);
//       return false;
//     }
//   }
  

// logout functionality

export async function logout(){
    try {
        const result = await account.deleteSession('current');
        return result;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// fetch current user details
// export async function getCurrentUser(){
//     try {
//         const response = await account.get();
//         if(response.$id){
//             const userAvatar = avatar.getInitials(response.name);
//             return {
//                 ...response,
//                 avatar: userAvatar.toString(),
//             };
//         }
//         return null;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }

// Getting the initials:
export async function getCurrentUser() {
    try {
      const response = await account.get();
      if (response.$id) {
        // Manually build the avatar URL
        const avatarUrl = `${config.endpoint}/avatars/initials?name=${encodeURIComponent(response.name)}&project=${config.projectId}`;
  
        return {
          ...response,
          avatar: avatarUrl, // ✅ actual usable URL string
        };
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  

