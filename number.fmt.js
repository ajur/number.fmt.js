/* Simple number formatting function
 * by Adam Jurczyk
 * 
 * dec -> decimal digits (after period, if 0, no decimals at all)
 * curr -> currency string (putted after number)
 * pnt -> decimal point char
 * sep -> full thousands separator
 * sepn -> number of digits to separate with 'sep', defaults to '3'
 */
Number.prototype.fmt = function(dec, curr, pnt, sep, sepn){
    //simple toString for all non finite numbers
    if(!isFinite(this)) return this.toString();
    
    var dec=+(dec||0), //decimal digits
        curr=curr||'', //currency
        pnt=pnt||'.', //decimal point char
        sep=sep||' ', //thousands separator
        sepn=+(sepn||3), //sep every sepn digits
        sn = ''+Math.round(Math.abs(this) * Math.pow(10,dec)), //stringify rounded number
        snd,i,v=[]; //output array
    
    //add leading zeros for factorials
    for(i = sn.length-dec; i<=0; ++i){
        sn = '0'+sn;
    }
    
    //split
    snd = sn.slice(sn.length-dec); //fractional part
    sn = sn.slice(0,sn.length-dec); //integral part
    
    //separate integral part with thousands sep
    for(i=sn.length%sepn ; i<sn.length ; i+=sepn){
        v.push(sep,sn.slice(i,i+sepn));
    }
    if(sn.length%sepn>0) v.unshift(sn.slice(0,sn.length%sepn));
    else v.shift();

    //add sign 
    if(this<0) v.unshift('-');

    //add factorial part, if needed
    if(dec>0){
        v.push(pnt,snd);
    }

    //add currency if needed
    if(curr.length>0){
        v.push(' ',curr);
    }

    //stringify and return
    return v.join('');
};
