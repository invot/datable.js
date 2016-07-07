// datable.js by invot
// version 0.3.2

/* global $, jQuery */

(function ( $ ) {    
$.fn.datable = function() {

    function toObject(t,n){for(var r={},e=0;e<t.length;e++)r[t[e]]=n[e];return r;}

    function isDate(y, m, d) {
        var a = new Date(y, m-1, d);
        if (a.getFullYear() == y && a.getMonth() == m-1 && a.getDate() == d) { 
            return true; 
        } else {
            return false;
        }
    }

    function charPos(sub,str){
        var a=[],i=-1;
        while((i=str.indexOf(sub,i+1)) >= 0) a.push(i);
        return a;
    }

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
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) && $.inArray(e.keyCode, [46, 8, 9, 27, 13, 37, 39]) === -1) { e.preventDefault(); }
            if(e.keyCode == 8) {
                // if backspace delete divider in one keystroke
                if ( t.val().indexOf(div, t.val().length - div.length) !== -1 ) {
                    t.val( t.val().replace(new RegExp(div + '$'),'') );
                    e.preventDefault();
                }
            } else if (e.keyCode > 36 && e.keyCode < 41) {
                // do nothing when using arrow keys
            } else {    
                // default action :)
                var s = this.selectionStart,
                    l = t.val().length,
                    ps = charPos(div,phld),
                    sg = t.val().substring(s,parseInt(s)+div.length);
                   if(sg == div && !$.inArray(s,ps)){
                        this.selectionStart = t.val().length;
                   } else if($.inArray(s,ps) !== -1 && t.val().length < phld.length) {
                       t.val(t.val()+div); 
                   } 
            } 
        });  
        if(era) {
            var st,er;
            sta ? st = new Date(sta) : st = new Date();
            var e = era.split(','),
                day = parseInt(st.getDate()) + parseInt(e[2]),
                month = parseInt(st.getMonth()) + parseInt(e[1]),
                year = parseInt(st.getFullYear()) + parseInt(e[0]);  
            er = new Date(year,month,day);   
        }

        // BOOTSTRAP-FRIENDLY VALIDATION 
        t.on('blur', function(){
            var dat = t.val().split(div),
                arr = toObject(nrr,dat),
                err = 0;
            if (arr.yy) {
                arr.yyyy = 2000 + parseInt(arr.yy);
            }
            if (!arr.dd) {
                arr.dd = 01;
            }

            if (!arr.mm) {
                arr.mm = 01;
            }

            if ( isDate(arr.yyyy,arr.mm,arr.dd) ) {
                var tv = new Date(arr.yyyy, arr.mm, arr.dd);
                if(era) { 
                    if (tv > st && tv >= er) {
                        err++;
                    } else if (tv < st && tv <= er) {
                        err++;   
                    }
                }
            } else {
                err++;
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
