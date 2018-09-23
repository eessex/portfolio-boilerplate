import { Home } from 'client/Apps/Home/Home'
import { fetchItem } from 'client/actions/item'
import { fetchItems } from 'client/actions/items'
import Item from 'client/Apps/Item/Item'
import Items from 'client/Apps/Items/Items'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    title: 'Home'
  },
  {
    path: '/events/:slug',
    model: 'events',
    component: Item,
    fetchInitialData: (path = '', store) => {
      return store.dispatch(fetchItem('events', path.split('/').pop()))
    }
  },
  {
    path: '/events',
    component: Items,
    model: 'events',
    title: 'Events',
    fetchInitialData: (path = '', store) => {
      return store.dispatch(fetchItems(path))
    }
  }
]

export default routes
