$(document).ready(function()
{
    insertForm();

    $('#add-btn').click(function()
    {
        codigo = $('#codigo').val();
        nombre = $('#nombre').val();
        cantidad = $('#cantidad').val();
        precio = $('#precio').val();
        total = cantidad*(precio*1.16);
        totalTru = total.toFixed(2);

        $('table tbody').prepend(`
            <tr>
                <td>${codigo}</td>
                <td>${nombre}</td>
                <td>${cantidad}</td>
                <td>${precio}</td>
                <td>${totalTru}</td>
                <td><input id="delete-btn" class="btn" type="button" value="-" /></td>
            </tr>
        `);

        $('#codigo').val("");
        $('#nombre').val("");
        $('#cantidad').val("");
        $('#precio').val("");
    });

    $('#create-ticket-btn').click(function(){
        
    });
});

$(document).on("click", "#delete-btn", function(){
    $(this).parent().parent().remove();
});

function insertForm()
{
    $('table tbody').append(`
    <tr id="formulario">
        <td><input type="text" id="codigo"></td>
        <td><input type="text" id="nombre"></td>
        <td><input type="number" id="cantidad"></td>
        <td><input type="number" id="precio"></td>
        <td></td>
        <td><input id="add-btn" class="btn" type="button" value="+" /></td>
    </tr>
    `);
}
