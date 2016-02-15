// datable.js by invot
// version 0.1.2

/* global $, jQuery */

// polyfill for endsWith()
if(!String.prototype.endsWith){String.prototype.endsWith=function(searchString,position){var subjectString=this.toString();if(typeof position!=='number'||!isFinite(position)||Math.floor(position)!==position||position>subjectString.length){position=subjectString.length;}
position-=searchString.length;var lastIndex=subjectString.indexOf(searchString,position);return lastIndex!==-1&&lastIndex===position;};}

function toObject(t,n){for(var r={},e=0;e<t.length;e++)r[t[e]]=n[e];return r;}

(function ( $ ) {    
$.fn.datable = function() {
    
    // CORE FUNCTIONALITY
    var val  = $(this).attr('data-datable'),
        vrr = val.match(/.{2}/g),
        nrr = [];
    var pd = $(this).attr('data-datable-divider');
    var div = (pd) ? pd : " / ";        
    $.each(vrr, function(i, el){
        if($.inArray(el, nrr) === -1) {
            nrr.push(el); 
        } else {
            nrr.pop();
            nrr.push(el+el); 
        }
    });  
    var phld = nrr.join(div).toUpperCase(); 
    $(this).attr('maxlength', phld.length);
    $(this).attr('placeholder', phld).val();
    $(this).on('keydown', function(e){
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) && $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) === -1) { e.preventDefault(); }
        if(e.keyCode == 8) {
            if ( $(this).val().endsWith(div) ) {
                $(this).val( $(this).val().replace(new RegExp(div + '$'),'') );
                e.preventDefault();
            }
        } else {
            if ( $(this).val().length !== phld.length ) {
                if ( $(this).val().length == nrr[0].length ) {
                    $(this).val($(this).val()+div); 
                } else if ( $(this).val().length == (nrr[0].length + nrr[1].length + div.length) ) {
                    $(this).val($(this).val()+div); 
                }
            }
        }
    });  
    
    // BOOTSTRAP-FRIENDLY VALIDATION 
    $(this).on('blur', function(){
        var dat = $(this).val().split(div),
            arr = toObject(nrr,dat),
            err = 0;
        if(arr.mm > 12 || arr.mm < 1 ) {
            err++;
        }
        if(arr.dd > 31 || arr.dd < 1) {
            err++;
        }
        if(arr.yyyy > 3000 || arr.yyyy < 1000) {
            err++;
        }
        if( $(this).val().length !== 0 && err ) {
            $(this).addClass('error').closest('.control-group').addClass('has-error');
        } else {
            $(this).removeClass('error').closest('.control-group').removeClass('has-error');
        }
    }); 
};
}( jQuery ));

