export type Activity = {
    name: string;
    title: string;
    address: string;
    avatar: string;
  }
  
export type Location = {
  value: string;
  label: string;
} 

export type Category = {
  value: string;
  label: string;
} 

export type QueryParams = {
  nameValue: string | null;
  locationValue: string | null;
  sortValue: string | null;
}