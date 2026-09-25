import { DetailedLesson } from '../../detailedLessons';
import { lesson6_1 } from './lesson6_1';
import { lesson6_2 } from './lesson6_2';
import { lesson6_3 } from './lesson6_3';
import { lesson6_4 } from './lesson6_4';

export const stringsLessons: Record<string, DetailedLesson> = {
  ...lesson6_1,
  ...lesson6_2,
  ...lesson6_3,
  ...lesson6_4,
};
