var util = require('util');

/**
 * Tbl model `new Tbl()`
 *
 * @param {Array}
 *
 */
var Tbl = function(tmpL, idx, dbgName) {
  var self = this;
  var fList = tmpL.splice(0, 1)[0];
  var fields = {};
  fList.forEach(function(k, v) {
    k = k.trim();
    fields[k] = v;
  });

  self.data = !idx ? [] : {};
  self.size = 0;
  tmpL.forEach(function(item) {
    var obj = {};
    for (var k in fields) {
      obj[k] = item[fields[k]];
    }

    if(obj[idx] || !idx) {
      var index = obj[idx] || self.size;
      if (!self.data[index]){
        self.data[index] = obj;
        self.size++;
      }
      else{
        console.error('Table:%s: Duplicated index `%s` exists in tbl=%s', dbgName, index, util.inspect(fList, {showHidden: true, depth: 1}));
      }
    } else {
      console.error('Table:%s: No `%s` exists in tbl=%s', dbgName, idx, util.inspect(fList, {showHidden: true, depth: 1}));
    }
  });
};


Tbl.prototype.findBy = function(attr, value) {
  var result = [];
  var i, item;
  for (i in this.data) {
    item = this.data[i];
    if (item[attr] == value) {
      result.push(item);
    }
  }
  return result;
};

Tbl.prototype.findOneBy = function(attr, value) {
  var result;
  var i, item;
  for (i in this.data) {
    item = this.data[i];
    if (item[attr] == value) {
      result = item;
      break;
    }
  }
  return result;
};

Tbl.prototype.findBigger = function(attr, value) {
  var result = [];
  value = Number(value);
  var i, item;
  for (i in this.data) {
    item = this.data[i];
    if (Number(item[attr]) >= value) {
      result.push(item);
    }
  }
  return result;
};

Tbl.prototype.findSmaller = function(attr, value) {
  var result = [];
  value = Number(value);
  var i, item;
  for (i in this.data) {
    item = this.data[i];
    if (Number(item[attr]) <= value) {
      result.push(item);
    }
  }
  return result;
};

/**
 * find item by id
 *
 * @param id
 * @return {Obj}
 * @api public
 */
Tbl.prototype.findById = function(id) {
  return this.data[id];
};

/**
 * find all item
 *
 * @return {array}
 * @api public
 */
Tbl.prototype.all = function() {
  return this.data;
};

///////////////////////////////////////////////////////
/**
 * Expose 'Tbl' constructor.
 */
module.exports = Tbl;

