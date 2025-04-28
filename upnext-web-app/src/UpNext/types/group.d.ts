export interface Group {
  _id: string;
  name: string;
  creator: string;
  members: User[];
}
