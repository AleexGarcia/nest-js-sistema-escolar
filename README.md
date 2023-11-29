# API - Sistema Escolar de multiplos acessos - EM DESENVOLVIMENTO

## Description

Api - Sistema escolar

## Requisistos dos sistema

- [] Acessos: Aluno, Professor, Admin
- [] Autenticação de usuários
- [] Editar perfil

### Aluno

- [] Matricular nas disciplinas
- [] Visualizar disciplinas matriculadas
- [] Visualizar tarefas completas e incompletas por disciplinas
- [] Responder questionario da disciplina.

### Professor

- [] Visualizar disciplinas assignadas
- [] Visualizar Alunos Matriculados em suas disciplinas
- [] CRUD Questionarios

### Admin

- [] CRUD Usuários
- [] CRUD de Disciplinas, assignando um professor a cada disciplina.

## Entidades

### User

- id
- name
- email
- password
- role

### Student

- extends User
- enrollments
- Tasks


### Teacher

- extends User
- assignedCourses

### Admin

- extends User

### Course

- id
- name
- teacher
- code
- enrollments
- quizzes

### Task

- id
- quiz
- status
- student

### Quiz

- id
- name
- description
- createAt
- deadlineDate
- questions[]
- course

### Question

- id
- statement
- options[]
- quiz

### Enrollment
- id
- status
- enrollmentDate
- student
- course

## Diagrama de ER do banco de dados

![Diagrama de ER do banco de dados](./Diagrama%20ER%20de%20banco%20de%20dados_%20Sistema%20escolar.svg)

<!-- 
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE). -->
