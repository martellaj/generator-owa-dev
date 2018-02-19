import <%= storeName %> from './schema/<%= storeName %>';
import { createStore } from 'satcheljs';

const default<%= storeName %>: <%= storeName %> = {
};

export const getStore = createStore<<%= storeName %>>('<%= storeIdentifier %>', default<%= storeName %>);
export default getStore();
