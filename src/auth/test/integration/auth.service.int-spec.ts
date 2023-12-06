import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AuthService Int', () => {
  let prisma: PrismaService;
  let authService: AuthService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    authService = moduleRef.get(AuthService);
    await prisma.cleanDb();
  });

  const dto: AuthDto = {
    email: 'john@mail.com',
    password: '123',
    firstName: 'John',
    lastName: 'Doe',
  };
  describe('Signup user', () => {
    it('should sign up', async () => {
      const token = await authService.signup(dto);

      expect(token).toHaveProperty('access_token');
      expect(token).toHaveProperty('id');
    });

    it('should throw exception on duplicate', async () => {
      await authService
        .signup(dto)
        .then((token) => expect(token).toBeUndefined())
        .catch((error) => expect(error.status).toBe(403));
    });
  });

  describe('Sign in user', () => {
    it('should sign in', async () => {
      const token = await authService.signin(dto);

      expect(token).toHaveProperty('access_token');
      expect(token).toHaveProperty('id');
    });

    it('should throw exeption on invalid email', async () => {
      await authService
        .signin({ ...dto, email: 'mary@mail.com' })
        .then((token) => expect(token).toBeUndefined())
        .catch((error) => expect(error.status).toBe(403));
    });
  });
});
