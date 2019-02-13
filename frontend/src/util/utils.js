import short from 'short-uuid';

const translator = short();

export const generateId = () => {
  return translator.new();
};
