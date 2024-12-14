import { Injectable } from '@nestjs/common';
import {
  Client as GoogleMapsclient,
  PlaceInputType,
} from '@googlemaps/google-maps-services-js';

@Injectable()
export class PlacesService {
  constructor(private readonly gooleClient: GoogleMapsclient) {}

  async findPlaces(text: string) {
    const { data } = await this.gooleClient.findPlaceFromText({
      params: {
        input: text,
        inputtype: PlaceInputType.textQuery,
        fields: ['place_id', 'formatted_address', 'geometry', 'name'],
        key: '',
      },
    });
  }
}
