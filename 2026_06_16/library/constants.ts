export enum BookStatus {
  LOANED,
  RESERVED,
  AVAILABLE,
  LOST,
}

enum ReservationStatus {
  WAITING,
  PENDING,
  CANCELLED,
  NONE,
}

enum AccountStatus {
  ACTIVE,
  CLOSED,
  CANCELLED,
  BLACKLISTED,
  NONE,
}

export class AppConstants {
  MAX_BOOKS_ISSUED_TO_USER: number = 5;
  MAX_LENDING_DAYS: number = 10;
}
