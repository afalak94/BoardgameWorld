// FAQ component
import React, { Component } from 'react';

const styles = require('../css/FAQ.module.css');

export class FAQ extends Component {
  render() {
    return (
      <div className={styles.faq}>
        <h1>Frequently Asked Questions</h1>

        <h3>
          Vivamus sed scelerisque leo. In hac habitasse platea dictumst. Morbi
          volutpat vestibulum elementum. Sed rhoncus purus justo, at dignissim
          mauris pellentesque et?
        </h3>
        <p>
          Morbi lorem justo, accumsan vitae tristique a, volutpat in neque.
          Vivamus eu quam sit amet urna eleifend faucibus. Ut porta aliquet
          egestas. Donec aliquam semper convallis. Vivamus eu mattis augue.
          Maecenas a dapibus turpis. Quisque vulputate risus id sagittis
          blandit. Sed convallis in neque at accumsan. Fusce condimentum, nisi
          quis vestibulum volutpat, massa magna maximus eros, sit amet volutpat
          lorem velit vel tellus. Aliquam id pretium enim, dapibus elementum
          lacus. Pellentesque in nulla id ante egestas imperdiet placerat id
          libero.
        </p>

        <h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut
          aliquet leo. Maecenas quis iaculis augue. Vivamus faucibus mollis urna
          id aliquet?
        </h3>
        <p>
          Mauris in luctus nibh, eu laoreet nibh. Morbi iaculis porta velit at
          pellentesque. Praesent odio lorem, aliquam pulvinar orci vitae,
          vulputate lacinia libero. Morbi iaculis nunc tortor, vitae mollis
          mauris euismod at. Suspendisse ultricies convallis dui eu ultrices.
          Sed suscipit nec urna eu semper. Donec eget urna lacus. Mauris quis
          malesuada risus, in ullamcorper lorem. Fusce cursus venenatis nisl,
          vel laoreet erat egestas ac. Pellentesque dolor est, pretium nec elit
          vitae, tristique elementum mauris.
        </p>

        <h3>
          Curabitur id leo et ante aliquet facilisis. Curabitur ultrices maximus
          interdum?
        </h3>
        <p>
          Mauris id volutpat metus. Fusce sed justo erat. Suspendisse finibus
          orci sed risus mattis tristique. Donec ultrices faucibus ligula.
          Aliquam sed dolor eros. Nullam rhoncus nibh sodales pharetra luctus.
          Ut varius mauris eget tellus volutpat, a placerat nibh viverra.
          Quisque a suscipit felis, et imperdiet lorem. Donec rutrum dui quis
          ligula viverra, ac fringilla turpis laoreet.
        </p>

        <h3>
          Cras molestie, metus quis rhoncus tempor, sem orci varius felis, sit
          amet posuere velit erat a orci. Integer et dictum justo. Mauris rutrum
          mauris nec imperdiet vestibulum. Ut eget vulputate dolor?
        </h3>
        <p>
          Ut eget vulputate dolor. Praesent tincidunt non nunc vel ullamcorper.
          Pellentesque quis dui aliquet, auctor felis sed, rhoncus nulla. Aenean
          bibendum ac lorem id accumsan. Integer sed egestas ligula, ac pharetra
          purus. Duis vestibulum, mauris et tincidunt ornare, nisl lectus
          condimentum felis, eget lacinia augue odio non ante.
        </p>
      </div>
    );
  }
}
