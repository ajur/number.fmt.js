/* Simple number formatting function
 * by Adam Jurczyk
 * 
 * dec -> decimal digits (after period, if 0, no decimals at all)
 * curr -> currency string (putted after number)
 * pnt -> decimal point char
 * sep -> full tousends separator
 * sepn -> number of digits to separate with 'sep', defaults to '3'
 */
Number.prototype.fmt = function(dec, curr, pnt, sep, sepn){
    if(!isFinite(this)) return this.toString();
    var dec=+(dec||0), curr=curr||'', pnt=pnt||'.', 
        sep=sep||' ', sepn=+(sepn||3),
        sn = ''+Math.round(Math.abs(this) * Math.pow(10,dec)),
        snd = sn.slice(sn.length-dec), i,v=[];
    sn = sn.slice(0,sn.length-dec);
    //if(sn.length===0) sn='0';
    for(i=sn.length%sepn ; i<sn.length ; i+=sepn){
        v.push(sep,sn.slice(i,i+sepn));
    }
    if(sn.length===0) v.unshift('0');
    else if(sn.length%sepn>0) v.unshift(sn.slice(0,sn.length%sepn));
    else v.shift();
    if(this<0) v.unshift('-');
    if(dec>0){
        v.push(pnt,snd);
        for(i=snd.length-dec ; i>0 ; --i){
            v.push('0');
        }
    }
    if(curr.length>0){
        v.push(' ',curr);
    }
    return v.join('');
};
