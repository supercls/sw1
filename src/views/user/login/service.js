import request from '@/utils/request';

export async function openPort(data){
    return request({
        url: '/gcc/serialPort/openPort',
        method: 'POST',
        data:data
    });
}

export async function getPorts(){
    return request({
        url: '/gcc/serialPort/getPorts',
        method: 'POST'
    });
}