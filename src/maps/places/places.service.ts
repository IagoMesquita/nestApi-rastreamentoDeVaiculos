import { Injectable } from '@nestjs/common';
import {
  Client as GoogleMapsclient,
  PlaceInputType,
} from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlacesService {
  constructor(
    private readonly gooleClient: GoogleMapsclient,
    private readonly configService: ConfigService
    ) {}

  async findPlaces(text: string) {
    const { data } = await this.gooleClient.findPlaceFromText({
      params: {
        input: text,
        inputtype: PlaceInputType.textQuery,
        fields: ['place_id', 'formatted_address', 'geometry', 'name'],
        key: this.configService.get('GOOGLE_MAPS_API_KEY'),
      },
    });

    return data;
  }
}
