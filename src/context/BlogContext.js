import createDataContext from "./createDataContext";
import jasonServer from "../api/jasonServer";

const blogReducer = (state, action) => {
   console.log('Reducer called with action type:', action.type);
   switch (action.type) {
     /* case 'add_blogpost':
         console.log('Adding a blog post');
         return [...state, {
            id: Math.floor(Math.random() * 99999),
            // title: `My Blog Post n° ${state.length + 1}`
            title: action.payload.title,
            content: action.payload.content
         }];
      */   
      case 'delete_blogpost':
         console.log('Deleting blog post with id:', action.payload);
         return state.filter(blogPost => blogPost.id !== action.payload);
      //return state.filter(blogPost => blogPost.id !== action.payload);
      case 'edit_blogpost':
         console.log('Editing blog post with id:', action.payload);
         return state.map((blogPost) => {
            return blogPost.id === action.payload.id ? action.payload : blogPost
         });
      case 'get_blogposts':
         return action.payload;
      default:
         return state;

   }

};


/* //
const addBlogPost = (dispatch) => {
   return (title, content) => {
      dispatch({ type: 'add_blogpost', payload:{title,content} })
   }
};
*/

const addBlogPost = (dispatch) => { // se fosse una richiesta API mettere try e catch qui
   return async (title, content, callback) => {
      await jasonServer.post('/blogposts',{title, content})

    //return (title, content, callback) => {
     // dispatch({ type: 'add_blogpost', payload: { title, content } });
      if (callback) { callback()}
   }
};

const deleteBlogPost = (dispatch) => {
   return async (id) => {
      await jasonServer.delete(`/blogposts/${id}`)
     
      dispatch({ type: 'delete_blogpost', payload: id })
   }
};

const editBlogPost = dispatch => {
   return async (id, title, content, callback) => {
      await jasonServer.put(`/blogposts/${id}`, {title, content} )
      dispatch(
         {
            type: "edit_blogpost",
            payload: { id, title, content }
         });
      if (callback) {
         callback();
      }
   }
}
// vogliamo fare una richiesta di rete quindi sarà ina funzione async
const getBlogPosts = dispatch => {
   return async () => {
      const response = await jasonServer.get('/blogposts');
      //response.data === [{}, {}, {}]
      dispatch({ type: 'get_blogposts', payload: response.data });
   };
};


export const { Context, Provider } = createDataContext(
   blogReducer,
   { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
   [] //[{title: 'TEST POST', content: 'test content vai così!', id:1}] con l'api non abbiamo bisogno di questo post iniziale
);