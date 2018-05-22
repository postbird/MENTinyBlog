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
    env.addFilter('shotDate',(str)=>{
        return dayjs(str).format("MM.DD");
    });
    env.addFilter('number',(str)=>{
        return Number.parseInt(str);
    })
};

module.exports = initFilters;