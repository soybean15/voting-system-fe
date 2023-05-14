import {ref} from 'vue'

const fetchData = async (route) => {
    const error = ref(null);
    //const api =  "http://localhost:8000/"
    const api = "https://api.pollingpoint.net/"

    try {
      let data = await fetch(api+route);n
      if (!data.ok) {
        throw Error("no Data available");
      }
      return await data.json();
    } catch (err) {
      error.value = err.message;
    }
  };

  

  export default fetchData
