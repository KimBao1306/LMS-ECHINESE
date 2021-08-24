type answerObj = {
  ID: number;
  AnswerContent: string;
  isTrue: boolean;
};

type questionObj = {
  Content: string;
  ExerciseGroupID: number;
  SubjectID: number;
  SubjectName: string;
  DescribeAnswer: string;
  Level: number;
  LevelName: string;
  LinkAudio: string;
  Type: number;
  TypeName: string;
  ExerciseAnswer: Array<answerObj>;
};

export const questionObj = {
  Content: "",
  ExerciseGroupID: 0,
  SubjectID: null,
  SubjectName: "",
  DescribeAnswer: "",
  Level: null,
  LevelName: "",
  LinkAudio: "",
  Type: 0,
  TypeName: "",
  ExerciseAnswer: [
    {
      ID: 1,
      AnswerContent: "",
      isTrue: false,
    },
    {
      ID: 2,
      AnswerContent: "",
      isTrue: false,
    },
    {
      ID: 3,
      AnswerContent: "",
      isTrue: false,
    },
    {
      ID: 4,
      AnswerContent: "",
      isTrue: false,
    },
  ],
};

export const dataMultiple = {
  ExerciseGroupID: 0,
  SubjectID: null,
  SubjectName: "",
  DescribeAnswer: "",
  Level: null,
  LevelName: "",
  LinkAudio: "",
  Type: 0,
  TypeName: "",
  ExerciseAnswer: [
    {
      ID: 1,
      AnswerContent: "",
      isTrue: null,
    },
    {
      ID: 2,
      AnswerContent: "",
      isTrue: null,
    },
    {
      ID: 3,
      AnswerContent: "",
      isTrue: null,
    },
    {
      ID: 4,
      AnswerContent: "",
      isTrue: null,
    },
  ],
};
