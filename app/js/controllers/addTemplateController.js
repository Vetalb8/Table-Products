(function () {

  var productsListModel = TABLE.models.productsList;
  var addTemplateModel = TABLE.models.addTemplate;
  var addTemplateView = TABLE.views.addTemplateView;
  var tableRowView = TABLE.views.tableRowView;
  var validatorModel = TABLE.models.validator;

  TABLE.controllers.addTemplateController = (function () {
    var productsList = productsListModel.getProductsList();
    var numProduct = productsList.length;
    // get validator
    var validator = validatorModel.getValidator();
    // Show Window
    $('#showModalWindow').click(showWindowHandler);

    function showWindowHandler() {
      //Get Template
      $.ajax({
        url: "template/_editModalWindow.html",
        dataType: "html",
        success: successAjaxHandler
      })

      function successAjaxHandler(data) {
        $('#modalWindowProduct').html(data);
        // Get model
        var tmplModel = addTemplateModel.getTmpl();
        tmplModel.product = {
          name: '',
          emailSupplier: '',
          price: '',
          delivery: {
            country: '',
            city: []
          },
          count: ''
        };
        // Render Window
        addTemplateView.renderWindow(tmplModel);
        // Hide blocks
        addTemplateView.hideBlock($('#block-country'));
        addTemplateView.hideBlock($('#block-city'));


        /**
         * ADD EVENTS
         */
        // Change option
        $('#delivery-product').change(changeSelectHandler);
        // Close modal Window
        $('#btnCloseModalWindow').click(closeModalWindowHandler);
        // Confirm add product
        $('#btnAddProduct').click(confirmAddProductHandler);
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
            addTemplateView.showBlock($('#block-country'));
            addTemplateView.hideBlock($('#block-city'));
          } else if (selectedCheckbox.text() === 'City') {
            addTemplateView.hideBlock($('#block-country'));
            addTemplateView.showBlock($('#block-city'));
          } else {
            addTemplateView.hideBlock($('#block-country'));
            addTemplateView.hideBlock($('#block-city'));
          }
        }

        function closeModalWindowHandler() {
          // Hide Modal Window
          addTemplateView.hideWindow();
        }

        function confirmAddProductHandler(e) {
          e.preventDefault();
          var product = {};
          fillDataObj(product);
          if (!checkValidator(product)) {
            productsList.push(product);
            addTemplateView.hideWindow();
            tableRowView.renderTable(productsList);
          } else {
            showError(validator.messages);
          }
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

        function showError(messages) {
          var inputs = {
            name: $('#name-product'),
            emailSupplier: $('#email-supplier'),
            count: $('#count-product'),
            price: $('#price-product')
          };
          // hide errors
          for (var keyInputs in inputs) {
            addTemplateView.hideError($(inputs[keyInputs]));
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
                addTemplateView.showError($(nameField), textError);
              }
            }
            // focus in error field
            if (i === 0) {
              $(nameField).focus();
            }
          }
        }

        function checkValidator(product) {
          // config validator
          validator.config = {
            id: [],
            delivery: [],
            name: ['isNonEmpty', 'isNonSpace', 'maxLength'],
            emailSupplier: ['isEmailType'],
            count: ['isNum'],
            price: ['isNonEmpty']
          };
          validator.validate(product);
          return validator.hasErrors();
        }

        /**
         * Fill data obj
         * @param obj
         */
        function fillDataObj(obj) {
          obj.id = numProduct + 1;
          obj.name = $('#name-product').val();
          obj.emailSupplier = $('#email-supplier').val();
          obj.price = $('#price-product').val();
          obj.count = $('#count-product').val();
          obj.delivery = {
            country: '',
            city: ''
          }
        }
      }
    }

  })();
})();