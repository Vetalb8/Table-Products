(function () {
  TABLE.models.productsList = (function () {

    var productsList = [{
      id: 1,
      name: 'product5',
      emailSupplier: '1@mail.com',
      price: '$150.20',
      delivery: {
        country: 'Russia',
        city: []
      },
      count: 5
    }, {
      id: 2,
      name: 'product2',
      emailSupplier: '2@mail.com',
      price: '$100.00',
      delivery: {
        country: 'USA',
        city: []
      },
      count: 3
    }, {
      id: 3,
      name: 'product3',
      emailSupplier: '2@mail.com',
      price: '$300.50',
      delivery: {
        country: 'Japan',
        city: []
      },
      count: 3
    }, {
      id: 4,
      name: 'product1',
      emailSupplier: '3@mail.com',
      price: '$200.90',
      delivery: {
        country: '',
        city: ['Saratov', 'Moscow']
      },
      count: 15
    }];

    function _getProductsList() {
      return productsList;
    }

    function _findProduct(id) {
      var idProduct = _.findIndex(productsList, function getId(product) {
        return product.id === id;
      });
      return idProduct;
    }

    function _deleteProduct(id) {
      var idProduct = _findProduct(id);
      productsList.splice(idProduct, 1);
    }

    return {
      getProductsList: _getProductsList,
      deleteProduct: _deleteProduct,
      findProduct: _findProduct
    }

  })();
})();