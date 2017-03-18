export class Recipe {
  constructor(
    public name: string,
    public ingredients: string,
    public directions: string,
    public userId: number
  ) {  }
}