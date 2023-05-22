import { filterDict, setProjectType, dateFormat } from "@/utils/utils.js";
import {infoTypeList, areaData} from "@/utils/const/attention";

/**
 * 设置表格列表享
 * @param _this
 * @param isTeam 0我的 1我的团队
 * @param type 1招标与采购 2拟在建项目
 */
export const setColumn = function (_this, isTeam, type){
    let arr = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: "信息类型",
            align: "center",
            minWidth: 120,
            render: (h, params)=>{
                let obj = setProjectType(params.row)
                return (<span class="area" >{obj.type}</span>)
            }
        },
        {
            title: "标题",
            align: "center",
            minWidth: 300,
            slot: "title",
        },
        {
            title: "地区",
            align: "center",
            minWidth: 90,
            key: "area_id",
            render: (h,params)=>{
                let area = filterDict(params.row.area_id, areaData, {labelKey: 'title', valueKey: 'value'});
                return (
                    <div>{area?area:'其他'}</div>
                )
            }
        },
        {
            title: "发布时间",
            align: "center",
            minWidth: 120,
            render: (h,params)=>{
                let date = dateFormat(new Date(parseInt(params.row.publish_date)), "yyyy-MM-dd")
                return (
                    <div>{date}</div>
                )
            }
        },
        // {
        //     title: "访问时间",
        //     align: "center",
        //     minWidth: 120,
        //     key: "createTime"
        // },
    ]

    return arr
}