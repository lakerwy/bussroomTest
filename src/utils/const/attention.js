/**
 * @Author: 付柏磊
 * @Date: 2022-09-01 11:08:29
 * @LastEditors: 付柏磊
 * @LastEditTime: 2022-09-01 11:11:17
 * @Description: 一些公共的label，value字典数据
 */
/**
 * 一些公共的label和value
 *
 */
export const infoTypeList = [
    {label: '工程招标', value: 1},
    {label: '货物招标', value: 2},
    {label: '服务招标', value: 3},
    {label: '中标公示', value: 4},
    {label: '招标预告', value: 5},
    {label: '政府采购', value: 6},
    {label: '企业采购', value: 7},
    {label: 'VIP项目', value: 3030},
    {label: '项目核准批复', value: 3020},
    {label: '项目动态', value: 3050},
    {label: '项目跟踪', value: 3070},
    {label: '招标全部', value: 1000},
    {label: '拟在建全部', value: 2000},

    {label: '项目公示', value: 3110},
    {label: '项目预告', value: 3120},
]

//栏目类型
export const columnType = [
    {label: '工程招标', value: "1"},
    {label: '货物招标', value: "2"},
    {label: '服务招标', value: "3"},
    {label: '政府采购', value: "6"},
    {label: '企业采购', value: "7"},
    {label: '招标预告', value: "5"},
    {label: '中标公示', value: "4"},
]

//内容范围
export const contentRange = [
    {label: '标题', value: 1},
    {label: '内容', value: 0},
    {label: '招标编号', value: 3},
]

//信息类型
export const informationType = [
    {label: 'VIP项目', value: "3030"},
    {label: '项目核准批复', value: "3020"},
    {label: '项目公示', value: "3110"},
    {label: '项目预告', value: "3120"},
    {label: '项目动态', value: "3050"},
    // {label: '项目跟踪', value: "3070"},
]

//项目阶段
export const projectPhase = [
    {value: "0", label: '全部阶段'},
    {value: "2", label: '项目建议书阶段'},
    {value: "3", label: '可行性研究报告阶段'},
    {value: "4", label: '项目审批核查'},
    {value: "6", label: '工程设计'},
    {value: "10", label: '施工准备'},
    {value: "11", label: '在建阶段'},
]

//时间
export const timeRange = [
    {label: '近一天', value: 0},
    {label: '近一周', value: 1},
    {label: '近两周', value: 2},
    {label: '近一个月', value: 3},
    {label: '近三个月', value: 4},
    {label: '近一年', value: 6},
    {label: '自定义时间', value: -1},
]

