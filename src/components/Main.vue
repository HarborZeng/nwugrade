<template>
  <div class="container">
    <Header></Header>
    <AlertMsg></AlertMsg>
    <Login></Login>
    <StudyState></StudyState>
    <Grade></Grade>
    <Footer></Footer>
    <Modal></Modal>
  </div>
</template>

<script>
import AlertMsg from './AlertMsg'
import Header from './Header'
import Login from './Login'
import StudyState from './StudyState'
import Grade from './Grade'
import Footer from './Footer'
import Modal from './Modal'

export default {
  name: 'Main',
  components: {Modal, Footer, Grade, StudyState, Login, Header, AlertMsg}
}
</script>

<style scoped>

</style>
