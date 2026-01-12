// Desenvolvido por Jonathan Reis
let posts = [];

function addPost() {
  const username = document.getElementById('username').value.trim();
  const postContent = document.getElementById('postContent').value.trim();
  const postImage = document.getElementById('postImage').files[0];

  if (!username || !username.startsWith('@')) {
    alert('Por favor, insira um @usuario válido (ex: @joao).');
    return;
  }

  if (!postContent) {
    alert('Por favor, escreva algo antes de postar.');
    return;
  }

  const post = {
    username,
    content: postContent,
    image: postImage ? URL.createObjectURL(postImage) : null,
    likes: 0,
  };

  posts.push(post);
  
  // Limpar os campos
  document.getElementById('postContent').value = '';
  document.getElementById('postImage').value = ''; // Limpa o input file
  
  renderPosts();
}

function renderPosts() {
  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';

  posts.slice().reverse().forEach((post, index) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    postElement.innerHTML = `
      <div class="header">${post.username}</div>
      <div class="content">${post.content}</div>
      ${post.image ? `<img src="${post.image}" alt="Imagem do post">` : ''}
      <div class="actions">
        <span>${post.likes} curtidas</span>
        <button onclick="likePost(${posts.length - 1 - index})">Curtir</button>
      </div>
    `;

    postsContainer.appendChild(postElement);
  });
}

function likePost(index) {
  posts[index].likes++;
  renderPosts();
}