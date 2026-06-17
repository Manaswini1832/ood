# Parking Lot System

1. Gather requirements : think about what system should do, what types of users are there, what can each user do etc --> systems thinking so comes up practice. don't sweat it much now
2. Some imp methods can be
   a. parkVehicle(vehicleId, floorId)
   b. unparkVehicle(vehicleId, floorId, spotId)
   c. payFee(ticketId)
   d. getFreeSpots(floorId, vehicleType) -> Spot
3. Core Entities based on 2 :
   a. Vehicle
   b. ParkingFloor
   c. ParkingSpot
   d. Ticket
   e. ParkingLot
   f. User(optional). For simplicity we can choose to treat Vehicle to represent the user and get rid of this entity
4. Imp flows : park, unpark, pay, getFreeSpots
   a. getFreeSpots(floorId, vehicleType) -> Spot - Should be able to efficiently retrieve free spot based on floorId, type => can store hashmap for each floor where vehicletype maps to spot ids - check the hashmap of floor -> get Spot if free(repped by an enum maybe) -> return
   b. parkVehicle(vehicleId, floorId) - call getFreeASpot(floorId, vehicleType) -> Spot. If no spot, return - else mark spot as OCCUPIED by changing state and spot.vehicle = vehicle - Create a ticket with in_timestamp = current time, out_timestamp = undefined for now - store ticket in ParkingFloor's array of outstanding tickets against the spotId(can be hashmap again)
   c. unparkVehicle(vehicleId, floorId, spotId) - mark spot state as FREE - go to ParkingFloor's outstanding tickets arr(using floorId) and call payFee()
   d. payFee(ticketId) - fee = vehicle type fee per hour \* (outtime-intime)
5. Code will write now
6. Possible design patterns/optimizations
   1. Optimizations
      - ParkingFloor has hashmap of type against Spot[]
      - ParkingFloor has hashmap of spotId against Ticket
   2. Design patterns/good code practices
      - SpotState enum : FREE, OCCUPIED -> can evolve into state pattern but keeping it simple for now
      - Vehicle type enum : BICYCLE, SCOOTY, CAR, TRUCK
      - Singleton ParkingLot instance
      - PricingStrategy pattern : HourlyPricingStrategy, WeekendPricingStrategy
      - VehicleFactory to create different vehicles --> skipping for now since focus should be on parking lot and not vehicle creation. but I can do this during interview and ask the interviewer if they want me to code it up
