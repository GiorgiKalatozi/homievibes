import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CaslModule } from './casl/casl.module';
import { CommentsModule } from './comments/comment.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [AuthModule, UserModule, PostsModule, CaslModule, CommentsModule],
  controllers: [],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
