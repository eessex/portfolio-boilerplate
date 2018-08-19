import { Home } from 'client/Apps/Home/Home'
import { Items } from 'client/Apps/Items/Items'
import { Item } from 'client/Apps/Item/Item'
import { fetchItems, fetchItem } from 'client/middleware/api'

const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
    title: 'Home'
  },
  {
    path: '/events/:id',
    component: Item,
    fetchInitialData: (path = '') => {
      return fetchItem('events', path.split('/').pop())
    }
  },
  {
    path: '/events/:slug',
    component: Item,
    fetchInitialData: (path = '') => {
      return fetchItem('events', path.split('/').pop())
    }
  },
  {
    path: '/events',
    component: Items,
    title: 'Events',
    fetchInitialData: () => {
      return fetchItems('events')
    }
  }
]

export default routes
