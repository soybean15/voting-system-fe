import {ref} from 'vue'

const fetchData = async (route) => {
    const error = ref(null);
    const api =  "http://voting.test/"

    try {
      let data = await fetch(api+route);
      if (!data.ok) {
        throw Error("no Data available");
      }
      return await data.json();
    } catch (err) {
      error.value = err.message;
    }
  };

  

  export default fetchData
