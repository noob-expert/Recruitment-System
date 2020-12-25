// 此文件仅仅作为jsonp方法示例使用，实际上url已无法访问

import jsonp from "jsonp"
import {message} from "antd"

// jsonp
export default function GetWeather(city){
    const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6uFRGOT9s8UBWr2`
    return new Promise((resolve,reject)=>{
        jsonp(url,{},(err,data)=>{
            console.log(err,data);
            if(!err){
                resolve(data)
            }else{
                message.error("获取天气信息失败")
                reject(err)
            }
        })
    })
}