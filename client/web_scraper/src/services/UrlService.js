import API from '@/services/API'

export default {
 //post method of Axios module
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


