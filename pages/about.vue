<template>
  <div>
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const { data } = await $axios.get('https://admin.drrandevu.az' + "/api-professions")
    // console.log(data)
    return {
      title: 'My Blog',
      posts: data
    }
  }
}
</script>
