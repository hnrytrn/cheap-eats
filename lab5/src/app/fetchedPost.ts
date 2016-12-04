// Model for the food posts that a fetched from the db
export class FetchedPost {
    
    constructor(
        public _id,
        public foodName,
        public price,
        public expiryDate,
        public description,
        public image,
        public retailer,
        public postalCode,
        public address,
        public email
  ) { }
}