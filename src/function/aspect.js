/**
 * saber-lang
 * 
 * @file aspect
 * @author zfkun(zfkun@msn.com)
 */

define(function () {

    /**
     * Aspect
     *
     * @inner
     * @type {Object}
     */
    var Aspect = {};

    /**
     * before AOP
     *
     * @private
     * @param {string} method 欲AOP的目标方法名
     * @param {Function} fn AOP处理函数
     * @returns {Object} 目标对象
     */
    Aspect.before = function ( method, fn ) {
        return aspectTo( this, 'before', method, fn );
    };

    /**
     * after AOP
     *
     * @private
     * @param {string} method 欲AOP的目标方法名
     * @param {Function} fn AOP处理函数
     * @returns {Object} 目标对象
     */
    Aspect.after = function ( method, fn ) {
        return aspectTo( this, 'after', method, fn );
    };


    /**
     * 对`目标对象`的`指定方法`进行`AOP`包装
     *
     * @inner
     * @param {Object} context 目标对象
     * @param {string} type AOP方式,可取值 `before` | `after`
     * @param {string} method 欲AOP的目标对象的方法名
     * @param {Function} fn AOP处理函数
     * @returns {Object} 目标对象
     */
    function aspectTo ( context, type, method, fn ) {
        var oriMethod = context[ method ];

        if ( oriMethod ) {
            if ( type === 'before' ) {
                context[ method ] = function () {
                    // abort support
                    if ( fn.apply( context, arguments ) !== false ) {
                        oriMethod.apply( context, arguments );
                    }
                };
            }
            else if ( type === 'after' ) {
                context[ method ] = function () {
                    oriMethod.apply( context, arguments );
                    fn.apply( context, arguments );
                };
            }
        }

        return context;
    }


    /**
     * Aspect
     *
     * @exports Aspect
     * @type {Object}
     */
    var exports = {};

    /**
     * 将 `Aspect` 混入到目标对象
     *
     * @public
     * @param {Object} obj 目标对象
     * @returns {Object} 混入 `Aspect` 后的目标对象
     */
    exports.mixin = function ( obj ) {
        // 省略了 hasOwnProperty 校验
        for ( var method in Aspect ) {
            obj[ method ] = Aspect[ method ];
        }
        return obj;
    };

    return exports;

});
