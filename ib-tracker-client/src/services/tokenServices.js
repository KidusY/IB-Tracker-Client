import config from '../config'

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token)
  },
  saveUser(user,userId,profilePic='') {
    window.localStorage.setItem(config.USER, user)
    window.localStorage.setItem(config.USERID, userId)
    window.localStorage.setItem(config.PROFILEPIC, profilePic)

  },
  
  getUser(){
    return{
      user_name: window.localStorage.getItem(config.USER),
      userId: window.localStorage.getItem(config.USERID),
      profilePic: window.localStorage.getItem(config.PROFILEPIC),
    } 
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY)
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY)
    window.localStorage.removeItem(config.USER)
    window.localStorage.removeItem(config.USERID)
    window.localStorage.removeItem(config.PROFILEPIC)
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  
}

export default TokenService