export interface IEmployeeCreate {
  firstName: string;
  lastName: string;
  salary: number;
  departmentId: number;
  managerId?: number | null;
}