//一级行业
export const category1Data = [
    {
        label: "全部行业",
        value: "-1",
    },
    {
        label: "交通运输",
        value: "1",
    },
    {
        label: "能源化工--电力",
        value: "2",
    },
    {
        label: "能源化工--化工",
        value: "3",
    },
    {
        label: "冶金矿产",
        value: "4",
    },
    {
        label: "机械电子",
        value: "5",
    },
    {
        label: "网络通讯计算机",
        value: "6",
    },
    {
        label: "市政房地产建筑",
        value: "7",
    },
    {
        label: "水利",
        value: "8",
    },
    {
        label: "环保",
        value: "9",
    },
    {
        label: "医疗卫生",
        value: "10",
    },
    {
        label: "科技文教旅游",
        value: "11",
    },
    {
        label: "出版印刷",
        value: "12",
    },
    {
        label: "轻工纺织食品",
        value: "13",
    },
    {
        label: "农林牧渔",
        value: "14",
    },
    {
        label: "商业服务",
        value: "15",
    },
    {
        label: "园林绿化",
        value: "16",
    },
]
//二级行业
export const category2Data = [
    [
        {
            name: "高速公路、道路",
            value: "101",
        },
        {
            name: "桥梁、立交桥",
            value: "102",
        },
        {
            name: "机场",
            value: "103",
        },
        {
            name: "铁路、轨道交通",
            value: "104",
        },
        {
            name: "航道、水利枢纽",
            value: "105",
        },
        {
            name: "港口、码头、泊位、渔港",
            value: "106",
        },
        {
            name: "客运站、交通枢纽",
            value: "107",
        },
        {
            name: "隧道",
            value: "108",
        },
        {
            name: "物流",
            value: "109",
        },
    ],
    [
        {
            name: "火电",
            value: "201",
        },
        {
            name: "核电",
            value: "202",
        },
        {
            name: "水电",
            value: "203",
        },
        {
            name: "风电",
            value: "204",
        },
        {
            name: "电网建设",
            value: "205",
        },
        {
            name: "太阳能、光伏发电",
            value: "206",
        },
        {
            name: "垃圾焚烧发电及其他新能源发电",
            value: "207",
        },
        {
            name: "水泥余热发电",
            value: "208",
        },
    ],
    [
        {
            name: "天然气、输气管道",
            value: "301",
        },
        {
            name: "石油、石化",
            value: "302",
        },
        {
            name: "有机化学",
            value: "303",
        },
        {
            name: "无机化学",
            value: "304",
        },
        {
            name: "煤化工",
            value: "305",
        },
    ],
    [
        {
            name: "选煤厂、煤矿、尾矿",
            value: "401",
        },
        {
            name: "矿山、矿产、矿石",
            value: "402",
        },
        {
            name: "水泥生产线、混凝土",
            value: "403",
        },
        {
            name: "金属冶炼",
            value: "404",
        },
        {
            name: "钢厂、钢结构",
            value: "405",
        },
        {
            name: "玻璃及其他",
            value: "406",
        },
    ],
    [
        {
            name: "机械产品、厂房、生产车间",
            value: "501",
        },
        {
            name: "医疗器械、电子产品、电器产品",
            value: "502",
        },
        {
            name: "造船、造车",
            value: "503",
        },
    ],
    [
        {
            name: "网络通讯计算机",
            value: "601",
        },
    ],
    [
        {
            name: "房地产建筑",
            value: "701",
        },
        {
            name: "供热",
            value: "702",
        },
        {
            name: "排水",
            value: "704",
        },
        {
            name: "土地治理",
            value: "705",
        },
    ],
    [
        {
            name: "水厂、供水",
            value: "801",
        },
        {
            name: "灌溉",
            value: "802",
        },
        {
            name: "围海造地",
            value: "803",
        },
        {
            name: "水库、引水",
            value: "804",
        },
        {
            name: "防护堤、防洪堤",
            value: "805",
        },
    ],
    [
        {
            name: "垃圾",
            value: "901",
        },
        {
            name: "水处理",
            value: "902",
        },
        {
            name: "废弃物处理",
            value: "903",
        },
        {
            name: "脱硫脱硝、除尘除渣",
            value: "904",
        },
        {
            name: "污泥治理",
            value: "905",
        },
    ],
    [
        {
            name: "医院",
            value: "1001",
        },
        {
            name: "制药制剂",
            value: "1002",
        },
    ],
    [
        {
            name: "科技文教旅游",
            value: "1105",
        },
    ],
    [
        {
            name: "出版印刷",
            value: "1205",
        },
    ],
    [
        {
            name: "纺织",
            value: "1301",
        },
        {
            name: "食品生产",
            value: "1302",
        },
        {
            name: "肉类加工、屠宰",
            value: "1303",
        },
        {
            name: "造纸",
            value: "1304",
        },
        {
            name: "粮食储备",
            value: "1305",
        },
        {
            name: "卷烟物流",
            value: "1306",
        },
        {
            name: "其他",
            value: "1307",
        },
    ],
    [
        {
            name: "农林牧渔",
            value: "1405",
        },
    ],
    [
        {
            name: "商业服务",
            value: "1505",
        },
    ],
    [
        {
            name: "园林绿化",
            value: "1605",
        },
    ],
]

