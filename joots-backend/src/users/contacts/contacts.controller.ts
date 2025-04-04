// src/controllers/user-contacts.controller.ts
import { 
    Controller, 
    Get, 
    Post, 
    Delete, 
    Param, 
    Body, 
    UseGuards,
    Request,
    NotFoundException,
    BadRequestException
  } from '@nestjs/common';
  import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
  import { UserContactsService } from './contacts.service';
  
  @Controller('users/contacts')
  @UseGuards(JwtAuthGuard)
  export class UserContactsController {
    constructor(private userContactsService: UserContactsService) {}
  
    @Get()
    async getContacts(@Request() req) {
      try {
        const userId = req.user.id;
        const contacts = await this.userContactsService.getUserContacts(userId);
        return contacts;
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    @Post()
    async addContact(@Request() req, @Body() body: { contactId: string }) {
      try {
        const userId = req.user.id;
        const { contactId } = body;
        
        if (!contactId) {
          throw new BadRequestException('contactId est requis');
        }
        
        await this.userContactsService.addUserContact(userId, contactId);
        return { success: true };
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    @Delete(':contactId')
    async removeContact(@Request() req, @Param('contactId') contactId: string) {
      try {
        const userId = req.user.id;
        
        // Vérifier si le contact existe
        const isContact = await this.userContactsService.isUserContact(userId, contactId);
        if (!isContact) {
          throw new NotFoundException('Contact non trouvé');
        }
        
        await this.userContactsService.removeUserContact(userId, contactId);
        return { success: true };
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    @Get(':contactId/check')
    async checkContact(@Request() req, @Param('contactId') contactId: string) {
      const userId = req.user.id;
      const isContact = await this.userContactsService.isUserContact(userId, contactId);
      return { isContact };
    }
  }