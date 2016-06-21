(function (){

  var productsListModel = TABLE.models.productsList;
  var deleteTemplateModel = TABLE.models.deleteTemplate;
  var deleteTemplateView = TABLE.views.deleteTemplateView;
  var tableRowView = TABLE.views.tableRowView;
  var productId;

  TABLE.controllers.deleteTemplateController = (function(){
    // Show Window
    $('.table-products').on('click', '.delete-product', showWindowHandler);

    function showWindowHandler() {
      // Find ID product
      productId = ($(this).closest('tr')).data('id');
      //Get Template
      $.ajax({
        url: "template/_deleteModalWindow.html",
        dataType: "html",
        success: successAjaxHandler
      })

      function successAjaxHandler(data) {
        $('#questionModalWindowTemplate').html(data);

        // Get model
        var tmplModel = deleteTemplateModel.getTmpl();
        // Render Window
        deleteTemplateView.renderWindow(tmplModel);
        // Confirm delete product
        $('#answerYes').click(confirmDeleteProductHandler);
        // not Confirm delete product
        $('#answerNo').click(notConfirmDeleteProductHandler);

        function confirmDeleteProductHandler() {
          // Delete Product by ID
          productsListModel.deleteProduct(productId);
          // Hide Modal Window
          deleteTemplateView.hideWindow();
          // Render TableROW
          tableRowView.renderTable(productsListModel.getProductsList());
        }

        function notConfirmDeleteProductHandler() {
          deleteTemplateView.hideWindow();
        }
      }
    }
  })();
})();
