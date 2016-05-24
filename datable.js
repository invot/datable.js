// datable.js by invot
// version 0.1.5

/* global $, jQuery */

// polyfill for endsWith()
if(!String.prototype.endsWith){String.prototype.endsWith=function(searchString,position){var subjectString=this.toString();if(typeof position!=='number'||!isFinite(position)||Math.floor(position)!==position||position>subjectString.length){position=subjectString.length;}
position-=searchString.length;var lastIndex=subjectString.indexOf(searchString,position);return lastIndex!==-1&&lastIndex===position;};}

function toObject(t,n){for(var r={},e=0;e<t.length;e++)r[t[e]]=n[e];return r;}

(function ( $ ) {    
$.fn.datable = function() {
    $(this).each(function(){
        // CORE FUNCTIONALITY
        var t = $(this),
            val  = t.data('datable'),
            sta = t.data('datable-start'),
            era = t.data('datable-era'),
            vrr = val.match(/.{2}/g),
            nrr = [],
            pd = t.data('datable-divider'),
            div = (pd) ? pd : " / ";     
        $.each(vrr, function(i, el){
            if($.inArray(el, nrr) === -1) {
                nrr.push(el); 
            } else {
                nrr.pop();
                nrr.push(el+el); 
            }
        });  
        var phld = nrr.join(div).toUpperCase(); 
        t.attr('maxlength', phld.length);
        t.attr('placeholder', phld).val();
        t.on('keydown', function(e){
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) && $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) === -1) { e.preventDefault(); }
            if(e.keyCode == 8) {
                if ( t.val().endsWith(div) ) {
                    t.val( t.val().replace(new RegExp(div + '$'),'') );
                    e.preventDefault();
                }
            } else {
                var s = this.selectionStart,
                    l = t.val().length;
                if ( l !== phld.length ) {
                    if ( l == nrr[0].length ) {
                        t.val(t.val()+div); 
                    } else if ( l == (nrr[0].length + nrr[1].length + div.length) ) {
                        t.val(t.val()+div); 
                    }
                }
                if ( s !== l ) {
                    t.val( t.val().substring(0,l) );
                }
            }
        });  
        if(era) {
            var st,er;
            if (!sta) {
                var d = new Date();
                st = Math.round( d.getTime()/1000);
                sta = d.getFullYear() + "," + (d.getMonth()+1) +"," + d.getDate();
            } else {
                st = Math.round(new Date( sta.replace(',','/') ).getTime()/1000);
            }
            var sArr = sta.split(','),
                eArr = era.split(','),
                y = (parseInt(sArr[0])+parseInt(eArr[0])) +'/'+
                (parseInt(sArr[1])+parseInt(eArr[1])) +'/'+
                (parseInt(sArr[2])+parseInt(eArr[2]));
            er = Math.round(new Date(y).getTime()/1000);    
        }

        // BOOTSTRAP-FRIENDLY VALIDATION 
        t.on('blur', function(){
            var dat = t.val().split(div),
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
            if(era) { 
                var tv = Math.round(new Date(arr.yyyy+'/'+arr.mm+'/'+arr.dd).getTime()/1000);
                if (!isNaN(tv)){
                    if (tv > st && tv >= er) {
                        err++;
                    } else if (tv < st && tv <= er) {
                        err++;   
                    }
                }
            }
            if( t.val().length !== 0 && err ) {
                t.addClass('error').closest('.control-group').addClass('has-error');
            } else {
                t.removeClass('error').closest('.control-group').removeClass('has-error');
            }
        }); 
    });
};
}( jQuery ));
