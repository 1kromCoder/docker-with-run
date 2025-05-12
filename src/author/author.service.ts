import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateAuthorDto) {
    try {
      const post = await this.prisma.author.create({ data });
      return post;
    } catch (error) {
      throw new Error(`Failed to create author: ${error.message}`);
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
        phone,
        year,
      } = query;

      const skip = (page - 1) * limit;
      const where: any = {};

      if (name) where.name = { contains: name, mode: 'insensitive' };
      if (phone) where.phone = { contains: phone, mode: 'insensitive' };
      if (year) where.year = { contains: year, mode: 'insensitive' };

      const authors = await this.prisma.author.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: Number(skip),
        take: Number(limit),
      });

      return authors;
    } catch (error) {
      throw new Error(`Failed to get authors: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const author = await this.prisma.author.findFirst({ where: { id } });
      if (!author) throw new Error('Author not found');
      return author;
    } catch (error) {
      throw new Error(`Failed to get author: ${error.message}`);
    }
  }

  async update(id: number, data: UpdateAuthorDto) {
    try {
      const updated = await this.prisma.author.update({ where: { id }, data });
      return updated;
    } catch (error) {
      throw new Error(`Failed to update author: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.author.delete({ where: { id } });
    } catch (error) {
      throw new Error(`Failed to delete author: ${error.message}`);
    }
  }
}
