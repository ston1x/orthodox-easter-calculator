Vue.component('year-picker', {
  template: `
  <select v-model="selected">
    <option v-for="option in options" v-bind:value="option.value">
      {{ option.text }}
    </option>
  </select>
  `
})

var app = new Vue({
  el: '#app',
  data: {
    name: '☦️ Калькулятор православной Пасхи',
    selected: '',
    options: [],
    easter: ''
  },
  mounted() {
    this.getOptions();
    this.getCurrentYear();
    this.calculateEaster();
  },
  methods: {
    calculateEaster() {
      year = this.selected;
      a = year % 19;
      b = year % 4;
      c = year % 7;
      d = (19*a+15) % 30;
      e = (2*b + 4*c + 6*d + 6) % 7;
      shift = 13;
      march = 22+d+e + shift;
      april = d+e-9  + shift;
      console.log(march);
      console.log(april);
      april_date = new Date(Date.parse(`03/31/${year}`))
      easter = march <= 31 ? new Date(`03/${march}/${year}`) : new Date(april_date.setDate(april_date.getDate() + april));
      this.easter = `${easter.getDate()}/${easter.getMonth()+1}/${easter.getFullYear()}`
    },
    range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx);
  },
    getOptions() {
      arr = this.range(1900,2100).reduce((hash, elem) => { hash.push({text: elem.toString(), value: elem}); return hash }, []);
      this.options = arr;
    },
    getCurrentYear() {
      this.selected = new Date().getFullYear();
    }
  }
})

