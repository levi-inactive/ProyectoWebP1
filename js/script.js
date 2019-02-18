/**
 * Used to generate random sale id's using RandEx
 */
var saleIdRegEx = /[0-9]{2}[A-Z]{3}[0-9]{2}([0-9]|[A-Z]){3}[0-9]{1,2}/;
var totalIva = 0;

$(document).ready(function(){
    $('.modal').modal();

    insertForm();

    $('#add-btn').click(function(){
        itemId = $('#item-id-input').val();
        itemName = $('#item-name-input').val();
        itemQuantity = $('#item-quantity-input').val();
        itemPrice = $('#item-price-input').val();;

        iva = itemQuantity*itemPrice*0.16;
        totalIva += iva;
        totalCost = (itemQuantity*itemPrice + iva).toFixed(2);

        if (!insertionDataIsValid(itemId, itemName, itemQuantity, itemPrice)) {
            $('#input-error-modal').modal('open');
            return;
        }

        $('.insertion-table > tbody').prepend(`
        <tr>
            <td>${itemId}</td>
            <td>${itemName}</td>
            <td>${itemQuantity}</td>
            <td>${itemPrice}</td>
            <td>${totalCost}</td>
            <td><button id="delete-btn" class="btn red white-text">-</button></td>
        </tr>
        `);

        $('#item-id-input').val("");
        $('#item-name-input').val("");
        $('#item-quantity-input').val("");
        $('#item-price-input').val("");
    });

    $('#create-ticket-btn').click(function(){
        if (!($('#ticket-card').hasClass('hide'))) {
            emptyTicketData();
        }

        if (!appendSaleItems()){
            $('#ticket-card').addClass('hide');
            $('#ticket-error-modal').modal('open');
            return;
        }

        var date = new Date();
        
        $('#sale-date').append(`
            ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
        `);

        $('#sale-time').append(` 
            ${date.getHours()}:${(date.getMinutes() < 10) ? "0"+date.getMinutes() : date.getMinutes()}
        `);

        appendSaleId();
        appendIva();

        $('#ticket-card').removeClass('hide');
    });
});

$(document).on("click", "#delete-btn", function(){
    /**
     * Deletes a row from the insertion table.
     */
    $(this).parent().parent().remove();
});

function insertForm(){
    /**
     * Appends form at the bottom of the insertion table.
     */
    $('.insertion-table > tfoot').append(`
    <tr>
        <td><input type="text" id="item-id-input"></td>
        <td><input type="text" id="item-name-input"></td>
        <td><input type="number" id="item-quantity-input"></td>
        <td><input type="number" id="item-price-input"></td>
        <td></td>
        <td><button id="add-btn" class="btn white-text light-blue darken-3 waves-light waves-effect">+</button></td>
    </tr>
    `);
}

function insertionDataIsValid(itemId, itemName, itemQuantity, itemPrice){
    if (itemId == '' || itemName == '' || itemQuantity == '' || itemPrice == '')
        return false;

    return true;
}

function emptyTicketData(){
    $('#sale-date').empty();
    $('#sale-time').empty();
    $('#ticket-table > tbody').empty();
    $('#ticket-table > tbody').append(`
    <tr>
        <td>Cajero</td>
        <td>2</td>
        <td><span id="sale-date"></span></td>
        <td><span id="sale-time"></span></td>
    </tr>
    `);
}

function appendSaleItems(){
    var itemList = [];

    $('.insertion-table > tbody').find('tr').each(function (i, el) {
        var tableDataElements = $(this).find('td'),
            itemName = tableDataElements.eq(1).text(),
            itemQuantity = tableDataElements.eq(2).text(),
            itemCost = tableDataElements.eq(4).text();

        itemList.push({
            name: itemName, 
            quantity: itemQuantity, 
            cost: itemCost
        });
    });
    if (itemList.length == 0) {
        return false;
    }

    for (var i in itemList) {
        $('#ticket-table > tbody').append(`
        <tr>
            <td>${itemList[i].quantity}</td>
            <td colspan="2">${itemList[i].name}</td>
            <td>$${itemList[i].cost}</td>
        </tr>
        `)
    }

    return true;
}

function appendSaleId(){
    /**
     * Appends a random string generated 
     * from saleIdRegEx regular expression.
     */
    $('#ticket-table > tbody').append(`
    <tr>
        <td colspan="2">ID=<span id="sale-id">${
            new RandExp(saleIdRegEx).gen()
        }</span></td>
        <td>IVA INCLUIDO:</td>
        <td><span id="total-iva"></span></td>
    </tr>
    `)
}

function appendIva(){
    /**
     * Displays to total IVAs sumemed from each item.
     */
    $('#total-iva').append(`$${totalIva.toFixed(2)}`);
}