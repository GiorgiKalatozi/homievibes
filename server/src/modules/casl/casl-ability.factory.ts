import { Injectable } from '@nestjs/common';
import { Action } from 'src/common/enums';
import { Post } from '../posts/entities/post.entity';
import { User } from '../users/entities/user.entity';
import {
  AbilityClass,
  PureAbility,
  InferSubjects,
  AbilityBuilder,
  ExtractSubjectType,
} from '@casl/ability';

type Subjects = InferSubjects<typeof Post | typeof User> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      PureAbility<[Action, Subjects]>
    >(PureAbility as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }

    can(Action.Update, Post, { authorId: user.id });
    cannot(Action.Delete, Post, { isPublished: true });

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
