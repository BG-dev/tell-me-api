import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';

@Controller('user')
@UseGuards(RolesGuard)
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
  findOne(@Param('id', ParseIntPipe) id: string): string {
    return `This endpoint returns a ${id} user`;
  }

  @Post()
  @Roles(['admin'])
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
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
