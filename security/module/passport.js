import LocalStrategy  from 'passport-local'
import bcrypt from 'bcrypt'
import passport from 'passport'

function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
      const user = await getUserByUsernameDefault(username)
      if (user == null) {
        return done(null, false, { message: 'No user !' })
      }
      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Password incorrect' })
        }
      } catch (e) {
        debug(e,"passport confif")
        return done(e)
      }
    }
  
    passport.use(new LocalStrategy.Strategy({ usernameField: 'username' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        let users = await getUserByIdDefault(id)
        let result = {
          username: users.username
        }
      return done(null,  result)
    })
  }

  const getUserByUsernameDefault =(username)=>{

  }
  const getUserByIdDefault = (id)=>{

  }
  export default function passportConfig (app){
    initialize(passport)
    app.use(passport.initialize())
    app.use(passport.session())
  }