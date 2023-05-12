<template>
  <div class="about p-6 flex flex-col items-center">
    <h1 class="text-4xl text-white font-bold p-2">About us</h1>
    
    <div class=" flex ">
      
      <img class="w-72 shadow-lg rounded-md" src="@/assets/img/about.jpg" />
      <div class="w-72 text-white flex flex-col">
        <div class="font-bold text-2xl flex ml-6">BSIT 3A</div>
        <div class="flex ml-6 text-gray-400" v-for="name in bsit" :key="name">
          <div>{{ name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const bsit = [
      "Marlon Padilla (Lead)",
      "Jean Aileen Esteban(Back-end)",
      "Remric Paderes(Front-end)",
      "Nestor Samson(Front-end)",
      "John Russel Mercado(QA)",
      "Jericho Abesamis(QA)",
      "Dhalton Abesamis",

      "Jhon Carlo Reyes",

      "Kelly Bryant Lim ",
      "Paulo Mabutol ",
      "Daniel Cuevas ",
      "Fracis Ronel Mabalay ",
      "Janus Abesamis",

      "Jowel De Guzman",
      "Avegail Macidonio",
      "Jerome Jonco"
    ];
    return { bsit };
  },
};
</script>

<style>
</style>