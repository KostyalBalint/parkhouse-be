import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ReservationsService } from './reservations.service';
import { Reservation } from '../../graphql/graphqlTypes';

@Resolver('Reservation')
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Query('myReservations')
  async myReservations() {
    const userId = '1'; //TODO: Get userID from AuthContext
    this.reservationsService.getReservationsByUserId(userId);
  }

  @ResolveField('user')
  async getUser(@Parent() reservation: Reservation) {
    return await this.reservationsService.getUserByReservationId(
      reservation.id,
    );
  }

  @ResolveField('parkingSpace')
  async getParkingSpace(@Parent() reservation: Reservation) {
    return await this.reservationsService.getParkingSpaceByReservationId(
      reservation.id,
    );
  }

  @ResolveField('car')
  async getCar(@Parent() reservation: Reservation) {
    return await this.reservationsService.getCarByReservationId(reservation.id);
  }
}
