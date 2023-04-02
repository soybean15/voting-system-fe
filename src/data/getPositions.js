import { ref } from "vue";
import fetchData from "./fetchData"

// const getPositions = ()=>{

    
//     const path = "candidate"

//     const positions = ref([])
    

//     fetchData(path)
//     .then(response=>{
//         positions.value = response.data
       
//     })
  
    


    
//       return positions


// }

const getPositions = ()=>{

    
    const path = "candidate"

    

    return fetchData(path)
  
    



}


export default getPositions