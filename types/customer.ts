export enum CustomerType {
    Student = "STUDENT",
    Normal = "NORMAL",
    Guest = "GUEST",
    Partner = "PARTNER",
}
export interface ICustomer {
    id: number,
    phone: string,
    name: string,
    address: string,
    email: string,
    gender: string,
    avatar: string,
    code: string,
}

