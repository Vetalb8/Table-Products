(function () {
  TABLE.views.deleteTemplateView = (function () {
    var tmpl;
    var pageBody = $('body');
    var overlay = $('#overlay');

    /**
     * Fill template
     * @param obj
     * @returns {*}
     */
    function generateHtml(obj) {
      // наполняем шаблон объектом
      return tmpl({deleteTemplate: obj});
    }

    /**
     * Render window
     * @param tmplModel
     */
    function _renderWindow(tmplModel) {
      var questionModalWindowHtml = $('#questionModalWindowTemplate').html();
      tmpl = _.template(questionModalWindowHtml);
      // Fill template obj
      questionModalWindowHtml = generateHtml(tmplModel);
      // Show overlay
      overlay.fadeIn(400);
      // Add element on page
      pageBody.append(questionModalWindowHtml);
      // Add animate
      var winProductDelete = $('#window-product-delete');
      winProductDelete.animate({top: '50%'}, 200);
    }

    /**
     * Hide window
     */
    function _hideWindow() {
      var winProductDelete = $('#window-product-delete');
      winProductDelete.animate({ opacity: 0, top: '30%' }, 200, function () {
        overlay.fadeOut(400);
        $(this).remove();
      })
    }

    return {
      renderWindow: _renderWindow,
      hideWindow: _hideWindow
    }

  })();
})();