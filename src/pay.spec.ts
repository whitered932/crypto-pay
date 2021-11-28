import createPayInstance, { CryptoPay } from './index';

describe('CryptoPay', () => {
  describe('createPayInstance()', () => {
    it('Must be instance of Pay', () => {
      expect(createPayInstance('')).toBeInstanceOf(CryptoPay);
    });
  });
});
