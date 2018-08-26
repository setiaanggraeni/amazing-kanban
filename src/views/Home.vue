<template>
  <div class="home">
    <Navbars/>
    <ForBody/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbars from '@/components/Navbar.vue'
import ForBody from '@/components/Body.vue'

export default {
  name: 'home',
  components: {
    Navbars, ForBody
  }
}
</script>
