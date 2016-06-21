(function () {
  TABLE.models.addTemplate = (function () {

    var tmplAdd = {
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
          id: 'btnAddProduct',
          cssClass: 'btn-success',
          text: 'Add'
        },
        btnClose: {
          id: 'btnCloseModalWindow',
          cssClass: 'btn-danger',
          text: 'X'
        }
      }
    };

    function _getTmpl() {
      return tmplAdd;
    }

    return {
      getTmpl: _getTmpl
    }

  })()
})();