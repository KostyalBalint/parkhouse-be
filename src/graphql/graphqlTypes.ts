
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
    freeParkingSpaces(date: DateTime): Nullable<number> | Promise<Nullable<number>>;
    levels(): Level[] | Promise<Level[]>;
    level(id: string): Level | Promise<Level>;
    parkingSpace(id: string): ParkingSpace | Promise<ParkingSpace>;
    myReservations(): Reservation[] | Promise<Reservation[]>;
    myResignation(): Resignation[] | Promise<Resignation[]>;
    reservation(id: string): Reservation | Promise<Reservation>;
    searchByLicencePlate(queryString: string): Car[] | Promise<Car[]>;
    user(id: string): User | Promise<User>;
    myUser(): User | Promise<User>;
    gameCars(): GameCar[] | Promise<GameCar[]>;
    users(): User[] | Promise<User[]>;
}

export interface IMutation {
    makeReservation(date: DateTime, type: ReservationType, carId: string): Reservation | Promise<Reservation>;
    makeResignation(date: DateTime): Resignation | Promise<Resignation>;
    cancelResignation(date: DateTime): Nullable<boolean> | Promise<Nullable<boolean>>;
    cancelReservation(reservationId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    changeReservationStatus(reservationId: string, type: ReservationType): Reservation | Promise<Reservation>;
    notifyUser(userId: string, notificationType: NotificationType, message?: Nullable<string>): Nullable<boolean> | Promise<Nullable<boolean>>;
    addCar(licencePlate: string, name: string): Car | Promise<Car>;
    updateCar(carId: string, licencePlate: string, name: string): Car | Promise<Car>;
    removeCar(carId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    login(userName: string, password: string): LoginResponse | Promise<LoginResponse>;
    buyGameCar(gameCarId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    selectGameCar(gameCarId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export interface User {
    id: string;
    name: string;
    avatar: string;
    phoneNumber: string;
    cars: Car[];
    parkingSpace?: Nullable<ParkingSpace>;
    hasFixedParkingSpace: boolean;
    coin: number;
    ownedGameCars: GameCar[];
    selectedGameCar?: Nullable<GameCar>;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface Car {
    id: string;
    name: string;
    licencePlate: string;
    user: User;
}

export interface ParkingSpace {
    id: string;
    label: string;
    level: Level;
    type: ParkingSpaceType;
    owner?: Nullable<User>;
    currentStatus: ParkingSpaceStatus;
    reservations?: Nullable<Reservation[]>;
}

export interface GameCar {
    id: string;
    name: string;
    price: number;
    image: string;
    ownedByMe: boolean;
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

export interface Resignation {
    id: string;
    user: User;
    parkingSpace: ParkingSpace;
    date: DateTime;
}

export interface Level {
    id: string;
    label: string;
    spaces: ParkingSpace[];
}

export type DateTime = any;
type Nullable<T> = T | null;
