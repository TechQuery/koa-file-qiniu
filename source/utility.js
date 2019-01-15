export  function promisify(meta) {

    const { method } = meta;

    meta.method = function (...param) {

        return  new Promise((resolve, reject) =>

            method.apply(this,  param.concat((error, data, response) => {

                error = error  ||  (data || '').error;

                if (! error)  return resolve( response );

                error = new Error(error.message || error);

                error.status = response.statusCode;

                reject( error );
            }))
        );
    };
}
