import CryptoJS from 'crypto-js'
const decryptUsername = (username: string | undefined | null): string | null => {
  if (!username) {
    return null
  }

  try {
    const userName = atob(username)
    const secretKey = process.env.SECRET_KEY
    if (!secretKey) {
      throw new Error('SECRET_KEY is not defined')
    }

    const decryptedUsername = CryptoJS.AES.decrypt(userName, secretKey).toString(CryptoJS.enc.Utf8)
    return decryptedUsername
  } catch (error) {
    console.error('🚀 ~ decryptUsername ~ error:', error)
    return null
  }
}

const encrypt = (plainText: string): string => {
  const secretKey = process.env.SECRET_KEY
  if (!secretKey) {
    throw new Error('SECRET_KEY is not defined')
  }
  const encryptedText = CryptoJS.AES.encrypt(plainText, secretKey).toString()
  return encryptedText
}

export { decryptUsername, encrypt }
