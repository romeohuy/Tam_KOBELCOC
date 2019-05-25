
var totalWidth = 0;

$('.es-selector').each(function(index) {
    totalWidth += parseInt($(this).width(), 10);
})

//alert("Total Width is " + totalWidth);