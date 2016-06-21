(function () {
  TABLE.models.editTemplate = (function () {

    var tmplEdit = {
      labelText: {
        name: 'Name:',
        supEmail: 'Supplier email:',
        count: 'Count:',
        price: 'Price:',
        delivery: 'Delivery:'
      },
      selectOptions: {
        0: '',
        1: 'Country',
        2: 'City'
      },
      radioOptions: {
        0: 'Russia',
        1: 'USA',
        2: 'Japan'
      },
      checkBoxOptions: {
        0: 'SelectAll',
        1: 'Saratov',
        2: 'Moscow',
        3: 'St.Peterburg'
      },
      btn: {
        btnEdit: {
          id: 'btnEditProduct',
          cssClass: 'btn-warning',
          text: 'Edit'
        },
        btnClose: {
          id: 'btnCloseModalWindow',
          cssClass: 'btn-danger',
          text: 'X'
        }
      }
    };

    function _getTmpl() {
      return tmplEdit;
    }

    return {
      getTmpl: _getTmpl
    }

  })()
})();