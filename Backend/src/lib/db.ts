import mongoose from 'mongoose'
import { env } from '../env'

const MONGODB_URI = env.MONGODB_URI || 'mongodb://127.0.0.1:27017/easylearn'

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached.conn) return cached.conn

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  })
  console.log("Successfully connected to MongoDB")

  cached.conn = await cached.promise
  return cached.conn
}