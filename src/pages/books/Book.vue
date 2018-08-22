<template>
  <div>
    <div v-for="book in books" :key='book.id'>
      <div>{{book.title}}</div>
    </div>
  </div>
</template>
<script>
import { get } from "@/utils";
export default {
  data() {
    return {
      books: []
    };
  },
  methods: {
    async getBookList() {
      const books = await get("/weapp/booklist");
      this.books = books.list;
    }
  },
  mounted() {
    this.getBookList();
  }
};
</script>
<style>
</style>
