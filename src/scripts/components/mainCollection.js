import { picoapp } from 'picoapp'
import collectionMain from './collectionFilters'

const state = {
  cartOpen: false,
}

const components = {
  collectionMain,
}

export default picoapp(components, state)
