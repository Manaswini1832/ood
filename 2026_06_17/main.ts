//Spot state enum
enum SpotState {
  FREE,
  OCCUPIED,
}

enum VehicleType {
  BICYCLE,
  SCOOTY,
  CAR,
  TRUCK,
}

class Vehicle {
  private license: string;
  private vehicleType: VehicleType;

  constructor(license: string, vehicleType: VehicleType) {
    this.license = license;
    this.vehicleType = vehicleType;
  }

  getType(): VehicleType {
    return this.vehicleType;
  }

  getLicense(): string {
    return this.license;
  }
}

class ParkingSpot {
  private spotId: number;
  private acceptedVehicle: VehicleType;
  private status: SpotState;
  private vehicleHere: Vehicle | undefined;

  private static id: number = 1;

  constructor(acceptedVehicle: VehicleType) {
    this.spotId = ParkingSpot.id++;
    this.acceptedVehicle = acceptedVehicle;
    this.status = SpotState.FREE;
    this.vehicleHere = undefined;
  }

  getAcceptedType(): VehicleType {
    return this.acceptedVehicle;
  }

  getSpotId(): number {
    return this.spotId;
  }

  getVehicle(): Vehicle | undefined {
    return this.vehicleHere;
  }

  setStatus(status: SpotState) {
    if (this.status === status) return;
    this.status = status;
  }

  putVehicle(vehicle: Vehicle) {
    this.vehicleHere = vehicle;
  }

  removeVehicle() {
    this.vehicleHere = undefined;
  }
}

interface PricingStrategy {
  calculate(hours: number, vehicleType: VehicleType): number;
}

class HourlyPricingStrategy implements PricingStrategy {
  calculate(hours: number, vehicleType: VehicleType): number {
    return hours * vehicleType.toString().length; //random strategy
  }
}

class WeekendPricingStrategy implements PricingStrategy {
  calculate(hours: number, vehicleType: VehicleType): number {
    return hours * (vehicleType.toString().length + 10);
  }
}

class PricingManager {
  private pricingStrategy: PricingStrategy | undefined;

  private constructor() {}

  private static instance: PricingManager;

  static getInstance(): PricingManager {
    if (!PricingManager.instance) {
      PricingManager.instance = new PricingManager();
    }

    return PricingManager.instance;
  }

  setPricingStrategy(strat: PricingStrategy) {
    this.pricingStrategy = strat;
  }

  getPricingStrategy(): PricingStrategy | undefined {
    return this.pricingStrategy;
  }
}

class Ticket {
  private spotId: number;
  private vehicle: Vehicle;
  private inTime: number;
  private outTime: number;

  constructor(spotId: number, vehicle: Vehicle) {
    this.spotId = spotId;
    this.vehicle = vehicle;
    this.inTime = 1; //hardcoded for now
    this.outTime = 5; //hardcoded for now
  }

  getHours(): number {
    const hoursParked = this.outTime - this.inTime;
    return hoursParked;
  }
}

class ParkingFloor {
  private floorId: number;
  private spots: Map<VehicleType, ParkingSpot[]> = new Map();
  private tickets: Map<ParkingSpot, Ticket> = new Map();

  private static id: number = 1;

  constructor() {
    this.floorId = ParkingFloor.id++;
  }

  addSpot(vehicleType: VehicleType) {
    if (!this.spots.has(vehicleType)) {
      this.spots.set(vehicleType, []);
    }

    this.spots.get(vehicleType)!.push(new ParkingSpot(vehicleType));
  }

  getFreeSpot(vehicleType: VehicleType): ParkingSpot | undefined {
    if (!this.spots.has(vehicleType)) return undefined;
    return this.spots.get(vehicleType)!.find((spot) => {
      spot.getAcceptedType() === vehicleType;
    });
  }

  parkVehicle(vehicle: Vehicle) {
    const freeSpot = this.getFreeSpot(vehicle.getType());
    if (freeSpot === undefined) return;

    freeSpot.setStatus(SpotState.OCCUPIED);
    freeSpot.putVehicle(vehicle);

    const parkingTicket = new Ticket(freeSpot.getSpotId(), vehicle);

    this.tickets.set(freeSpot, parkingTicket);
    console.log(
      `Parked ${vehicle.getLicense()} at spot${freeSpot.getSpotId()} on floor${this.floorId}`,
    );
  }

  unparkVehicle(vehicle: Vehicle, spot: ParkingSpot): Ticket | undefined {
    if (spot.getVehicle() !== vehicle) {
      console.log("Your vehicle isn't at this spot");
      return undefined;
    }

    spot.setStatus(SpotState.FREE);
    spot.removeVehicle();

    const parkingTicket = this.tickets.get(spot);

    if (parkingTicket === undefined) {
      console.log("Invalid ticket. Calling admin");
      return undefined;
    }

    console.log(
      `Unparked ${vehicle.getLicense()} at spot${spot.getSpotId()} on floor${this.floorId}`,
    );

    return parkingTicket;
  }
}

class ParkingLot {
  private floors: ParkingFloor[] = [];
  private static instance: ParkingLot;
  private pricingManager: PricingManager = PricingManager.getInstance();

  private constructor() {}

  static getInstance(): ParkingLot {
    if (!ParkingLot.instance) {
      ParkingLot.instance = new ParkingLot();
    }

    return ParkingLot.instance;
  }

  addFloor() {
    const newFloor = new ParkingFloor();
    this.floors.push(newFloor);
  }

  addSpot(floor: ParkingFloor, vehicleType: VehicleType) {
    floor.addSpot(vehicleType);
  }

  parkVehicle(vehicle: Vehicle, floor: ParkingFloor) {
    floor.parkVehicle(vehicle);
  }

  setPricingStrategy(strat: PricingStrategy) {
    this.pricingManager.setPricingStrategy(strat);
  }

  unparkVehicle(vehicle: Vehicle, floor: ParkingFloor, spot: ParkingSpot) {
    if (
      this.pricingManager === undefined ||
      this.pricingManager.getPricingStrategy() === undefined
    )
      return;
    const parkingTicket = floor.unparkVehicle(vehicle, spot);
    if (parkingTicket === undefined) return;
    const priceToPay = this.pricingManager!.getPricingStrategy()!.calculate(
      parkingTicket!.getHours(),
      vehicle.getType(),
    );
    console.log(`Please pay ${priceToPay}Rs`);
  }
}
