/**
 * @Author: 付柏磊
 * @Date: 2022-08-31 17:20:03
 * @LastEditors: 付柏磊
 * @LastEditTime: 2022-09-01 09:52:24
 * @Description: 修改订阅设置列
 */
import {columnType, contentRange, infoTypeList, projectPhase, category1Data} from "@/utils/const/attention";
import {filterDict} from "@/utils/utils";

export const setColumn = function (_this, type){
    let arr = [
        {
            type: 'selection',
            width: 60,
            align: 'center',
        },
        {
            title: "订阅器名称",
            align: "center",
            minWidth: 150,
            key: "name",
            tooltip: true
        },
        {
            title: "订阅词",
            align: "center",
            minWidth: 150,
            key: "keyword"
        },
        {
            title: "订阅逻辑",
            align: "center",
            minWidth: 120,
            key: "keywordLogic",
            render: (h,params)=>{
                return(
                    <span>{params.row.keywordLogic?'与':'或'}</span>
                )
            }
        },
        {
            title: "排除词",
            align: "center",
            minWidth: 120,
            key: "excludeKeyword"
        },
        {
            title: "栏目类型",
            align: "center",
            minWidth: 120,
            key: "infoTypeDeal",
            tooltip: true,
        },
        {
            title: "内容范围",
            align: "center",
            minWidth: 120,
            key: "searchRange",
            render: (h,params)=>{
                let temp = filterDict(params.row.searchRange, contentRange)
                return(
                    <span>{temp}</span>
                )
            }
        },
        {
            title: "地区",
            align: "center",
            minWidth: 120,
            key: "areaDeal",
            tooltip: true,
        },
        {
            title: "项目阶段",
            align: "center",
            minWidth: 120,
            key: "stage",
            render: (h,params)=>{
                let temp = filterDict(params.row.stage, projectPhase)
                return(
                    <span>{temp}</span>
                )
            }
        },
        {
            title: "行业范围",
            align: "center",
            minWidth: 120,
            key: "primaryIndustry",
            render: (h,params)=>{
                let temp = filterDict(params.row.primaryIndustry, category1Data)
                return(
                    <span>{temp}</span>
                )
            }
        },
        {
            title: "短信订阅",
            align: "center",
            minWidth: 100,
            key: "isSms",
            render: (h, params) => _this.renderSwitch(params.row.isSms)
        },
        {
            title: "邮件订阅",
            align: "center",
            minWidth: 100,
            key: "isEmail",
            render: (h, params) => _this.renderSwitch(params.row.isEmail)
        },
        {
            title: "微信订阅",
            align: "center",
            minWidth: 100,
            key: "isWechat",
            render: (h, params) => _this.renderSwitch(params.row.isWechat)
        },
        {
            title: "APP订阅",
            align: "center",
            minWidth: 100,
            key: "isApp",
            render: (h, params) => _this.renderSwitch(params.row.isApp)
        },
        {
            title: "操作",
            align: "left",
            minWidth: 200,
            fixed: 'right',
            render:(h,params) => {
                return(
                    <div class="operaBtn">
                        <span onClick={()=>_this.editSub(params)}>修改</span>
                        <span onClick={()=>_this.delSub(params)}>删除</span>
                        <span onClick={()=>_this.shareSub(params)}>分享</span>
                    </div>
                )
            }
        },
    ]
    if (type == '1'){
        arr = arr.filter(col => col.title !== '项目阶段' && col.title !== '行业范围')
    }
    return arr
}
