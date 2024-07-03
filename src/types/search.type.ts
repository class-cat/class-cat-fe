export type Lesson = {
    name: string;
    title: string;
    address: string;
    avatar: string;
  }
  
export type Location = {
    value: string;
    label: string;
  } 

export type QueryParams = {
  nameValue: string;
  locationValue: string;
  sortValue: string;
}