/**
 * 格式化日期
 * @export
 * @param {Date} date
 * @param {string} fmt "yyyy-MM-dd hh:mm:ss"
 * @returns
 */
export function formateDate(date: Date, fmt: string="yyyy-MM-dd")
{
    let o = {
        "M+": date.getMonth() + 1,                 //月份 
        "d+": date.getDate(),                    //日 
        "h+": date.getHours(),                   //小时 
        "m+": date.getMinutes(),                 //分 
        "s+": date.getSeconds(),                 //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds()             //毫秒 
    };
    //如:yyyy
    if (/(y+)/.test(fmt))
    {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear().toString()).substr(4 - RegExp.$1.length));
    }
    //yyyy-MM-dd hh:mm:ss
    for (let k in o)
    {
        if (new RegExp("(" + k + ")").test(fmt))
        {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

const SCAN_IDS="scansId";

export function saveScanIdAndIsUpdate(id:string){
    let scanIds:string[]=[];
    let exitIds=localStorage.getItem(SCAN_IDS);
    if(exitIds){
        scanIds=JSON.parse(exitIds);
    }
    let isUpdate=false;
    if(!scanIds.includes(id)){
        scanIds.push(id);
        isUpdate=true;
    }
    localStorage.setItem(SCAN_IDS,JSON.stringify(scanIds));
    return isUpdate;
}
