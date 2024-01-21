import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CaslModule } from './casl/casl.module';
import { CommentsModule } from './comments/comment.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [AuthModule, UsersModule, PostsModule, CaslModule, CommentsModule],
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
