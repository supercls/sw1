import request from '@/utils/request';

export async function openPort(){
    return request({
        url: '/serialPort/openPort',
        method: 'POST'
    });
}

export async function getPorts(){
    return request({
        url: '/serialPort/getPorts',
        method: 'POST'
    });
}
