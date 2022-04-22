import request from '@/utils/request';

export async function actionPost(data){
    return request({
        url: '/gcc/irp12or13',
        method: 'POST',
        data:data
    });
}
