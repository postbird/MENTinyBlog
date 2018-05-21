/**
 * @namespace /helpers/
 * @name nunjucksFileter.s.js
 * @description nunjucks 自定义过滤器
 * @author postbird
 * */
const dayjs = require('dayjs');

const initFilters = (env)=>{
    env.addFilter('date',(str)=>{
        return dayjs(str).format("YYYY-MM-DD HH:mm:ss");
    });
};

module.exports = initFilters;