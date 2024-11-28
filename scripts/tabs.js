document.addEventListener('DOMContentLoaded', () => {

    class Tabs { 
      constructor(config) { 
        this.tabs = config.tabsSelector 
        this.head = config.tabsHeadSelector 
        this.body = config.tabsBodySelector 
        this.caption = config.tabsCaptionSelector 
        this.captionActiveClass = config.tabsCaptionActiveClass 
        this.contentActiveClass = config.tabsContentActiveClass 
        if (config.btnToggleId) {
          this.btnToggle = config.btnToggleId 
        }
      }
  
      getActiveTabName(head) { 
        return head.querySelector(`.${this.captionActiveClass}`).dataset.tab 
      }
  
      setActiveContent(head, body) { 
        if (body.querySelector(`.${this.contentActiveClass}`)) { 
          body.querySelector(`.${this.contentActiveClass}`).classList.remove(this.contentActiveClass) 
        }

        body.querySelector(`[data-tab="${this.getActiveTabName(head)}"]`).classList.add(this.contentActiveClass) 
      }
  
      onLoad(head, body) { 
        
        if (!head.querySelector(`.${this.captionActiveClass}`)) { 
          head.querySelector(this.caption).classList.add(this.captionActiveClass) 
        }
  
        this.setActiveContent(head, body) 
      }
  
      onClick(head, body) { 
        head.addEventListener('click', e => {
          e.preventDefault()
          const caption = e.target.closest(this.caption) 
          if (!caption) return 
          if (caption.classList.contains(this.captionActiveClass)) return 
  
          if (head.querySelector(`.${this.captionActiveClass}`)) { 
            head.querySelector(`.${this.captionActiveClass}`).classList.remove(this.captionActiveClass) 
          }
  
          caption.classList.add(this.captionActiveClass) 

          if (this.btnToggle) {
            document.querySelector(`#${this.btnToggle}`).checked = false;
          }
          
          this.setActiveContent(head, body) 
        })
      }
  
      init() {
        const tabs = document.querySelector(this.tabs)
        const head = tabs.querySelector(this.head)
        const body = tabs.querySelector(this.body)
  
        this.onLoad(head, body)
  
        this.onClick(head, body) 
      }
    }
  
    new Tabs({ 
      tabsSelector: '.news-main', 
      tabsHeadSelector: '.news-nav', 
      tabsBodySelector: '.news-body', 
      tabsCaptionSelector: '.tabs-news', 
      tabsCaptionActiveClass: 'tabs-news-active', 
      tabsContentActiveClass: 'tabs-news-content-active',
      btnToggleId: 'menu-toggle-offers-news' 
    }).init() 

    new Tabs({ 
        tabsSelector: '.offers-main', 
        tabsHeadSelector: '.offers-nav', 
        tabsBodySelector: '.offers-body', 
        tabsCaptionSelector: '.tab-offers', 
        tabsCaptionActiveClass: 'tab-offers-active', 
        tabsContentActiveClass: 'tab-offers-content-active', 
        btnToggleId: 'menu-toggle-offers'
    }).init() 

    new Tabs({ 
        tabsSelector: '.offers-main-hot', 
        tabsHeadSelector: '.offers-nav-hot', 
        tabsBodySelector: '.offers-body-hot', 
        tabsCaptionSelector: '.tab-offers-hot', 
        tabsCaptionActiveClass: 'tab-offers-active', 
        tabsContentActiveClass: 'tab-offers-content-active', 
        btnToggleId: 'menu-toggle-offers-hot'
    }).init() 
  
  
  })