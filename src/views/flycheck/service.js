import request from '@/utils/request';

export async function beforeFlyCheck(data){
    return request({
        url: '/gcc/beforeFlyCheck',
        method: 'POST',
        data:data
    });
}

export async function getBeforeFlyCheck(data){
    return request({
        url: '/gcc/getBeforeFlyCheck',
        method: 'POST',
        data:data
    });
}

export async function updateBeforeFlyCheck(data){
    return request({
        url: '/gcc/updateBeforeFlyCheck',
        method: 'POST',
        data:data
    });
}
