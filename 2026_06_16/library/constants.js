"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConstants = exports.BookStatus = void 0;
var BookStatus;
(function (BookStatus) {
    BookStatus[BookStatus["LOANED"] = 0] = "LOANED";
    BookStatus[BookStatus["RESERVED"] = 1] = "RESERVED";
    BookStatus[BookStatus["AVAILABLE"] = 2] = "AVAILABLE";
    BookStatus[BookStatus["LOST"] = 3] = "LOST";
})(BookStatus || (exports.BookStatus = BookStatus = {}));
var ReservationStatus;
(function (ReservationStatus) {
    ReservationStatus[ReservationStatus["WAITING"] = 0] = "WAITING";
    ReservationStatus[ReservationStatus["PENDING"] = 1] = "PENDING";
    ReservationStatus[ReservationStatus["CANCELLED"] = 2] = "CANCELLED";
    ReservationStatus[ReservationStatus["NONE"] = 3] = "NONE";
})(ReservationStatus || (ReservationStatus = {}));
var AccountStatus;
(function (AccountStatus) {
    AccountStatus[AccountStatus["ACTIVE"] = 0] = "ACTIVE";
    AccountStatus[AccountStatus["CLOSED"] = 1] = "CLOSED";
    AccountStatus[AccountStatus["CANCELLED"] = 2] = "CANCELLED";
    AccountStatus[AccountStatus["BLACKLISTED"] = 3] = "BLACKLISTED";
    AccountStatus[AccountStatus["NONE"] = 4] = "NONE";
})(AccountStatus || (AccountStatus = {}));
var AppConstants = /** @class */ (function () {
    function AppConstants() {
        this.MAX_BOOKS_ISSUED_TO_USER = 5;
        this.MAX_LENDING_DAYS = 10;
    }
    return AppConstants;
}());
exports.AppConstants = AppConstants;
