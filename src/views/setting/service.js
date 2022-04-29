import request from '@/utils/request';

export async function getParams(data){
    return request({
        url: '/gcc/irp255',
        method: 'POST',
        data:data
    });
}

export async function setParams(data){
    return request({
        url: '/gcc/irp254',
        method: 'POST',
        data:data
    });
}
