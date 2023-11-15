import { EmployeeInterface, VehicleInterface } from ".";

export interface TravelInterface {
  id_travel?: string;
  date: string;
  semi: VehicleInterface;
  truck: VehicleInterface;
  truck_assistant: EmployeeInterface;
  truck_driver: EmployeeInterface;
}
