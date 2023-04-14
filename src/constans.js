const roles = [
  { id: 0, name: "Receptionist" },
  { id: 1, name: "Doctor" },
  { id: 2, name: "Supervisor" },
];

const oneDayInMillis = 86400000;
const baseURL = "http://localhost:8081";
// const baseURL = "http://172.16.133.196:8082";
// const baseURL = "http://ca5d-119-161-98-68.ngrok-free.app";
// const alphNumRegEsx = new RegExp("^w+$");

export { oneDayInMillis, roles, baseURL };
