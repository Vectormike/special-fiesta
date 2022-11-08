/* eslint-disable no-undef */
$(document).ready(function () {
  let productDT;
  /**
   * Get all products
   */
  function loadData() {
    $.ajax({
      url: 'http://localhost:3000/spiralyze/product',
      success(result) {
        reloadDT(result.results);
      },
      error(jqXHR, textStatus, errorThrown) {
        swal('Error', 'Something went wrong while fetching data', 'error');
      },
    });
  }

  /**
   * Set datatable
   */
  function reloadDT(data) {
    const i = 1;
    productDT = $('#productTable').DataTable({
      data,
      destroy: true,
      columns: [
        {
          data: 'productID',
        },
        { data: 'productName' },
        { data: 'price' },
        {
          targets: -1,
          orderable: false,
          data: null,
          render(data, type, row, meta) {
            return `<button type='button' class='btn btn-success btn-update mr-2' data-id=${data._id}>Update</button>
                    <button type='button' class='btn btn-danger btn-delete' data-id=${data._id}>Delete</button>`;
          },
        },
      ],
    });
  }

  /*
   * Initial data load
   */
  loadData();

  /**
   * Open add new product modal
   */
  $('#btnAddProduct').click(function () {
    $('#errorMessage').html('');
    $('#errorAlert').hide();
    $('#productName').val('');
    $('#productPrice').val('');
    $('#productModalLabel').html('Add new product');
    $('#productModal').modal('show');
    $('#btnUpdateProduct').hide();
    $('#btnAddNewProduct').show();
  });

  /**
   * Add new product
   */
  $('#form-product').on('submit', function (e) {
    e.preventDefault();
    const productName = $('#productName').val();
    const price = $('#productPrice').val();
    $.ajax({
      url: '/spiralyze/product',
      type: 'POST',
      data: { productName, price },
      success(result) {
        $('#errorMessage').html('');
        $('#errorAlert').hide();
        $('#productName').val('');
        $('#productPrice').val('');
        $('#productModal').modal('hide');
        swal('Success', 'Prodcut added successfully', 'success');
        loadData();
      },
      error(jqXHR, textStatus, errorThrown) {
        const errorMessage = jqXHR ? jqXHR.responseJSON.message : '';
        $('#errorMessage').html(`<strong>Error: </strong>${errorMessage}`);
        $('#errorAlert').show();
      },
    });
  });

  /**
   * Get edit product
   */
  $('#productTable').on('click', '.btn-update', function () {
    const id = $(this).data('id');
    $('#errorMessage').html('');
    $('#errorAlert').hide();
    $('#productModal').modal('show');
    $('#btnAddNewProduct').hide();
    $('#btnUpdateProduct').show();
    $('#btnUpdateProduct').attr('data-id', id);
    $.ajax({
      url: `spiralyze/product/${id}`,
      type: 'GET',
      success(result) {
        $('#productModalLabel').html('Update product');
        $('#productName').val(result.data.name);
        $('#productPrice').val(result.data.price);
      },
      error(jqXHR, textStatus, errorThrown) {
        const errorMessage = jqXHR ? jqXHR.responseJSON.message : '';
        swal('Error', errorMessage || 'Something went wrong while fetching data', 'error');
      },
    });
  });

  /**
   * Update product
   */
  $('#btnUpdateProduct').click(function () {
    const name = $('#productName').val();
    const price = $('#productPrice').val();
    const data = {};
    if (name) data.name = name;
    if (price) data.price = price;
    const id = $('#btnUpdateProduct').data('id');

    $.ajax({
      url: `http://localhost:3000/spiralyze/product/:${id}`,
      type: 'PATCH',
      data: { name, price },
      success(result) {
        $('#errorMessage').html('');
        $('#errorAlert').hide();
        $('#productName').val('');
        $('#productPrice').val('');
        $('#productModal').modal('hide');
        swal('Success', 'Product updated successfully', 'success');
        loadData();
      },
      error(jqXHR, textStatus, errorThrown) {
        const errorMessage = jqXHR ? jqXHR.responseJSON.message : '';
        $('#errorMessage').html(`<strong>Error: </strong>${errorMessage}`);
        $('#errorAlert').show();
      },
    });
  });

  /**
   * Delete product
   */
  $('#productTable').on('click', '.btn-delete', function () {
    swal({
      title: 'Are you sure?',
      text: 'Delete this product will remove all the data related to this product',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const id = $(this).data('id');
        $.ajax({
          url: `/product/${id}`,
          type: 'DELETE',
          success(result) {
            swal({
              title: 'Success',
              text: 'Product deleted successfully',
              icon: 'success',
            });
            loadData();
          },
          error(jqXHR, textStatus, errorThrown) {
            const errorMessage = jqXHR ? jqXHR.responseJSON.message : '';
            swal('Error', errorMessage || 'Something went wrong while deleting product', 'error');
          },
        });
      }
    });
  });
});
