'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    let events = new Map();

    return {

        /**
         * Подписаться на событие
         * @param {String} eventName
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (eventName, context, handler) {
            if (!events.hasOwnProperty(eventName)) {
                events[eventName] = [];
            }
            events[eventName].push({ context, handler });

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} eventName
         * @param {Object} context
         * @returns {Object}
         */
        off: function (eventName, context) {
            Object
                .keys(events)
                .forEach(key => {
                    if (key === eventName || key.startsWith(`${eventName}.`)) {
                        events[key] = events[key].filter(event => event.context !== context);
                    }
                });

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} eventName
         * @returns {Object}
         */
        emit: function (eventName) {
            if (events[eventName]) {
                events[eventName].forEach(event => event.handler.apply(event.context));
            }

            if (eventName.includes('.')) {
                this.emit(eventName.substring(0, eventName.lastIndexOf('.')));
            }

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
