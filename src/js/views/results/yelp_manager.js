export default class YelpManager {
   constructor({ address, name }) {
      this.address = address;
      this.name = name;
      this.url = 'https://api.yelp.com/v3/businesses';
      this.token =
         'XXd5Lxab-L-zaltX4OdylVclMO6gAII1vqit4k0K8TnGs4pLkZw8StxTbJ2n6MUhRiheA3a_8nuDOxf7BG96QOmuypitKndTlWFwvbFQ1w-6oMGQkvzFjoDjvyMUW3Yx';
      this.corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
   }

   getBusiness() {
      const { address, name } = this;

      return this.makeRequest({
         url: `${this.corsAnywhere}${
            this.url
         }/search?location=${address}&term=${name}`,
         data: {
            method: 'GET',
            headers: {
               Authorization: `Bearer ${this.token}`,
            },
         },
      });
   }

   getDetails(_id) {
      return this.makeRequest({
         url: `${this.corsAnywhere}${
            this.url
         }/${_id}`,
         data: {
            method: 'GET',
            headers: {
               Authorization: `Bearer ${this.token}`,
            },
         },
      });
   }

   getReviews(_id) {
      return this.makeRequest({
         url: `${this.corsAnywhere}${
            this.url
         }/${_id}/reviews`,
         data: {
            method: 'GET',
            headers: {
               Authorization: `Bearer ${this.token}`,
            },
         },
      });
   }

   makeRequest(options) {
      const { url, data } = options;

      return new Promise(function(resolve, reject) {
         fetch(url, data)
            .then(response => {
               response.json().then(data => {
                  if (response.status >= 300) {
                     reject(data.message);
                  }
                  resolve(data);
               });
            })
            .catch(e => {
               reject(Error(e));
            });
      });
   }
}
