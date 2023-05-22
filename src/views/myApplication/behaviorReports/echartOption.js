const data = [
    {value: 335, name: '中标信息'},
    {value: 310, name: '招标信息'},
    {value: 234, name: '项目信息'},
    {value: 135, name: '其他'},
]

const JosnList = [
    {
        name: "Jayfee",
        value: 666
    }, {
        name: "Nancy",
        value: 520
    }, {
        name: "生活资源",
        value: "999"
    }, {
        name: "供热管理",
        value: "888"
    }, {
        name: "供气质量",
        value: "777"
    }, {
        name: "生活用水管理",
        value: "688"
    }, {
        name: "一次供水问题",
        value: "588"
    }, {
        name: "交通运输",
        value: "516"
    }, {
        name: "城市交通",
        value: "515"
    }, {
        name: "环境保护",
        value: "483"
    }, {
        name: "房地产管理",
        value: "462"
    }, {
        name: "城乡建设",
        value: "449"
    }, {
        name: "社会保障与福利",
        value: "429"
    }, {
        name: "社会保障",
        value: "407"
    }, {
        name: "文体与教育管理",
        value: "406"
    }, {
        name: "公共安全",
        value: "406"
    }, {
        name: "公交运输管理",
        value: "386"
    }, {
        name: "出租车运营管理",
        value: "385"
    }, {
        name: "供热管理",
        value: "375"
    }, {
        name: "市容环卫",
        value: "355"
    }, {
        name: "自然资源管理",
        value: "355"
    }, {
        name: "粉尘污染",
        value: "335"
    }, {
        name: "噪声污染",
        value: "324"
    }
]

export default {
    workOption: {
        legend: {
            top: "center",
            orient: 'vertical',
            right: 60,
            align: "left",
            data: data,
            textStyle: {
                align: "left",
                color: "#",
                verticalAlign: "middle",
                rich: {
                    name: {
                        width: 80,
                        fontSize: 16,
                    },
                    value: {
                        width: 20,
                        align: "right",
                        fontFamily: "Medium",
                        fontSize: 16,
                    },
                },
            },
            formatter: (name) => {
                if (data.length) {
                    const item = data.filter((item) => item.name === name)[0];
                    return `{name|${name}}{value| ${item.value}}`;
                }
            },
        },
        series: [
            {
                type: 'pie',
                radius: ['70%', '95%'],
                center: ['30%', '50%'],
                hoverAnimation: false,
                label: {
                    show: false,
                },
                labelLine: {
                    show: false
                },
                data: data
            }
        ]
    },
    keyWordOption: {
        legend: {
            right: 219,
        },
        series: [{
            type: 'wordCloud',
            gridSize: 1,
            sizeRange: [12, 30],
            rotationRange: [-90, 90],
            // rotationStep: 45,
            shape: 'circle',
            width: '100%',
            height: '95%',
            drawOutOfBound: false,
            textStyle: {
                color: function () {
                    return (
                        'rgb(' + [
                            Math.round(Math.random() * 500),
                            Math.round(Math.random() * 300),
                            Math.round(Math.random() * 200)
                        ].join(',') +
                        ')'
                    )
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#ffffff'
                }
            },
            data: JosnList
        }]
    },
    targetOption: {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['已看信息', '未看信息'],
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'value',
                axisLine:{
                    show: true,
                    lineStyle:{
                        color:'black',

                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                }
            },
        ],
        yAxis: [
            {
                type: 'category',
                axisTick: {
                    show: false
                },
                data: ['青岛港轮驳分公司', '青岛雅合科技发展有限公司',  '青岛欧森海事技术服务有限公司',]
            }
        ],
        series: [
            {
                name: '已看信息',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: false,
                    // position: 'left'
                },
                itemStyle: {
                    color: "#C23532",
                },
                emphasis: {
                    focus: 'series'
                },
                data: [-120, -132, -101]
            },
            {
                name: '未看信息',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: false
                },
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    color: "#344B57",
                },
                data: [320, 302, 341]
            },
        ]
    }
}