import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider } from 'firebase/auth'

import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from './src/utils/constants'

const firebaseConfig = {
  'apiKey': API_KEY,
  'authDomain': AUTH_DOMAIN,
  'projectId': PROJECT_ID,
  'storageBucket': STORAGE_BUCKET,
  'messagingSenderId': MESSAGING_SENDER_ID,
  'appId': APP_ID,
  'measurementId': MEASUREMENT_ID,
}

export const app = initializeApp( firebaseConfig )
export const provider = new GoogleAuthProvider()
