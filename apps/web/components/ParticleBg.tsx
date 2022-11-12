import Head from "next/head";

const ParticleBg = () => {
  return (
    <>
      <Head>
        <style>
          {`
          
          body {
            overflow: hidden;
            height: 100vh;
            width: 100vw;
          }

                  .particles-wrapper {
  background-color: #001220;
  width: 100vw;
  height: calc(100vh - 60px);
  left: 0;
  top: 0;
  padding: 0;
  position: absolute;
  margin: 0;
  z-index: -1;
}

.particles-js-canvas-el {
    position: absolute;
    width: 100vw;
    top: 60px;
    height: calc(100vh + 60px) !important;
}

`}
        </style>
        <script defer>
          {`
                  /* ---- particles.js config ---- */
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 300,
      "density": {
        "enable": true,
        "value_area": 1000
      }
    },
    "color": {
      "value": ["#2e2555", "#695895"]
    },
    "shape": {
      "type": "polygon",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 4
      }
    },
    "size": {
      "value": 5,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 4,
        "size_min": 1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#58636d",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 5,
      "direction": "left",
      "random": true,
      "straight": true,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": true,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 200,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});
`}
        </script>
      </Head>
      <div className="particles-wrapper">
        <div id="particles-js"></div>
      </div>
    </>
  );
};

export default ParticleBg;
