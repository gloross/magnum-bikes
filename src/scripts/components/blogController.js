export default class BlogShowMore {
  constructor() {
    this.DOM = {
      blogShowMore: '.js-blog-show-more',
      blogPageContent: '.js-articles-container',
    }
  }
  init() {
    this.blogShowMore = document.querySelector(this.DOM.blogShowMore)
    this.blogPageContent = document.querySelector(this.DOM.blogPageContent)
    if (this.blogShowMore !== null && this.blogPageContent !== null) {
      this.blogShowMore.addEventListener('click', (e) => {
        e.preventDefault()
        this.initShowMoreArticles()
      })
    }
  }

  initShowMoreArticles() {
    let item = this.blogShowMore,
      page = item.dataset.page,
      articles = item.dataset.articles,
      paginateBy = item.dataset.paginateBy,
      blog = item.dataset.blog,
      pagination = Math.ceil(articles / paginateBy),
      url = `/blogs/${blog}?page=${page}`,
      last = pagination > Number(page) ? false : true
    this.renderMoreArticles(url, last)
    item.dataset.page = Number(page) + 1
  }
  renderMoreArticles(url, last) {
    window
      .fetch(url)
      .then((response) => {
        return response.text()
      })
      .then((data) => {
        let nextDOM = new DOMParser().parseFromString(data, 'text/html')
        let nextProducts = nextDOM.querySelector(
          this.DOM.blogPageContent
        ).innerHTML
        this.blogPageContent.innerHTML += nextProducts

        if (last) {
          this.blogShowMore.style.display = 'none'
        }
      })
      .catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err)
      })
  }
}

const BlogController = new BlogShowMore()
BlogController.init()
