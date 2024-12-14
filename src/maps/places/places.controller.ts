import { Controller, Get, Query } from '@nestjs/common';

@Controller('places')
export class PlacesController {

  @Get()
  findPlaces(@Query('text') text: string) {
    return `Meus endereço e ${text}`
  }

}
