/**
 * @file extend
 * @author treelite(c.xinle@gmail.com)
 */

/**
 * 对象属性拷贝
 *
 * @param {Object} target 目标对象
 * @param {...Object} source 源对象
 * @return {Object}
 */
module.exports = function (target) {
    var source;

    function cpy(source) {
        Object.keys(source).forEach(function (key) {
            target[key] = source[key];
        });
    }

    for (var i = 1, len = arguments.length; i < len; i++) {
        source = arguments[i];

        if (source) {
            cpy(source);
        }

    }

    return target;
};
