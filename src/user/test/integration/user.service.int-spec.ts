import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';

describe('UserService Int', () => {
  let prisma: PrismaService;
  let authService: AuthService;
  let userService: UserService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    authService = moduleRef.get(AuthService);
    userService = moduleRef.get(UserService);
    await prisma.cleanDb();
  });

  describe('Edit user', () => {
    let userId: string;

    it('should sign up an user', async () => {
      const dto: AuthDto = {
        email: 'john@mail.com',
        password: '123',
        firstName: 'John',
        lastName: 'Doe',
      };

      // signup user
      const user = await authService.signup(dto);

      expect(user).toHaveProperty('access_token');
      expect(user).toHaveProperty('id');

      // set userId
      userId = user.id;
    });

    it('should edit the user', async () => {
      const dto: EditUserDto = {
        firstName: 'Johnny',
      };
      const user = await userService.editUser(userId, dto);

      expect(user.firstName).toBe(dto.firstName);
    });
  });
});
