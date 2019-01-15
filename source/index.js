import '@babel/polyfill';

import Storage from './Storage';


const {
    QINIU_APP_ID, QINIU_APP_SECRET, QINIU_BUCKET_ZONE, QINIU_BUCKET_ID
} = process.env;

const bucket = new Storage(
    QINIU_APP_ID,  QINIU_APP_SECRET,  QINIU_BUCKET_ZONE,  QINIU_BUCKET_ID
);


export default  async function ({ request, req, response }) {

    switch ( request.method ) {
        case 'POST':
        case 'PUT':
            response.body = await bucket.upload(request.path, req);
            break;
        case 'DELETE':
            response.body = await bucket.delete( request.path );
    }
}
