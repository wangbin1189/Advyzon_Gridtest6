const headers = new Headers({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

const index_user = () => {                   
  return fetch("/people").then(response => {  
    return response.json();                  
  });
};

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

var app = new Vue({              
  el: "#root",                    
  data: {                         
    users: [],

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

    indexUsers() {                   
      index_user().then(userData => {
        this.users = userData;
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


