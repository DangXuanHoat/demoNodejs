import LocalStrategy  from 'passport-local'
import bcrypt from 'bcrypt'
import passport from 'passport'
import User from '../../database/model/User.js'
import {isEmpty} from '../../utils/validInput.js'
import Database from '../../database/index.js'


function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
      const user = await getUserByUsernameOrEmail(username)
      if (isEmpty(user)) {
        return done(null, false, { message: 'No user !' })
      }
      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Password incorrect' })
        }
      } catch (e) {
        debug(e,"passport config")
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

  const getUserByUsernameOrEmail =async (usernameOrEmail)=>{
    let DB = new Database()
    let connectionManager =  await DB.getConnectionManager()
    let responsitory =  connectionManager.get().getRepository("User")
    let user =  await responsitory.find({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    })
    return user
  }
  const getUserByIdDefault = async(id)=>{
    let DB = new Database()
    let connectionManager =  await DB.getConnectionManager()
    let responsitory =  connectionManager.get().getRepository("User")
    let user =  await responsitory.findByIds(id)
    return user
  }
  export default function passportConfig (app){
    let DB = new Database()
    initialize(passport)
    app.use(passport.initialize())
    app.use(passport.session())
  }