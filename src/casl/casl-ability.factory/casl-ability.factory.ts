import {
  AbilityBuilder,
  InferSubjects,
  createMongoAbility,
  MongoAbility,
  ExtractSubjectType,
} from '@casl/ability';
import { Actions } from '../enum/action.enum';
import { Course } from 'src/courses/entities/course.entity';
import { Enrollment } from 'src/enrollments/entities/enrollment.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { User } from 'src/users/entities/user.entity';
import { Task } from 'src/tasks/entities/task.entity';

type Subjects =
  | InferSubjects<
      | typeof Course
      | typeof Enrollment
      | typeof Question
      | typeof Quiz
      | typeof User
      | typeof Task
    >
  | 'all';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );
    switch (user.role) {
      case 'Student':
        can([Actions.Manage], Enrollment);
        can([Actions.Read, Actions.Update], Task, { status: false });
        can([Actions.Read], Quiz);
        cannot([Actions.Manage], Course);
        break;
      case 'Teacher':
        can(Actions.Read, Course);
        can(Actions.Read, Enrollment);
        can(Actions.Manage, Quiz);
        can(Actions.Manage, Question);
        can([Actions.Create, Actions.Update, Actions.Delete], Task);
        break;
      case 'Admin':
        can(Actions.Manage, User);
        can(Actions.Manage, Course);
        break;
    }
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
