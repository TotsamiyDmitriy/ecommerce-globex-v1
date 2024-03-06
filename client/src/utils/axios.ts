import axios from "axios";

const clientCall = axios.create({
    baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1/',
    headers: {
      'Content-type': 'application/json',
    },
  });

  export default clientCall