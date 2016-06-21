(function () {

  var productsListModel = TABLE.models.productsList;
  var tableRowView = TABLE.views.tableRowView;

  TABLE.controllers.tableRowController = (function () {
    // get Array Products List
    var productsList = productsListModel.getProductsList();
    // Render Table
    tableRowView.renderTable(productsList);

    // Sort Table
    $('#name-index, #price-index').click(sortHandler);
    // Search in Table
    $('#product-search').click(searchProductHandler);

    function sortHandler() {
      if ($(this).attr('id') === 'name-index') {
        tableRowView.sortTable($('#price-index'), $('#name-index'), 'name', productsList);
      } else {
        tableRowView.sortTable($('#name-index'), $('#price-index'), 'price', productsList);
      }
    }

    function searchProductHandler(e) {
      e.preventDefault();
      var name = $('#products-name').val().toLowerCase();
      if (name) {
        searchproductsList = _.filter(productsList, {name: name});
        tableRowView.renderTable(searchproductsList);
      } else {
        tableRowView.renderTable(productsList);
      }
    }
  })();
})();