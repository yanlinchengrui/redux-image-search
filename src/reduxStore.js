import API from './API';

const SEARCH_TERM_CHANGED = 'SEARCH_TERM_CHANGED';
const PAGE_CHANGED = 'PAGE_CHANGED';

const initialState = {
  title: 'Redux Image Search -- Powered by ',
  searchTerm: '',
  loading: false,
  images: [],
  defaultTerm: '',
  page: 1
}

export const actions = {
  searchTermCHanged(searchTerm) {
    return {
      type: SEARCH_TERM_CHANGED,
      searchTerm,
    }
  },
  getImages(searchTerm, page) {
    return {
      type: 'IMAGES',
      meta: { searchTerm },
      payload: API.search(searchTerm, page),
    }
  },
  pageChanged(page) {
    return {
      type: PAGE_CHANGED,
      page
    }
  }
}

export function reducer(state = initialState, action) {
  switch (action.type) {

    case SEARCH_TERM_CHANGED: {
      return {
        ...state,
        searchTerm: action.searchTerm
      }
    }

    case 'IMAGES_PENDING': {
      return {
        ...state,
        loading: true,
        images: []
      }
    }

    case 'IMAGES_FULFILLED': {
      return {
        ...state,
        loading: false,
        images: action.payload,
        defaultTerm: action.meta.searchTerm,
        searchTerm: ''
      };
    }

    case PAGE_CHANGED: {
      return {
        ...state,
        page: action.page
      }
    }

    default:
      return state;
  }
}