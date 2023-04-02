import { ref } from "vue";
import fetchData from "./fetchData"

const getPositions = ()=>{

    
    const path = "candidate"

    const positions = ref([])
    

    fetchData(path)
    .then(response=>{
        positions.value = response.data
       
    })
  
    


    
      return positions


}

export default getPositions