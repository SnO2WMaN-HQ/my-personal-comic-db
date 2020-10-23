import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {BooksService} from '../books/books.service';
import {Bookshelf} from '../bookshelves/entity/bookshelf.entity';
import {BookshelfRecord} from './entity/bookshelf-record.entity';

@Injectable()
export class BookshelfRecordsService {
  constructor(
    @InjectRepository(BookshelfRecord)
    private readonly bookshelfRecordsRepository: Repository<BookshelfRecord>,

    @InjectRepository(Bookshelf)
    private readonly bookshelvesRepository: Repository<Bookshelf>,

    private readonly bookService: BooksService,
  ) {}

  async findOne(id: string) {
    return this.bookshelfRecordsRepository.findOneOrFail(id);
  }

  async create(bookshelfId: string, bookId: string): Promise<BookshelfRecord> {
    if (!this.bookService.exists(bookId)) throw Error('Unexist book');

    const bookshelf = await this.bookshelvesRepository.findOne(bookshelfId, {
      relations: ['records'],
    });

    if (!bookshelf) throw Error('Unexist bookshelf');

    return (
      bookshelf.records.find((record) => record.book === bookId) ||
      this.bookshelfRecordsRepository.save({bookshelf, book: bookId})
    );
  }
}