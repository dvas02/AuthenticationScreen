import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
}) // setting these default values helps with auto completion


function AuthContextProvider({children}){

  const [authToken, setAuthToken] = useState()

  function authenticate(token){
    setAuthToken(token)
    AsyncStorage.setItem('token', token) 
    //Sets new item in storage, need to give it a key to retrieve or delete this item
    //and 2nd item is the item being stored MUST be in a string
  }

  function logout(){
    setAuthToken(null)
    AsyncStorage.removeItem('token')
  }

  const value = { //this is setting the AuthContext things defined above
    token: authToken,
    isAuthenticated: !!authToken, //If there is one its true, if not false
      // This is bc you only have a token if you are logged in or sign up successfully
    authenticate: authenticate,
    logout: logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;