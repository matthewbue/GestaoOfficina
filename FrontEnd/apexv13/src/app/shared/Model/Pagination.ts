export class Pagination {
  constructor(
    public page: number, 
    public current: number,
    public total: number
  ) {}
}