const headers = new Headers({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

const index_user = ({ page = 1, sortBy = 'name' }) => {                   
  // people?page=1
  const url = "/people" + "?page=" + page + "&sortBy=" + sortBy;
  return fetch(url).then(response => {  
    return response.json();                  
  });
};

// for order by
// fetch('/people?order_by=name') // in rails, `params[:order_by]`

const create_user = function (userParam) {
  return fetch("/people", {
    method: "POST",    
    headers: headers,
    body: JSON.stringify(userParam)
  });
};

const update_user = userParam => {
  return fetch("/people/" + userParam.id, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(userParam)
  }); // TODO: 读取保存后的用户信息
};

const delete_user = userId => {
  return fetch("/people/" + userId, {
    method: "DELETE"
  }); // TODO: 读取保存后的用户信息
};

// 1 to n
const expand = n => [...Array(n).keys()].map(n => n + 1)

var app = new Vue({              
  el: "#root",                    
  data: {                         
    users: [],
    currentPage: 0,
    totalPages: 0,
    allPages: [],
    sortBy: '',

    showingAddPrompt: false,
    newUserForm: {               

      company: "yhlSoft",
      education: "graduate",
      gender: "Male",
      name: "lalala",
      title: "worker"
    },

    showingEditPrompt: false,     
    updateUserForm: {},

    showingDeletePrompt: false,   
    userToBeDeleted: null
  },



  methods: {
    clearUserForm() {
      this.newUserForm = {};
    },
    createNewUser() {               
      create_user(this.newUserForm).then(() => {
        this.clearUserForm();       
        this.showingAddPrompt = false;  
        return this.indexUsers();   
      });
    },

    indexUsers(options = {}) {                   
      index_user(options).then(userData => {
        var results = userData.results;
        var totalPages = userData.totalPages;
        var currentPage = userData.currentPage;
        debugger
        var sortBy = userData.sortBy;


        this.users = results;
        this.totalPages = totalPages;
        this.allPages = expand(totalPages);
        this.currentPage = currentPage;
        this.sortBy = sortBy;
      });
    },

    updateUser() {
      update_user(this.updateUserForm).then(() => {
        this.showingEditPrompt = false;  
        return this.indexUsers();  
      });
    },

    editUser(user) {
      
      this.updateUserForm = Object.assign({}, user);
      this.showingEditPrompt = true;
    },

    deleteUser() {
      delete_user(this.userToBeDeleted.id).then(() => {
        this.showingDeletePrompt = false;
        return this.indexUsers();
      });
    }
  },
  created() {                  //有经验的程序员好像都把这个刷屏写在后面
    this.indexUsers();
  }
});

window.app = app;