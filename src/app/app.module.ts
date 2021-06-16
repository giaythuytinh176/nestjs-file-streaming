import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { FileModel } from './models/file.entity'

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://root:root@127.0.0.1:27017/streaming?authSource=admin`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
    ),
    MongooseModule.forFeature([{ name: 'fs.files', schema: FileModel }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
