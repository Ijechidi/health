import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

// Simplicity - Just a simple service to create and list users
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(email: string , nom: string) {
    const user = await this.prisma.utilisateur.create({
      data: { email , nom },
    });

    return user;
  }

  async listUsers() {
    const users = await this.prisma.utilisateur.findMany();

    if (!users || users.length === 0) {
      throw new NotFoundException(`No users found`);
    }
    return users;
  }
}
