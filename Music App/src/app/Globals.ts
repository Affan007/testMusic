
import { environment } from '../environments/environment';

const baseUrl = environment.baseUrl;

export const Globals = {
    appName: 'Music',
    defaultImage: 'https://ondemandstartup.s3.us-west-2.amazonaws.com/profileImages/1000X1000/1540906183439-icon_default_image.png',

    urls: {
       getAlldata:baseUrl+'/list/getAll',
       getSingleSongData:baseUrl+'/list/:id',
    }
};
