<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header
              mdl-layout--fixed-tabs">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title">StorieMaker</span>
        <div class="mdl-layout-spacer"></div>
        <button id="demo-menu-lower-right"
                class="mdl-button mdl-js-button mdl-button--icon">
          <i class="material-icons">more_vert</i>
        </button>
      </div>
      <!-- Tabs -->
      <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
        <a href="#texto" class="mdl-layout__tab is-active">Texto</a>
        <a href="#imagen" class="mdl-layout__tab">Imagen</a>
        <a href="#generar" class="mdl-layout__tab">Exporta</a>
      </div>
    </header>
    
    <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
    for="demo-menu-lower-right">
      <li class="mdl-menu__item dialog-button">Configurar el Tamaño</li>      
      <li class="mdl-menu__item authorlink"><a href="//twitter.com/dahngeek">Autor: dahngeek</a></li>      
    </ul>
    <main class="mdl-layout__content">
      <Inicio></Inicio>
      <canvas id="cvs"></canvas>
    </main>

    <dialog id="dialog" class="mdl-dialog">
      <h3 class="mdl-dialog__title">Tamaño de la imagen</h3>
      <div class="mdl-dialog__content">
        <p>Default: 400x800</p>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="ancho">
          <label class="mdl-textfield__label" for="ancho">Ancho...</label>
          <span class="mdl-textfield__error">Tiene que ser un número!</span>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="alto">
          <label class="mdl-textfield__label" for="alto">Alto...</label>
          <span class="mdl-textfield__error">Tiene que ser un número!</span>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="fuente">
          <label class="mdl-textfield__label" for="fuente">Fuente (px)...</label>
          <span class="mdl-textfield__error">Tiene que ser un número!</span>
        </div>
      </div>
      <div class="mdl-dialog__actions">
        <button id="actualizarSize" type="button" class="mdl-button">Close</button>
      </div>
    </dialog>

  </div>
</template>

<script>
require('material-design-lite')

import Inicio from './components/Inicio'

export default {
  name: 'app',
  methods: {
    activeIf: function (routeName) {
      return {
        'is-active': this.$route.name === routeName
      }
    }
  },
  components: { Inicio }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/dialog-polyfill/0.4.2/dialog-polyfill.min.css');
  @import url('https://fonts.googleapis.com/css?family=Raleway:900');


  .authorlink a {
    text-decoration: none;
    color:#000;
  }
  canvas { 
    outline: 1px solid #000;   
    background-color: white;
    max-width: 100%;
  }
  .mdl-dialog {
  border: none;
  box-shadow: 0 9px 46px 8px rgba(0, 0, 0, 0.14), 0 11px 15px -7px rgba(0, 0, 0, 0.12), 0 24px 38px 3px rgba(0, 0, 0, 0.2);
  width: 280px; }
  .mdl-dialog__title {
    padding: 24px 24px 0;
    margin: 0;
    font-size: 2.5rem; }
  .mdl-dialog__actions {
    padding: 8px 8px 8px 24px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: row-reverse;
        -ms-flex-direction: row-reverse;
            flex-direction: row-reverse;
    -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
            flex-wrap: wrap; }
    .mdl-dialog__actions > * {
      margin-right: 8px;
      height: 36px; }
      .mdl-dialog__actions > *:first-child {
        margin-right: 0; }
    .mdl-dialog__actions--full-width {
      padding: 0 0 8px 0; }
      .mdl-dialog__actions--full-width > * {
        height: 48px;
        -webkit-flex: 0 0 100%;
            -ms-flex: 0 0 100%;
                flex: 0 0 100%;
        padding-right: 16px;
        margin-right: 0;
        text-align: right; }
  .mdl-dialog__content {
    padding: 20px 24px 24px 24px;
    color: rgba(0,0,0, 0.54); }
</style>
