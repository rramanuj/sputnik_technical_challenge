import API from '@/services/API' //Data from our API such as port etc, is stored in this file.

//This file assumes everything is gravy in terms of config setups, so we dive directly into our
//RESTful routes!

export default {
    title(url) {
        return API().post('title', url);
    },
    scrape(url) {
        return API().post('scrape', url);
    },
    GA(url) {
        return API().post('analytics', url);
    }
}


