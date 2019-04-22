const src = '../src/';
const dest = '../build/';

module.exports = {
  global: {
    src,
    dest
  },
  pug: {
    src: `${src}pug/`,
    dest: dest
  },
  sass: {
    src: `${src}sass/`,
    dest: `${dest}css/`
  },
  js: {
    src: `${src}js/`,
    dest: `${dest}js/`
  },
  img: {
    src: `${src}img/`,
    dest: `${dest}img/`
  },
  fonts: {
    src: `${src}fonts/`,
    dest: `${dest}fonts/`
  }
};
