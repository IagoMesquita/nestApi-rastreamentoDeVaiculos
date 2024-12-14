import { Injectable } from '@nestjs/common';
import {
  DirectionsRequest,
  Client as GoogleMapsClient,
  TravelMode,
} from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DirectionsService {
  constructor(
    private readonly googleMapsClient: GoogleMapsClient,
    private readonly configService: ConfigService,
  ) {}

  async getDirections(originId: string, destinationId: string) {
    const resquestParams: DirectionsRequest['params'] = {
      origin: `palace_id:${originId}`,
      destination: `place_id:${destinationId}`,
      mode: TravelMode.driving,
      key: this.configService.get('GOOGLE_MAPS_API_KEY'),
    };

    const { data } = await this.googleMapsClient.directions({
      params: resquestParams,
    });

    return {
      ...data,
      request: {
        origin: {
          place_id: resquestParams.origin,
          location: {
            lat: data.routes[0].legs[0].start_location.lat,
            lng: data.routes[0].legs[0].start_location.lng,
          },
        },
        destination: {
          place_id: resquestParams.destination,
          location: {
            lat: data.routes[0].legs[0].end_location.lat,
            lng: data.routes[0].legs[0].end_location.lng,
          }
        },

        mode: resquestParams.mode,
      },
    };
  }
}
