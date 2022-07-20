import mongoose from "mongoose"

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb+srv://jotaemepm:_8xqF4ryPsh35Kv@cluster0.aoefb.mongodb.net/?retryWrites=true&w=majority'),
  },
]
