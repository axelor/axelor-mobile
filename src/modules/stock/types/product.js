class Product {
  static procurementMethod = {
    Buy: 'buy',
    Produce: 'produce',
    BuyAndProduce: 'buyAndProduce',
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
}

export default Product;
