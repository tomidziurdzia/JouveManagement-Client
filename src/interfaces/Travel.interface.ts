import { EmployeeInterface, VehicleInterface } from ".";

export interface TravelInterface {
  id_travel?: string;
  date: string;
  semi: VehicleInterface | undefined;
  truck: VehicleInterface | undefined;
  truck_assistant: EmployeeInterface | undefined;
  truck_driver: EmployeeInterface | undefined;
}
