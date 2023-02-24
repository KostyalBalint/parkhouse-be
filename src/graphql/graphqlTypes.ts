
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum NotificationType {
    LIGHTS_ON = "LIGHTS_ON",
    OTHER = "OTHER"
}

export enum ParkingSpaceStatus {
    FREE = "FREE",
    RESERVED = "RESERVED",
    RESERVED_FOR_OWNER = "RESERVED_FOR_OWNER",
    OCCUPIED = "OCCUPIED"
}

export enum ReservationStatus {
    CREATED = "CREATED",
    CHECKED_IN = "CHECKED_IN",
    CHECKED_OUT = "CHECKED_OUT"
}

export enum ReservationType {
    ALL_DAY = "ALL_DAY",
    MORNING = "MORNING",
    AFTERNOON = "AFTERNOON"
}

export enum ParkingSpaceType {
    NORMAL = "NORMAL",
    ELECTRIC = "ELECTRIC",
    DISABLED = "DISABLED"
}

export interface IQuery {
    map(): Level[] | Promise<Level[]>;
    parkingSpace(id: string): ParkingSpace | Promise<ParkingSpace>;
    myReservations(): Reservation[] | Promise<Reservation[]>;
    searchByLicencePlate(queryString: string): Car[] | Promise<Car[]>;
}

export interface IMutation {
    makeReservation(parkingSpaceId: string, date: DateTime, type: ReservationType, carId: string): Reservation | Promise<Reservation>;
    notifyUser(userId: string, notificationType: NotificationType, message?: Nullable<string>): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export interface Car {
    id: string;
    licencePlate: string;
    user: User;
}

export interface ParkingSpace {
    id: string;
    label: string;
    level: Level;
    type: ParkingSpaceType;
    longitude: number;
    latitude: number;
    rotation: number;
    owner?: Nullable<User>;
    currentStatus: ParkingSpaceStatus;
}

export interface Reservation {
    id: string;
    user: User;
    parkingSpace: ParkingSpace;
    date: DateTime;
    car: Car;
    type: ReservationType;
    status: ReservationStatus;
}

export interface User {
    id: string;
    name: string;
    avatar: string;
    phoneNumber: string;
    cars: Car[];
    parkingSpace?: Nullable<ParkingSpace>;
}

export interface Level {
    id: string;
    label: string;
    spaces: ParkingSpace[];
}

export type DateTime = any;
type Nullable<T> = T | null;
