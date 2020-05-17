import { Feedback } from './types';
import { postJSON } from '../utils/request';

export const postFeedback = (feedback: Feedback) => {
  return postJSON('/api/feedback', feedback);
};
