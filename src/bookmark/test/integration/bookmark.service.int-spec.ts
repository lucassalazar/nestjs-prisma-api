import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthDto } from 'src/auth/dto';
import { BookmarkService } from 'src/bookmark/bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from 'src/bookmark/dto';
import { PrismaService } from 'src/prisma/prisma.service';

describe('BookmarkService Int', () => {
  let prisma: PrismaService;
  let authService: AuthService;
  let bookmarkService: BookmarkService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    authService = moduleRef.get(AuthService);
    bookmarkService = moduleRef.get(BookmarkService);
    await prisma.cleanDb();
  });

  let userId: string;
  let bookmarkId: number;
  describe('Create bookmark', () => {
    it('should sign up', async () => {
      const authDto: AuthDto = {
        email: 'john@mail.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password',
      };
      const user = await authService.signup(authDto);

      expect(user).toHaveProperty('access_token');
      expect(user).toHaveProperty('id');

      userId = user.id;
    });

    it('should create a bookmark', async () => {
      const bookmarkDto: CreateBookmarkDto = {
        title: "Joe's Site",
        link: 'https://joedoe.com',
        description: 'My personal website',
      };
      const bookmark = await bookmarkService.createBookmark(
        userId,
        bookmarkDto,
      );
      expect(bookmark.title).toBe(bookmarkDto.title);
      expect(bookmark.link).toBe(bookmarkDto.link);
      expect(bookmark.description).toBe(bookmarkDto.description);
      bookmarkId = bookmark.id;
    });
  });

  describe('Edit bookmark', () => {
    const dto: EditBookmarkDto = {
      description: 'My personal site',
    };
    it('should edit a bookmark', async () => {
      const bookmark = await bookmarkService.editBookmarkById(
        userId,
        bookmarkId,
        dto,
      );

      expect(bookmark.description).toBe(dto.description);
    });
  });
});
