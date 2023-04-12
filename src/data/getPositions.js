import { ref } from "vue";
import fetchData from "./fetchData"

// const getPositionsList =()=>{

    
//     const path = "api/candidate"

//     const positions = ref([])
    

//     fetchData(path)
//     .then(response=>{
//         positions.value = response.data
       
//     })
// };
  
    


    
//       return positions


// }

const getPositions = ()=>{

    
    const path = "api/candidate"

    

    return fetchData(path)
  
    



}


export default getPositions