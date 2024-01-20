import { Module } from '@nestjs/common';
import { CommentsController } from './comment.controller';
import { CommentsService } from './comment.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
