const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
                '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.path+'">'+
                '</div><div class="card-content">'+
                '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p></p></div>'+
                '<div class="card-reveal">'+
                '<span class="card-title grey-text text-darken-4">'+item.subTitle+'<i class="material-icons right">close</i></span>'+
                '<p class="card-text grey-text text-darken-4">'+item.description+'</p>'+
                '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

const addtoTable = (rows) => {
    let html = '';
  
    // Display it in a Table
    html += '<!doctype html><html lang="en">';
    html += '<head>';
    html += '<title>Bootstrap Express/SQLite3 Demo</title>';
    html += '<meta charset="utf-8">';
    html += '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">';
    html += '<link rel="stylesheet"';
    html += '  href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"';
    html += '  integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"';
    html += '  crossorigin="anonymous">';
    html += '</head>';
  
    html += '<body><div class="container">';
    html += '<table class="table">';
    html += '<thead class="thead-dark"><tr>';
    html += '<th>Title</th><th>Calculation</th><th>Answer</th><th>Date</th>';
    html += '<tr></thead><tbody>';
  

        if (rows.length === 0) { 
            console.log("Array is empty!") 
            html += '<tr><td colspan="3"> No data found </td></tr>';
        } else {
            rows.forEach(function (row){
                html += '<tr>';
                html += '<td>'+row.title+'</td>';
                html += '<td>'+row.path+'</td>';
                html += '<td>'+row.subTitle+'</td>';
                html += '<td>'+row.description+'</td>';
            });
        }
  
        html += '</tbody></table>';
        html += '</div>';
        html += '</body></html>';
        $("#table-section").append(html)
    };
  



const formSubmitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.path = $('#path').val();
    formData.subTitle = $('#subTitle').val();
    formData.description = $('#description').val();

    console.log(formData);
    postCat(formData);
}

function postCat(cat) {
    $.ajax({
        url:'/api/cat',
        type:'POST',
        data:cat,
        success: (result) => {
            if (result.statusCode === 201) {
                alert('cat posted');
                location.reload();
            }
        }
    });
}

function getAllCats() {
    $.get('/api/cat',(result)=>{
        if (result.statusCode === 200) {
            addCards(result.data);
            addtoTable(result.data);
            console.log('we got the cats');
        }
    });
}


$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        formSubmitted();
    });
    $('.modal').modal();
    getAllCats();
    console.log('ready');
});