doctor.cookie = (function() {
    var getCookie = function(cname) {
        var name = cname + "=";
        var ckie = document.cookie;
        if(ckie.length > 0) {
            var c_start = ckie.indexOf(name);
            if(c_start != -1) {
                c_start = c_start + name.length;
                c_end = ckie.indexOf(";", c_start);
                if(c_end == -1) 
                    c_end = ckie.length;
                return unescape(ckie.substring(c_start, c_end));
            }
        }
        return "";
    };
    
    return {
        getCookie: getCookie
    };
})();