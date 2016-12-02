// Model for the food posts
export class Post {
    
    constructor(
        public foodName,
        public price,
        public expiryDate,
        public description,
        public image,
        public retailer,
        public postalCode,
        public address
  ) { }
}