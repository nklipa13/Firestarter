import { imageExists } from '../../../services/utils';

const startProjectFormAsyncValidator = values => new Promise(async (resolve, reject) => {
  try {
    await imageExists(values.imageUrl);
    resolve();
  } catch (e) {
    reject({ imageUrl: 'Failed to load' });
  }
});

export default startProjectFormAsyncValidator;
