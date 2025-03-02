import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api-ad4clxmm3q-uc.a.run.app'
    // 'http://127.0.0.1:5001/clone-6b855/us-central1/api'
});

export default instance;