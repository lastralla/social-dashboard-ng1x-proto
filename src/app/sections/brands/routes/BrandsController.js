class BrandsController {

  /* @ngInject */
  constructor(brands) {
    brands.getBrands().then((response) => {
      this.brands = response.data;
    });

    brands.getActiveBrand().then((response) => {
      this.activeBrand = response.data;
    });
  }

}

export { BrandsController };
