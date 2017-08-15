<template>
<div>
  <section class="mdl-layout__tab-panel is-active" id="texto">
    <div class="page-content">
      <form action="#">
        <div id="campoTexto" class="mdl-textfield mdl-js-textfield">
          <textarea class="mdl-textfield__input" type="text" rows= "3" id="input" ></textarea>
          <label class="mdl-textfield__label" for="sample5">Contenido</label>
        </div>
      </form>
    </div>
  </section>
  <section class="mdl-layout__tab-panel" id="imagen">
    <div class="page-content">
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--6-col">
            <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="switch-1">
              <input type="checkbox" id="switch-1" class="mdl-switch__input" :checked="randomImage" @change="onChange()">
              <span class="mdl-switch__label">Imagen al Azar</span>
            </label>
          </div>
          <div class="mdl-cell mdl-cell--6-col">
            <button v-if="randomImage" class="mdl-button mdl-js-button mdl-button--raised" id="recargarImagen">
              Obtener Otra Imagen
            </button>
          </div>
        </div>
        <div v-show="!randomImage">
          <div class="mdl-grid">
            <div class="mdl-cell mdl-cell--8-col">
              <div class="mdl-textfield mdl-js-textfield">
                <input class="mdl-textfield__input" type="text" id="imageSugg">
                <label class="mdl-textfield__label" for="sample1">Palabra Clave o URL</label>
              </div>
            </div>
            <div class="mdl-cell mdl-cell--4-col">
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="obtenerImagen">
                Obtener Imagen
              </button>
            </div>
          </div>
        </div>
    </div>
  </section>
  <section class="mdl-layout__tab-panel" id="generar">
    <div class="page-content">
      <a id="downloadLnk" download>
        <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
        <i class="material-icons">file_download</i>
      </button>
      </a>
    </div>
  </section>
</div>
</template>

<script>
export default {
  name: 'Inicio',
  data () {
    return {
      randomImage: true
    }
  },
  methods: {
    onChange () {
      console.log(this.randomImage)
      this.randomImage = !this.randomImage
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #campoTexto {
    width:100%;
  }
  #campoTexto textarea, #campoTexto label {
    font-size: 32px;
    font-family: 'Raleway';
    padding-top:10px;
  }
  #botonNext {
    position:fixed;
    bottom: 10%;
    right: 10%;
  }
  #downloadLnk{
    position: fixed;
    bottom: 10%;
    right: 10%;
  }
</style>
