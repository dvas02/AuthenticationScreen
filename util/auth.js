import axios from 'axios'

const API_KEY = 'AIzaSyA14pGVjq_f9VRkLrBqeN9VODsJOvWS0BU'

async function authenticate(mode, email, password){
  // Mode is signin or signup since the two functions are pretty much the same
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`
  const response = await axios.post(url, {
    email: email,
      password: password,
      returnSecureToken: true,
  })

  //console.log(response.data)
  const token = response.data.idToken

  return token

}

export function createUser(email, password){
  return authenticate('signUp', email, password)
}
export function login(email, password){
  return authenticate('signInWithPassword', email, password)
}
