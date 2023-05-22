import { filterDict } from "@/utils/utils.js";
import {infoTypeList} from "@/utils/const/attention";

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
            title: "项目进展阶段",
            align: "center",
            minWidth: 200,
        },
        {
            title: "地区",
            key: "areaName",
            align: "center",
            minWidth: 80,
            sortable: true,
        },
        {
            title: "发布时间",
            key: "publishDate",
            align: "center",
            width: 170,
            sortable: true,
        },
        {
            title: "更新时间",
            align: "center",
            width: 170,
            sortable: true,
            key: "lastModify"
        },
        {
            title: "分享时间",
            key: "createTime",
            align: "center",
            width: 170,
            sortable: true,
        },
        {
            title: "分享人",
            align: "center",
            minWidth: 100,
            key: "sharer",
            filters: [
                { label: '小王', value: 1 },
                { label: '小马', value: 2 },
                { label: '小刘', value: 3 },
            ],
            filterMultiple: false,
            filterMethod (value, row) {
                return row.sharer == value
                console.log(1111)
            }
        },
        {
            title: "被分享人",
            key: "sharedBy",
            align: "center",
            minWidth: 100,
        },
    ]
    if (type == 1){
        arr = arr.filter(col => col.title !== '项目类型' && col.title !== '项目进展阶段' && col.title !== '更新时间')
    } else {
        arr = arr.filter(col => col.title !== '信息类型' && col.title !== '发布时间' )
    }
    if (isTeam == 0){
        arr = arr.filter(col => col.key !== 'sharer' )
    } else {
        let temp = _this.teamUserName.map(item=>{
            return {
                label: item.nickName,
                value: item.nickName
            }
        })
        if (type == 1) {
            arr[6].filters = temp;
        } else {
            arr[7].filters = temp;
        }
    }
    return arr
}