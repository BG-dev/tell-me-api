import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';

@Controller('user')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private userService: UserService) {}
 
  @Get()
  findAll(@Query('age') age: number): User[] {
    throw new BadRequestException('Something bad', {
      cause: new Error(),
      description: 'Some error desc',
    });
    // return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This endpoint returns a ${id} user`;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    throw new ForbiddenException();
    // return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): string {
    return `This endpoint updated user ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `User ${id} was removed`;
  }
}
