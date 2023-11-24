import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  statement: string;

  @Column({ type: 'jsonb' })
  options: Array<string>;
  
  @ManyToOne((type) => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  constructor(statement:string, options: string[], quiz: Quiz){
    this.statement = statement;
    this.options = options;
    this.quiz = quiz;
  }
}
