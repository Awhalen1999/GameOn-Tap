// user.rules['GAMEID'].['RULEID']

// localstorage key = Users
// [user, user]

async function createUser(user) {
  // validate that user is good (password meets requirements, unique id, extra data like name)

  // save it
  const users = localStorage.getItem('users');

  const usersArr = users ? JSON.parse(users) : [];

  localStorage.setItem('users', JSON.stringify([...usersArr, user]));
}

// TODO take a password, id is probably login credentials
async function login(id) {
  const users = localStorage.getItem('users');

  const usersArr = users ? JSON.parse(users) : [];

  return usersArr.find((user) => user.id === id);
}
