import FirebaseTokenGenerator from 'firebase-token-generator'

export function generateToken(secret, authData) {
  const tokenGenerator = new FirebaseTokenGenerator(secret)
  return tokenGenerator.createToken(authData)
}

export function generateMasterToken(secret) {
  return generateToken(secret, {uid: 'masterUid'})
}
