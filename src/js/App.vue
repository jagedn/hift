<script setup>
import Header from '../components/AppHeader.vue'
import Footer from '../components/AppFooter.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="container py-4 px-3 mx-auto">
    <Header />

    <h1>How I feel today (fediverse version)</h1>
    <div class="col-lg-8 px-0">
      <p class="fs-4">Share your daily feeling</p>
    </div>

    <!--button type="button" class="btn btn-primary me-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">Toggle offcanvas</button-->
    <!--a id="popoverButton" class="text-success" href="#" role="button" data-bs-toggle="popover" title="Custom popover" data-bs-content="This is a Bootstrap popover.">Example popover</a-->

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div>
          Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
        </div>
        <div class="dropdown mt-3">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
            Dropdown button
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
      </div>
    </div>

    <RouterView />

    <Footer />
  </div>
</template>
