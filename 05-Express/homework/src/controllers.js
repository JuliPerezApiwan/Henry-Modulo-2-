let posts = [];
let index = 1;


/******************** Controlers */

const createPost = (author, title, contents) => {
  if (!author || !title || !contents)
    throw Error(
      "No se recibieron los parámetros necesarios para crear el Post"
    );
 
    const newPost = {
      author, 
      title, 
      contents, 
      id : index++
    }
    posts.push(newPost);
  return newPost;
};

const getPosts = (term) => {
  if (term) {
    return posts.filter(
      (post) => post.title.includes(term) || post.contents.includes(term)
    );
  } else {
    return posts;
  }
};

const getAuthorPosts = (author) => {
  const result = posts.filter((post) => post.author === author);
  if(result.length) return result;
    else throw Error("No existe ningun post del autor indicado")
};

const getAuthorPostsTitle = (author, title) => {
  const result = posts.filter((post) => post.title === title && post.author === author);
  if (result.length) {
    return result;
  } else {
    throw Error("No existe ningun post con dicho titulo y autor indicado");
  }
};

const updatePost = (id, title, contents) =>{
if(!id || !title || !contents) throw Error ("No se recibieron los parametros necesarios para modificar el Post");

  const result = posts.find((post) => post.id == id)
  if(!result) throw Error ("Un mensaje adecuado")

    result.title = title;
    result.contents = contents;
    return result;
};




const deletePost = (id) => {
if(!id) throw Error ("No tengo id");

const deleteid = posts.find((post) => post.id == id);
if(!deleteid) throw Error ("El post no existe");

posts = posts.filter((post) => post.id != id);
}

const deleteAuthor = (author) => {
  if (!author) throw Error("No tengo author");
  const authorPosts = posts.filter((post) => post.author == author);
  if (!authorPosts.length) throw Error("No existe el autor indicado");

  posts = posts.filter((post) => post.author != author);
  return authorPosts;
};





module.exports = {
  posts,
  createPost, 
  getPosts,
  getAuthorPosts,
  getAuthorPostsTitle,
  updatePost,
  deletePost,
  deleteAuthor,
}





