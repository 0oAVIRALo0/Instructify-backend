import dotenv from 'dotenv'
dotenv.config()

const options = {
  httpOnly: true,  
  secure: process.env.NODE_ENV === 'production', 
  sameSite: 'Strict', 
}
  
export { options }