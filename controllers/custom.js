module.exports = {
    isEmpty:function(obj) {
        if (this.isObject(obj)) {
            var key;
            for(key in obj){
                return false;
            }
            return true;
        }else if (this.isArray(obj)) {
            return obj.length === 0;
        }else if (this.isString(obj)) {
            return obj.length === 0;
        }else if (this.isNumber(obj)) {
            return obj === 0;
        }else if (obj === null || obj === undefined) {
            return true;
        }else if (this.isBoolean(obj)) {
            return !obj;
        }
        return false;
    },
    isObject: obj => {
        if (Buffer.isBuffer(obj)) {
            return false;
        }
        return toString.call(obj) === '[object Object]';
    },
    isArray: Array.isArray,
    isString: obj => {
        return toString.call(obj) === '[object String]';
    },
    isNumber: obj=> {
        return toString.call(obj) === '[object Number]';
    },
    isBoolean: obj=> {
        return toString.call(obj) === '[object Boolean]';
    }
}