var data;


document.addEventListener('DOMContentLoaded', function() {
    window.fetch('data.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        data = response;
        showList()
    })
    .catch(function(e) {
        console.error('Chyba')
    })
})


function showList() {
    var source  = document.getElementById("list").innerHTML;
    var template = Handlebars.compile(source);
    document.getElementById('app').innerHTML = template(data);
}

function showDetail(id) {
    var source  = document.getElementById("detail").innerHTML;
    var template = Handlebars.compile(source);
    record = data.filter((item)=> item.id == id)[0]
    document.getElementById('app-detail').innerHTML = template(record);;

}
