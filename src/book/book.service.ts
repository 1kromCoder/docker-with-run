import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateBookDto) {
    try {
      const author = await this.prisma.author.findUnique({
        where: { id: data.authorId },
      });
      if (!author) {
        throw new Error('Author not found');
      }

      const post = await this.prisma.book.create({ data });
      return post;
    } catch (error) {
      throw new Error(`Failed to create book: ${error.message}`);
    }
  }

  async findAll(query: any) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'id',
        sortOrder = 'asc',
        name,
        authorId,
      } = query;

      const skip = (page - 1) * limit;
      const where: any = {};

      if (name) where.name = { contains: name, mode: 'insensitive' };
      if (authorId) where.authorId = Number(authorId);

      const books = await this.prisma.book.findMany({
        where,
        include: { author: true },
        orderBy: { [sortBy]: sortOrder },
        skip: Number(skip),
        take: Number(limit),
      });

      return books;
    } catch (error) {
      throw new Error(`Failed to get books: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const book = await this.prisma.book.findFirst({ where: { id } });
      if (!book) throw new Error('Book not found');
      return book;
    } catch (error) {
      throw new Error(`Failed to get book: ${error.message}`);
    }
  }

  async update(id: number, data: UpdateBookDto) {
    try {
      const updated = await this.prisma.book.update({ where: { id }, data });
      return updated;
    } catch (error) {
      throw new Error(`Failed to update book: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.book.delete({ where: { id } });
    } catch (error) {
      throw new Error(`Failed to delete book: ${error.message}`);
    }
  }
}
