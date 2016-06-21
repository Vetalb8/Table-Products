(function () {

  var productsListModel = TABLE.models.productsList;
  var editTemplateModel = TABLE.models.editTemplate;
  var editTemplateView = TABLE.views.editTemplateView;
  var tableRowView = TABLE.views.tableRowView;
  var validatorModel = TABLE.models.validator;
  var productId;

  TABLE.controllers.editTemplateController = (function () {
    // Show Window
    $('.table-products').on('click', '.edit-product, .product-name', showWindowHandler);
    // get validator
    var validator = validatorModel.getValidator();

    function showWindowHandler() {
      // Find ID product in Table row
      productId = ($(this).closest('tr')).data('id');
      // Find ID product in products list
      productId = productsListModel.findProduct(productId);
      //Get Template
      $.ajax({
        url: "template/_editModalWindow.html",
        dataType: "html",
        success: successAjaxHandler
      })

      function successAjaxHandler(data) {
        $('#modalWindowProduct').html(data);
        // Get model
        var tmplModel = editTemplateModel.getTmpl();
        // Fill model product
        var productsList = productsListModel.getProductsList();
        tmplModel.product = productsList[productId];
        // Render Window
        editTemplateView.renderWindow(tmplModel);
        // Show Select
        if (tmplModel.product.delivery.city.length) {
          // show value in select
          $("#delivery-product [value='2']").attr("selected", "selected"); // add in View
          // show checked value
          var city = tmplModel.product.delivery.city;
          for (var i = 0; i < city.length; i++) {
            $("#" + city[i].toUpperCase()).attr('checked', 'checked');
          }
          // Show block
          editTemplateView.hideBlock($('#block-country'));
          editTemplateView.showBlock($('#block-city'));
        } else if (tmplModel.product.delivery.country.length) {
          // show value in select
          $("#delivery-product [value='1']").attr("selected", "selected"); // add in view
          // show checked value
          var country = (tmplModel.product.delivery.country).toLowerCase();
          $("input[name=" + country + "]").prop('checked', true);
          // Show block
          editTemplateView.showBlock($('#block-country'));
          editTemplateView.hideBlock($('#block-city'));
        } else {
          $("#delivery-product [value='0']").attr("selected", "selected"); // add in view
          // Hide blocks
          editTemplateView.hideBlock($('#block-country'));
          editTemplateView.hideBlock($('#block-city'));
        }

        /**
         * ADD EVENT
         */
        // Change option
        $('#delivery-product').change(changeSelectHandler);
        // Checked checkbox
        $('#SELECTALL').change(checkedHandler);
        // Confirm edit product
        $('#btnEditProduct').click(confirmEditProductHandler);
        // Close modal Window
        $('#btnCloseModalWindow').click(closeModalWindowHandler);
        // Check form fields
        $('#window-product-add input[type=text]').focusout(checkValidatorFocusOutHandler);
        // Check product count
        $('#count-product').on('change keyup input click', pressHandler);
        // Check product price
        $('#price-product').focusout(formatPriceHandler);
        // Check product price
        $('#price-product').focusin(formatNumberHandler);

        /**
         * HANDLERS
         */
        function changeSelectHandler() {
          var selectedCheckbox = $('#delivery-product :selected');
          if (selectedCheckbox.text() === 'Country') {
            editTemplateView.showBlock($('#block-country'));
            editTemplateView.hideBlock($('#block-city'));
          } else if (selectedCheckbox.text() === 'City') {
            editTemplateView.hideBlock($('#block-country'));
            editTemplateView.showBlock($('#block-city'));
          } else {
            editTemplateView.hideBlock($('#block-country'));
            editTemplateView.hideBlock($('#block-city'));
          }
        }

        function checkedHandler() {
          $('#window-product-add input[type=checkbox]').prop('checked', $(this).prop('checked'));
        }

        function confirmEditProductHandler(e) {
          e.preventDefault();
          // Fill data obj
          fillDataObj(tmplModel.product);
          // Validate data
          if (!checkValidator(tmplModel.product)) {
            // Hide Modal Window
            editTemplateView.hideWindow();
            // RenderTable
            tableRowView.renderTable(productsList);
          } else {
            showError(validator.messages);
          }
        }

        function checkValidatorFocusOutHandler() {
          // Fill data obj
          fillDataObj(tmplModel.product);
          // Validate data
          if (!checkValidator(tmplModel.product)) {
            editTemplateView.hideError($(this));
          } else {
            showError(validator.messages);
          }
        }

        function checkValidator(product) {
          // config validator
          validator.config = {
            id: [],
            name: ['isNonEmpty', 'isNonSpace', 'maxLength'],
            emailSupplier: ['isEmailType'],
            price: ['isNonEmpty'],
            delivery: [],
            count: ['isNum']
          };
          validator.validate(product);
          return validator.hasErrors();
        }

        function pressHandler() {
          if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
          }
        }

        function formatNumberHandler() {
          if (this.value) {
            this.value = this.value.slice(1);
            this.value = parseFloat(this.value.replace(/,/g, '')).toFixed(2);
          }
        }

        function formatPriceHandler() {
          if (this.value) {
            this.value = format2(parseFloat(this.value), '$');
          }
        }

        function format2(n, currency) {
          return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        }


        /**
         * Fill data obj
         * @param obj
         */
        function fillDataObj(obj) {
          obj.name = $('#name-product').val();
          obj.emailSupplier = $('#email-supplier').val();
          obj.price = $('#price-product').val();
          obj.count = $('#count-product').val();
        }

        function closeModalWindowHandler() {
          // Hide Modal Window
          editTemplateView.hideWindow();
        }

        function showError(messages) {
          var inputs = {
            name: $('#name-product'),
            emailSupplier: $('#email-supplier'),
            count: $('#count-product'),
            price: $('#price-product')
          };
          // hide errors
          for (var keyInputs in inputs) {
            editTemplateView.hideError($(inputs[keyInputs]));
          }
          for (var i = 0; i < messages.length; i++) {
            var msgText = messages[i];
            // parse name field
            var nameField = msgText.slice(msgText.indexOf('*') + 1, msgText.lastIndexOf('*'));
            // parse text error
            var textError = msgText.slice(msgText.lastIndexOf('*') + 1);
            for (var keyInputs in inputs) {
              if (keyInputs === nameField) {
                nameField = inputs[keyInputs];
                editTemplateView.showError($(nameField), textError);
              }
            }
            // focus in error field
            if (i === 0) {
              $(nameField).focus();
            }
          }
        }
      }
    }


  })();
})();