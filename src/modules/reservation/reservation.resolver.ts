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

  @Query('myReservations')
  async myReservations(@Context() context: ApplicationContext) {
    const userId = context.token?.user.id;
    if (!userId)
      throw new ApolloError('Unauthorized', 'UNAUTHORIZED', { code: 401 });
    this.reservationsService.getReservationsByUserId(userId);
  }

  @Mutation('makeReservation')
  async makeReservation(
    @Args('parkingSpaceId') parkingSpaceId: string, //: ID!,
    @Args('date') date: Date, //: DateTime!,
    @Args('type') type: ReservationType, //: ReservationType!,
    @Args('carId') carId: string, //: ID!,
  ) {
    return await this.reservationsService.makeReservation(
      parkingSpaceId,
      date,
      type,
      carId,
    );
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
