

/*export const buttonElement = document.getElementById('add-button');
export const listElement = document.getElementById("list");
export const nameInputElement = document.getElementById("name-input");
export const commentInputElement = document.getElementById("comment-input");
export const comment = document.getElementsByTagName('li');
export const deleteFormButtonElement = document.getElementById("delete-form-button");
export const commentsLoad = document.querySelector(".comments-load");

import { fetchGet, fetchPost, commentaries, token, host } from "./api.js";
import renderComments from "./render.js";
import { getComments } from "./comments.js";
import  initLikeButtonListeners  from "./like.js";*/


//fetchGet();
let commentaries = [];
const host = 'https://wedev-api.sky.pro/api/v2/tanya-koryachkina/comments';
let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";




const renderApp=() => {


    const appEl = document.getElementById('app');

    if(!token) {
        const appHtml = `
        <div class="container">
          <div class="add-form">
            <h3 class="form-title">Форма входа</h3>
            <div class="form-row">
              Логин    
              <input id="login-input" type="text" class="add-form-name"/>
              <br />
              <br />
              Пароль
              <input id="login-input" type="text" class="add-form-name"/>
            </div>
            <br />
            <button id='login-button' class="add-form-button">Войти</button>
          </div> 
        </div>`;

        appEl.innerHTML = appHtml;
        document.getElementById('login-button').addEventListener('click', () => {
            token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
            const fetchGet = () => {

                commentsLoad.style.display = "block";
                listElement.style.display = "none";
                fetch(host, {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    }
                })
                .then((response) => {
                    if(response.status ===401) {

                        alert("Не авторизованы");
                        throw new Error ("Не авторизованы");
                        
                    }
                    return response.json();
                })
                .then((responseData) => {
                    const appComments = responseData.comments
                    .map((comment) => {
                        return {
                            name: comment.author.name,
                            date: new Date(Date.parse(comment.date)).toLocaleDateString() + ' ' + new Date(Date.parse(comment.date)).getHours() + ':' + new Date(Date.parse(comment.date)).getMinutes(),
                            text: comment.text,
                            likes: comment.likes,
                            isLiked: false,
                            id: comment.id,
                        };
                    
                    });
                    return appComments;
                })
                .then((data) => {
                    commentsLoad.style.display = "none";
                    listElement.style.display = "flex";
                    commentaries = data;
                    renderApp();
                });
                    
            
                  
            };
            
            fetchGet();
            renderApp();
          });
          return;
    }
    
      const getComments = commentaries.map((comment,index) => {
        if(comment.isLiked) {
            return `<li  class="comment" data-index="${index}">
              <div class="comment-header">
                <div>${comment.name}</div>
                <div>${comment.date}</div>
              </div>
              <div class="comment-body">
                <div class="comment-text">
                  ${comment.text}
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${comment.likes}</span>
                  <button data-index="${index}"  class="like-button -active-like"></button>
                </div>
              </div>
            </li>`;
        } else {
            return `<li  class="comment" data-index="${index}">
              <div class="comment-header">
                <div>${comment.name}</div>
                <div>${comment.date}</div>
              </div>
              <div class="comment-body">
                <div class="comment-text">
                  ${comment.text}
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${comment.likes}</span>
                  <button data-index="${index}" data-likes=${comment.likes} class="like-button"></button>
                </div>
              </div>
            </li>`;
  
        };
        
    }).join('');
  
    const appHtml = `
    <div class="container">
      <div class="add-form">
        <h3 class="form-title">Форма входа</h3>
        <div class="form-row">
          Логин    
          <input id="login-input" type="text" class="add-form-name"/>
          <br />
          <br />
          Пароль
          <input id="login-input" type="text" class="add-form-name"/>
        </div>
        <br />
        <button id='login-button' class="add-form-button">Войти</button>
      </div>
      <ul id="list" class="comments">
        <!-- <li   class="comment">
          <div class="comment-header">
            <div>Глеб Фокин</div>
            <div>12.02.22 12:18</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              Это будет первый комментарий на этой странице
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span  class="likes-counter">3</span>
              <button data-likes="3" class="like-button"></button>
            </div>
          </div>
        </li>
        <li  class="comment">
          <div class="comment-header">
            <div>Варвара Н.</div>
            <div>13.02.22 19:22</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              Мне нравится как оформлена эта страница! ❤
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">75</span>
              <button data-likes="75" class="like-button -active-like"></button>
            </div>
          </div>
        </li> -->
        ${getComments}
      </ul>
      <div class="add-form">
        <input id="name-input"
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
        />
        <textarea id="comment-input"
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button id='add-button' class="add-form-button">Написать</button>
          <button class = "delete-form-button" id="delete-form-button">Удалить последний комментарий</button>
        </div>
      </div>
    </div>`
    //const commentsHtml = commentaries.map((comment, index) => getComments(comment, index)).join('');
    appEl.innerHTML = appHtml;
    const buttonElement = document.getElementById('add-button');
    const listElement = document.getElementById("list");
    const nameInputElement = document.getElementById("name-input");
    const commentInputElement = document.getElementById("comment-input");
    const comment = document.getElementsByTagName('li');
    const deleteFormButtonElement = document.getElementById("delete-form-button");
    const commentsLoad = document.querySelector(".comments-load");
  
    const initLikeButtonListeners = () => {
        const likesElements = document.querySelectorAll(".like-button");
      //console.log(likesElements);
        for (const likeElement of likesElements) {
          //console.log(likeElement);
          likeElement.addEventListener ("click", (event) => {
            event.stopPropagation();
            //const likes = likeElement.dataset.likes
            //console.log(likes);
            const index = likeElement.dataset.index;
            //console.log(index);
    
            if(commentaries[index].isLiked) {
              commentaries[index].isLiked = !commentaries[index].isLiked;
              commentaries[index].likes -= 1;
              renderApp();
              //initLikeButtonListeners();
              //initCommentsListeners();
            } else {
              commentaries[index].isLiked = !commentaries[index].isLiked;
              commentaries[index].likes += 1;
              renderApp();
              //initLikeButtonListeners();
              //initCommentsListeners();
            }
    
          });
        }
    };
    

    deleteFormButtonElement.addEventListener("click", () => {
        commentaries.pop();
        renderApp();
        initLikeButtonListeners();
        
    });
    
    
    buttonElement.addEventListener("click",() => {
      fetchPost();
      initLikeButtonListeners();
      nameInputElement.classList.remove("error");
      buttonElement.classList.remove("disabled");
      if (nameInputElement.value === "") {
          nameInputElement.classList.add("error");
          buttonElement.classList.add("disabled");
          return;
      };
      commentInputElement.classList.remove("error");
      if (commentInputElement.value === '') {
          commentInputElement.classList.add("error");
          buttonElement.classList.add("disabled");
          return;
      };
    });
    initLikeButtonListeners();
  };
  

const fetchPost = () => {
    fetch(host, {
        method: "POST",
        body: JSON.stringify({
          name: nameInputElement.value,
          text: commentInputElement.value,
          //forceError: true,
        }), 
        headers: {
            Authorization: token,
        }
    })
    .then((response) => {
        if(response.status === 500) {

            alert('Сервер сломался, попробуй позже');
              
            throw new Error("Сервер упал");

        } else if(response.status === 400) {

            alert('Имя и комментарий должны содержать хотя бы 3 символа');
              
            throw new Error("Неверный запрос");

        } else {
            return response.json();
        } 
    })
    .then((responseData) => {
        //comments = appComments;
        console.log(responseData);
        //fetchGet();
        renderApp();
        //initLikeButtonListeners();
    })
    .then((data) => {
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";
        nameInputElement.value = "";  
        commentInputElement.value = ""; 
        fetchGet();
        renderComments(listElement, getComments);
        console.log(data);
    })
    .catch((error) => {
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";
        if(!navigator.onLine) {
          alert("Кажется что-то пошло не так, попробуй позже");
        }
        
        console.warn(error);
    });
};






renderApp();



//initLikeButtonListeners();

