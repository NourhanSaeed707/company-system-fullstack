export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  authorities?: string[];
  password: string;
};

export type LoginUser = {
  email: string;
  password: string;
  rememberMe: string;
};

export type UserContext = {
  currentUser?: UserType | null;
  isSubmitting: boolean;
  setCurrentUser: (user: UserType) => void;
  login: (values: LoginUser) => void;
  logout: () => void;
};

export type Department = {
  id: number;
  name: string;
  employee: Employees[];
};

export type Employees = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  salary: number;
  department: Department;
};
