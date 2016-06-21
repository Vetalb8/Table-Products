(function () {
  TABLE.views.tableRowView = (function () {

    var productRowHtml = $('#productRowTemplate').html();
    var tBody = $('#tbody-table');
    var tmpl = _.template(productRowHtml);
    var click = 0;

    /**
     * Fill template
     * @param obj
     * @returns {*}
     */
    function generateProductHtml(obj) {
      // наполняем шаблон объектом
      return tmpl({ product: obj });
    }

    /**
    * Render table
    * @param productsList
    */
    function _renderTable(productsList) {
      var html = [];
      _.each(productsList, function addTmpl(objProduct) {
        var productHtml = generateProductHtml(objProduct);
        html.push(productHtml);
      });
      tBody.html(html.join(''));
    }

    /**
    * SortBy
    * @param array
    * @param property
    * @returns {Array}
    */
    function _sortBy(array, property) {
      return _.sortBy(array, property);
    }

    /**
    * SortByReverse
    * @param array
    * @param property
    * @returns {Array}
    */
    function _sortByReverse(array, property) {
      return _.sortBy(array, property).reverse();
    }

    /**
     * Sort table
     */
    function _sortTable($hideElem, $showElem, fieldSort, productsList) {
      $hideElem.next().css('opacity', '0');
      $showElem.next().css('opacity', '1');
      if (click) {
        $showElem.next().removeClass('glyphicon-sort-by-attributes-alt');
        $showElem.next().addClass('glyphicon-sort-by-attributes');
        click = 0;
        productsList = _sortBy(productsList, fieldSort);
      } else {
        $showElem.next().removeClass('glyphicon-sort-by-attributes');
        $showElem.next().addClass('glyphicon-sort-by-attributes-alt');
        click = 1;
        productsList = _sortByReverse(productsList, fieldSort);
      }
      _renderTable(productsList);
    }

    return {
      renderTable: _renderTable,
      sortTable: _sortTable
    }

  })();
})();