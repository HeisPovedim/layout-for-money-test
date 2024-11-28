class Slider {
    constructor (rangeElement, valueElement, options) {
      this.rangeElement = rangeElement
      this.valueElement = valueElement
      this.options = options
  
      this.rangeElement.addEventListener('input', this.updateSlider.bind(this))
    }
  
    init() {
      this.rangeElement.setAttribute('min', this.options.min)
      this.rangeElement.setAttribute('max', this.options.max)
      this.rangeElement.value = this.options.cur
  
      this.updateSlider()
    }
  

    asMoney(value) {
      return parseFloat(value)
        .toLocaleString('ru-RU', { maximumFractionDigits: 2 }) + ' ₽'
    }

    asTerm(value) {
      return parseFloat(value)
        .toLocaleString('ru-RU', { maximumFractionDigits: 0 }) + ' дней'
    }
  
    generateBackground(rangeElement) {
      if (this.rangeElement.value === this.options.min) {
        return
      }
  
      let percentage =  (this.rangeElement.value - this.options.min) / (this.options.max - this.options.min) * 100
      return 'background: linear-gradient(to right, #FF5708 ' + percentage + '%, #DBDBDB ' + percentage + '%)'
    }
  
    updateSlider (newValue) {
      if (this.options.max === 30000) {
        this.valueElement.value = this.asMoney(this.rangeElement.value)
      } else {
        this.valueElement.value = this.asTerm(this.rangeElement.value)
      }
      this.rangeElement.style = this.generateBackground(this.rangeElement.value)
      document.querySelector('.calculator-info-refund-value').innerHTML = this.asMoney(this.updateSliderResult())
    }

    updateSliderResult () {
      let sum = parseFloat(document.querySelector('#sum').value.replace(/\D/g, ""));
      let term = parseFloat(document.querySelector('#term').value.replace(/\D/g, ""));
      return (sum * 0.8 / 100) * term + sum
    }
}
  
  let rangeElementSum = document.querySelector('#sum')
  let valueElementSum = document.querySelector('.calculator-summ .range__value') 

  let rangeElementTerm = document.querySelector('#term')
  let valueElementTerm = document.querySelector('.calculator-term .range__value') 
  
  let optionsSum = {
    min: 3000,
    max: 30000,
    cur: 15000
  }

  let optionsTerm = {
    min: 7,
    max: 30,
    cur: 15
  }
  
if (rangeElementSum) {
    let slider = new Slider(rangeElementSum, valueElementSum, optionsSum)
    slider.init()
}

if (rangeElementTerm) {
  let slider = new Slider(rangeElementTerm, valueElementTerm, optionsTerm)
  slider.init()
}