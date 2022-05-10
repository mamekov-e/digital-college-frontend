export interface User {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  iin?: string;
  phoneNumber: string;
  dob?: Date;
  schoolName: string;
  schoolCity: string;
  schoolState: string;
  startDate: Date;
  endDate: Date;
  email: string;
  status: string;

}
