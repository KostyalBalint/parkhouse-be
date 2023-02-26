import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ReservationService } from './reservation.service';
import {
  Reservation,
  ReservationStatus,
  ReservationType,
} from '../../graphql/graphqlTypes';
import { ApplicationContext } from '../../graphql/createContext';
import { ApolloError } from 'apollo-server-express';

@Resolver('Reservation')
export class ReservationResolver {
  constructor(private readonly reservationsService: ReservationService) {}

  @Query('freeParkingSpaces')
  async freeParkingSpaces(@Args('date') date: Date) {
    const spaces = await this.reservationsService.getFreeParkingSpaces(date);
    return spaces.length;
  }

  @Query('myReservations')
  async myReservations(@Context() context: ApplicationContext) {
    const userId = context.token?.user.id;
    if (!userId)
      throw new ApolloError('Unauthorized', 'UNAUTHORIZED', { code: 401 });
    return this.reservationsService.getReservationsByUserId(userId);
  }

  @Query('reservation')
  async getReservation(@Args('id') id: string) {
    return await this.reservationsService.getReservationById(id);
  }

  @Mutation('makeReservation')
  async makeReservation(
    @Args('date') date: Date, //: DateTime!,
    @Args('type') type: ReservationType, //: ReservationType!,
    @Args('carId') carId: string, //: ID!,
    @Context() context: ApplicationContext,
  ) {
    const userId = context.token?.user.id;
    if (!userId)
      throw new ApolloError('Unauthorized', 'UNAUTHORIZED', { code: 401 });

    return await this.reservationsService.makeReservation(
      date,
      type,
      carId,
      userId,
    );
  }

  @Mutation('cancelReservation')
  async cancelReservation(@Args('reservationId') reservationId: string) {
    await this.reservationsService.cancelReservation(reservationId);
    return true;
  }

  @Mutation('changeReservationStatus')
  async changeReservationStatus(
    @Args('reservationId') reservationId: string, //: ID!,
    @Args('status') status: ReservationStatus, //: ReservationStatus!,
  ) {
    return await this.reservationsService.changeReservationStatus(
      reservationId,
      status,
    );
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
