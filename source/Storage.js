import { rs, auth, conf, zone, form_up } from 'qiniu';

import { promisify } from './utility';


export default  class Storage {

    constructor(app, key, area, scope) {

        this.scope = scope;

        const mac = new auth.digest.Mac(app, key),
            putPolicy = new rs.PutPolicy({ scope }),
            config = new conf.Config();

        config.zone = zone[`Zone_${area}`];

        this.uploader = new form_up.FormUploader( config );

        this.manager = new rs.BucketManager(mac, config);

        this.token = putPolicy.uploadToken( mac );

        this.putExtra = new form_up.PutExtra();
    }

    @promisify
    upload(name, path, callback) {

        this.uploader.putFile(this.token, name, path, this.putExtra, callback);
    }

    @promisify
    delete(name, callback) {

        this.manager.delete(this.scope, name, callback);
    }
}
