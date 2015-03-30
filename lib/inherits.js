/**
 * @file inherits
 * @author treelite(c.xinle@gmail.com)
 */

/**
 * 为类型构造器建立继承关系
 *
 * @param {Function} subClass 子类构造器
 * @param {Function} superClass 父类构造器
 * @return {Function}
 */
module.exports = function (subClass, superClass) {
    var proto = Object.create(superClass.prototype);
    Object.keys(subClass.prototype).forEach(function (key) {
        proto[key] = subClass.prototype[key];
    });
    subClass.prototype = proto;
    return subClass;
};