//地区
export const regionData= [
    {
        label: "全选",
        id: "-1",
        children: [
            {
                label: "华北",
                id: "-11",
                children: [
                    {
                        label: "北京",
                        id: "1",
                    },
                    {
                        label: "天津",
                        id: "3",
                    },
                    {
                        label: "河北",
                        id: "5",
                    },
                    {
                        label: "山西",
                        id: "6",
                    },
                    {
                        label: "内蒙古",
                        id: "7",
                    },
                ],
            },
            {
                label: "华东",
                id: "-12",
                children: [
                    {
                        label: "上海",
                        id: "2",
                    },
                    {
                        label: "山东",
                        id: "16",
                    },
                    {
                        label: "江苏",
                        id: "11",
                    },
                    {
                        label: "安徽",
                        id: "13",
                    },
                    {
                        label: "江西",
                        id: "15",
                    },
                    {
                        label: "浙江",
                        id: "12",
                    },
                    {
                        label: "福建",
                        id: "14",
                    },
                ],
            },
            {
                label: "华中",
                id: "-13",
                children: [
                    {
                        label: "湖北",
                        id: "18",
                    },
                    {
                        label: "湖南",
                        id: "19",
                    },
                    {
                        label: "河南",
                        id: "17",
                    },
                ],
            },
            {
                label: "华南",
                id: "-14",
                children: [
                    {
                        label: "广东",
                        id: "20",
                    },
                    {
                        label: "广西",
                        id: "21",
                    },
                    {
                        label: "海南",
                        id: "22",
                    },
                ],
            },
            {
                label: "东北",
                id: "-15",
                children: [
                    {
                        label: "辽宁",
                        id: "8",
                    },
                    {
                        label: "吉林",
                        id: "9",
                    },
                    {
                        label: "黑龙江",
                        id: "10",
                    },
                ],
            },
            {
                label: "西北",
                id: "-16",
                children: [
                    {
                        label: "陕西",
                        id: "26",
                    },
                    {
                        label: "甘肃",
                        id: "28",
                    },
                    {
                        label: "宁夏",
                        id: "31",
                    },
                    {
                        label: "新疆",
                        id: "30",
                    },
                    {
                        label: "青海",
                        id: "29",
                    },
                ],
            },
            {
                label: "西南",
                id: "-17",
                children: [
                    {
                        label: "重庆",
                        id: "4",
                    },
                    {
                        label: "四川",
                        id: "27",
                    },
                    {
                        label: "贵州",
                        id: "23",
                    },
                    {
                        label: "云南",
                        id: "24",
                    },
                    {
                        label: "西藏",
                        id: "25",
                    },
                ],
            },
            {
                label: "其他",
                id: "-18",
                children: [
                    {
                        label: "跨省",
                        id: "36",
                    },
                    {
                        label: "香港",
                        id: "32",
                    },
                    {
                        label: "澳门",
                        id: "33",
                    },
                    {
                        label: "台湾",
                        id: "34",
                    },
                ],
            },
        ],
    },
]

export const areaData = [
    {
        title: "北京",
        value: 1,
    },
    {
        title: "天津",
        value: 3,
    },
    {
        title: "河北",
        value: 5,
    },
    {
        title: "山西",
        value: 6,
    },
    {
        title: "内蒙古",
        value: 7,
    },
    {
        title: "上海",
        value: 2,
    },
    {
        title: "山东",
        value: 16,
    },
    {
        title: "江苏",
        value: 11,
    },
    {
        title: "安徽",
        value: 13,
    },
    {
        title: "江西",
        value: 15,
    },
    {
        title: "浙江",
        value: 12,
    },
    {
        title: "福建",
        value: 14,
    },
    {
        title: "湖北",
        value: 18,
    },
    {
        title: "湖南",
        value: 19,
    },
    {
        title: "河南",
        value: 17,
    },
    {
        title: "广东",
        value: 20,
    },
    {
        title: "广西",
        value: 21,
    },
    {
        title: "海南",
        value: 22,
    },
    {
        title: "辽宁",
        value: 8,
    },
    {
        title: "吉林",
        value: 9,
    },
    {
        title: "黑龙江",
        value: 10,
    },
    {
        title: "陕西",
        value: 26,
    },
    {
        title: "甘肃",
        value: 28,
    },
    {
        title: "宁夏",
        value: 31,
    },
    {
        title: "新疆",
        value: 30,
    },
    {
        title: "青海",
        value: 29,
    },
    {
        title: "重庆",
        value: 4,
    },
    {
        title: "四川",
        value: 27,
    },
    {
        title: "贵州",
        value: 23,
    },
    {
        title: "云南",
        value: 24,
    },
    {
        title: "西藏",
        value: 25,
    },
    {
        title: "跨省",
        value: 36,
    },
    {
        title: "香港",
        value: 32,
    },
    {
        title: "澳门",
        value: 33,
    },
    {
        title: "台湾",
        value: 34,
    },
]
