(function () {
  TABLE.models.deleteTemplate = (function () {

    var tmplDelete = {
      title: "Are you sure?",
      text: "Are you sure you want to perform this action?",
      textBtnAnswerYes: "Yes",
      textBtnAnswerNo: "No"
    };

    function _getTmpl() {
      return tmplDelete;
    }

    return {
      getTmpl: _getTmpl
    }

  })();
})();