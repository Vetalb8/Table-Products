(function () {

  TABLE.views.addTemplateView = (function () {

    var tmpl;
    var pageBody = $('body');
    var overlay = $('#overlay');

    /**
    * Fill template
    * @param obj
    * @returns {*}
    */
    function generateHtml(obj) {
      return tmpl({ editTemplate: obj });
    }
    /**
    * Render window
    * @param tmplModel
    */
    function _renderWindow(tmplModel) {
      var addModalWindowHtml = $('#modalWindowProduct').html();
      console.log(addModalWindowHtml);
      tmpl = _.template(addModalWindowHtml);
      // Fill template obj
      addModalWindowHtml = generateHtml(tmplModel);
      // Show overlay
      overlay.fadeIn(400);
      // Add element on page
      pageBody.append(addModalWindowHtml);
      // Add animate
      var winProduct = $('#window-product-add');
      winProduct.animate({ top: '30%' }, 200);
    }
    /**
     * Hide Window
     */
    function _hideWindow() {
      var winProduct = $('#window-product-add');
      winProduct.animate({ opacity: 0, top: '50%' }, 200, function () {
        overlay.fadeOut(400);
        $(this).remove();
      })
    }

    /**
     * Hide block
     */
    function _hideBlock($elem) {
      $elem.css('display', 'none');
    }

    /**
     * Show block
     */
    function _showBlock($elem) {
      $elem.css('display', 'block');
    }

    /**
     * HideError
     * @param $field
     */
    function _hideError($field) {
      $field.css('border-color', '#ccc');
      $field.next().css('display', 'none');
    }

    /**
     * ShowError
     * @param $field
     * @param text
     */
    function _showError($field, text) {
      $field.css('border-color', '#eb7e87');
      $field.next().html(text);
      $field.next().css('color', 'red');
      $field.next().css('display', 'inline-block');
    }

    return {
      renderWindow: _renderWindow,
      hideWindow: _hideWindow,
      hideBlock: _hideBlock,
      showBlock: _showBlock,
      hideError: _hideError,
      showError: _showError
    }

  })();
})();