class Product {
  static procurementMethod = {
    Buy: 'buy',
    Produce: 'produce',
    BuyAndProduce: 'buyAndProduce',
  };

  static applicationPriceSelect = {
    SalePrice: 0,
    CostPrice: 1,
    PurchasePrice: 2,
  };

  static getProcurementMethod = option => {
    switch (option) {
      case this.procurementMethod.Buy:
        return 'Buy';
      case this.procurementMethod.Produce:
        return 'Produce';
      case this.procurementMethod.BuyAndProduce:
        return 'Buy and produce';
      default:
        console.warn(
          `Procurement method provided with value ${option} is not supported by product.`,
        );
        return null;
    }
  };

  static getApplicationPriceSelect = option => {
    switch (option) {
      case this.applicationPriceSelect.SalePrice:
        return 'Sale price';
      case this.applicationPriceSelect.CostPrice:
        return 'Cost price';
      case this.applicationPriceSelect.PurchasePrice:
        return 'Purchase price';
      default:
        console.warn(
          `Application price provided with value ${option} is not supported by product.`,
        );
        return null;
    }
  };
}

export default Product;
