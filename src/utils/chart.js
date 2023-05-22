/**
 * @Author: 付柏磊
 * @Date: 2022-09-23 14:43:40
 * @LastEditors: 付柏磊
 * @LastEditTime: 2022-09-23 14:43:40
 * @Description: initechart初始化echart
 */
import * as echarts from 'echarts';

export const initEcharts = (id, options, reszie = false) => {
    let dom = document.getElementById(id)
    if (!dom) {
        return
    }
    let echart = echarts.init(dom);
    echart.setOption(options, true);
    window.addEventListener('resize', () => {
        echart.resize();
    })
    if (reszie === true) {
        echart.resize();
    }
    return echart
}