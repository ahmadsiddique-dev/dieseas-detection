import { validator } from '../validator';
import bcrypt from 'bcryptjs';

describe('Validator Hook', () => {
    it('should return true for matching passwords', async () => {
        const plainPassword = 'mySecurePassword123';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        const result = await validator(plainPassword, hashedPassword);
        expect(result).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
        const plainPassword = 'mySecurePassword123';
        const wrongPassword = 'wrongPassword456';

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        const result = await validator(wrongPassword, hashedPassword);
        expect(result).toBe(false);
    });
});
