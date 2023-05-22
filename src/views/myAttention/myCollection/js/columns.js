import { filterDict } from "@/utils/utils.js";
import {infoTypeList, projectPhase} from "@/utils/const/attention";

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
            title: "标题",
            align: "center",
            minWidth: 400,
            slot: "title",
        },
        {
            title: "重要程度",
            align: "center",
            minWidth: 80,
            key: "signFlag",
            render: (h, params) => {
                let value = params.row.signFlag == 1?"重要": "一般";
                return(
                    <div>
                        {value}
                    </div>
                )
            }
        },
        {
            title: "信息类型",
            align: "center",
            minWidth: 80,
            sortable: true,
            key: "infoType",
            render: (h, params) => {
                let value = filterDict(params.row.infoType, infoTypeList, {labelKey: 'label', valueKey: 'value'})
                return (
                    <div>{value}</div>
                )
            }
        },
        {
            title: "项目类型",
            align: "center",
            minWidth: 120,
            sortable: true,
            key: "infoType",
            render: (h, params) => {
                let value = filterDict(params.row.infoType, infoTypeList, {labelKey: 'label', valueKey: 'value'})
                return (
                    <div>{value}</div>
                )
            }
        },
        {
            title: "项目进展阶段",
            key: "classbId",
            align: "center",
            minWidth: 120,
            render: (h,params)=>{
                let classb_id = filterDict(params.row.classbId, projectPhase, {labelKey: 'label', valueKey: 'value'});
                return (
                    <div>{classb_id?classb_id:''}</div>
                )
            }
        },
        {
            title: "地区",
            align: "center",
            minWidth: 80,
            sortable: true,
            key: "areaName"
        },
        {
            title: "发布时间",
            align: "center",
            minWidth: 120,
            sortable: true,
            key: "publishDate"
        },
        {
            title: "收藏时间",
            align: "center",
            minWidth: 120,
            sortable: true,
            key: "createTime"
        },
        {
            title: "收藏人",
            align: "center",
            minWidth: 100,
            key: "name",
            filters: [
                { label: '小王', value: 1 },
                { label: '小马', value: 2 },
                { label: '小刘', value: 3 },
            ],
            filterMultiple: false,
            filterMethod (value, row) {
                return row.name == value
                console.log(1111)
            }
        },
    ]
    if (type == 1){
        arr = arr.filter(col => col.title !== '项目类型' && col.title !== '项目进展阶段' )
    } else {
        arr = arr.filter(col => col.title !== '信息类型' )
    }
    if (isTeam == 0){
        arr = arr.filter(col => col.key !== 'name' )
    } else {
        let temp = _this.teamUserName.map(item=>{
            return {
                label: item.nickName,
                value: item.nickName
            }
        })
        if (type == 1) {
            arr[7].filters = temp;
        } else {
            arr[8].filters = temp;
        }
    }
    return arr
}