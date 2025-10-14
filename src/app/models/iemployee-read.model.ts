export interface IEmployeeRead {
  id: number;
  firstName: string;
  lastName: string;
  salary: number;
  departmentId: number;
  managerId?: number | null;
}
