import { Controller, Get, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupRequestDto } from './dtos/create-group.dto';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get('all')
  async getAll() {
    return this.groupService.getMany({});
  }

  @Post()
  async createGroup(groupRequestDto: CreateGroupRequestDto) {
    return this.groupService.create(groupRequestDto);
  }
}
