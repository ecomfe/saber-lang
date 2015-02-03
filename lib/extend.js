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
module.exports = function (target, source) {
    for (var i = 1, len = arguments.length; i < len; i++) {
        source = arguments[i];

        if (!source) {
            continue;
        }

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }

    }

    return target;
};
