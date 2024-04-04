// test/utils.test.js
import { expect } from 'chai';
import { hashPassword, verifyPassword } from '../../services/utils.js';

describe('Utils Testing', () => {
  it('should hash and verify a password correctly', async () => {
    // Definir una contraseña de prueba
    const password = 'password123';

    try {
      // Hashear la contraseña
      const hashedPassword = await hashPassword(password);

      // Verificar que el resultado del hash no sea nulo
      expect(hashedPassword).to.not.be.null;

      // Verificar que el hash no sea igual a la contraseña original
      expect(hashedPassword).to.not.equal(password);

      // Verificar la contraseña
      const isMatch = await verifyPassword(password, hashedPassword);

      // Verificar que la contraseña coincida correctamente
      expect(isMatch).to.be.true;
    } catch (error) {
      // Si hay un error, falla la prueba
      throw new Error(`Error in test: ${error.message}`);
    }
  });
});
