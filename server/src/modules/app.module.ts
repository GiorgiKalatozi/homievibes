import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CaslModule } from './casl/casl.module';
import { CommentsModule } from './comments/comment.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { PostsModule } from './posts/posts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from '../config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configValidationSchema } from 'src/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [typeorm],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getOrThrow('typeorm'),
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    CaslModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
