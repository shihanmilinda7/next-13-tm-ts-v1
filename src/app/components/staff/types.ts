export type StaffObj = {
    staffid?:number;
    staffname?:string ;  
    contracttype?:string;   
    contactno?:string;   
    nic?:string;
    userid?: number;
    username?: string;
    role?: string;
    password?: string;
}

export type UserType = {
    userid?: number;
    staffid?:number;
    username?: string; 
}