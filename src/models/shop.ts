export class Shop {
  id: string;
  ownerId: string;

  name: string;
  description: string;
  logoUrl: string;

  constructor (id: string, ownerId: string, name: string, description: string, logoUrl: string) {
    this.id = id
    this.ownerId = ownerId
    this.name = name
    this.description = description
    this.logoUrl = logoUrl
  }
}
